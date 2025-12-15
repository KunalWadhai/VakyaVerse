import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import { gmailTransporter, gmailTransporter587, gmailSender } from "../lib/nodemailer.js";


export async function sendEmail({ toEmail, name, clientURL}) {
  // Check if environment variables are set
  if (!gmailSender.email || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration missing: EMAIL_USER or EMAIL_PASS not set in environment variables');
  }

  let transporter = gmailTransporter;
  let lastError = null;

  // Try port 465 first (SSL)
  try {
    console.log('🔍 Verifying Gmail connection (port 465) before sending email...');
    await transporter.verify();
    console.log('✅ Gmail SMTP server is ready to send emails (port 465)');

    console.log(`📤 Sending welcome email to: ${toEmail}`);
    const info = await transporter.sendMail({
      from: `${gmailSender.name} <${gmailSender.email}>`,
      to: toEmail,
      subject: "Welcome to VakyaVerse",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    console.log('✅ Email sent successfully via Gmail (port 465)');
    console.log('   Message ID:', info.messageId);
    console.log('   Sent to:', toEmail);
    console.log('   Response:', info.response);
    return info;
  } catch (error) {
    lastError = error;
    console.warn('⚠️  Port 465 failed, trying port 587 (STARTTLS)...');
    console.warn('   Error:', error.code, '-', error.message);
    
    // Try port 587 as fallback (STARTTLS)
    try {
      transporter = gmailTransporter587;
      console.log('🔍 Verifying Gmail connection (port 587) before sending email...');
      await transporter.verify();
      console.log('✅ Gmail SMTP server is ready to send emails (port 587)');

      console.log(`📤 Sending welcome email to: ${toEmail}`);
      const info = await transporter.sendMail({
        from: `${gmailSender.name} <${gmailSender.email}>`,
        to: toEmail,
        subject: "Welcome to VakyaVerse",
        html: createWelcomeEmailTemplate(name, clientURL),
      });

      console.log('✅ Email sent successfully via Gmail (port 587)');
      console.log('   Message ID:', info.messageId);
      console.log('   Sent to:', toEmail);
      console.log('   Response:', info.response);
      return info;
    } catch (fallbackError) {
      // Both attempts failed
      console.error('❌ Email sending failed on both ports (465 and 587)');
      console.error('\n📋 First attempt (port 465) error:');
      console.error('   Error Code:', error.code);
      console.error('   Error Message:', error.message);
      console.error('\n📋 Second attempt (port 587) error:');
      console.error('   Error Code:', fallbackError.code);
      console.error('   Error Message:', fallbackError.message);
      
      // Provide specific error guidance
      if (fallbackError.code === 'EAUTH' || error.code === 'EAUTH') {
        console.error('\n💡 Authentication Error - Solutions:');
        console.error('   1. Use App-Specific Password (NOT your regular Gmail password)');
        console.error('   2. Enable 2-Step Verification: https://myaccount.google.com/security');
        console.error('   3. Generate App Password: https://myaccount.google.com/apppasswords');
        console.error('   4. Copy the 16-character app password (no spaces)');
        console.error('   5. Set EMAIL_PASS in .env file with the app password');
        console.error('   6. Make sure EMAIL_USER is your full Gmail address');
      } else if (fallbackError.code === 'EENVELOPE' || error.code === 'EENVELOPE') {
        console.error('\n💡 Envelope Error - Check:');
        console.error('   - EMAIL_USER is set correctly in .env (full email address)');
        console.error('   - Email format is valid');
      } else if (fallbackError.response || error.response) {
        console.error('   SMTP Response:', fallbackError.response || error.response);
      }
      
      throw fallbackError; 
    }
  }
}

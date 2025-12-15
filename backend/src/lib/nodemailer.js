import nodemailer from 'nodemailer';
import { ENV } from './constants.js';

// Validate environment variables
if (!ENV.EMAIL_USER || !ENV.EMAIL_PASS) {
  console.warn('⚠️  Warning: EMAIL_USER or EMAIL_PASS not set in environment variables');
}

// Create reusable transporter object using Gmail SMTP
// Primary configuration: Port 465 with SSL (most common)
export const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
  // Additional options for better compatibility
  tls: {
    rejectUnauthorized: false
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug logs in development
  logger: process.env.NODE_ENV === 'development' // Enable logger in development
});

// Alternative configuration: Port 587 with STARTTLS (fallback option)
export const gmailTransporter587 = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false for 587, true for 465
  requireTLS: true,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Verify transporter configuration
export const verifyGmailConnection = async () => {
  try {
    console.log('🔍 Verifying Gmail SMTP connection...');
    console.log('📧 Using email:', ENV.EMAIL_USER ? `${ENV.EMAIL_USER.substring(0, 3)}***` : 'NOT SET');
    
    await gmailTransporter.verify();
    console.log('✅ Gmail SMTP server is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Gmail SMTP connection error:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Provide helpful error messages
    if (error.code === 'EAUTH') {
      console.error('\n💡 Authentication failed. Possible solutions:');
      console.error('   1. Make sure you\'re using an App-Specific Password (not your regular Gmail password)');
      console.error('   2. Enable 2-Step Verification on your Google account');
      console.error('   3. Generate an App-Specific Password at: https://myaccount.google.com/apppasswords');
      console.error('   4. Make sure EMAIL_USER and EMAIL_PASS are set correctly in your .env file');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('\n💡 Connection failed. Check your internet connection and firewall settings.');
    } else if (error.code === 'EENVELOPE') {
      console.error('\n💡 Envelope error. Check that EMAIL_USER is set correctly.');
    }
    
    return false;
  }
};

// Gmail sender configuration
export const gmailSender = {
  email: ENV.EMAIL_USER,
  name: ENV.EMAIL_USER_NAME || 'VakyaVerse',
};


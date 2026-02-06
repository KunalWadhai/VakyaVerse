import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
    const [ formData, setFormData ] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const {signup, isSigningUp } = useAuthStore();
    
    return (
        <div>
            <h1>Sign Up Page</h1>
        </div>
    )
}

export default SignUpPage;
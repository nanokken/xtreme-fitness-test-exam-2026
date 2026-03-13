import LoginComponent from '../components/LoginComponent';
import PageHeader from '../components/PageHeader';
import loginHeader from '../assets/headers/loginHeader.png';

export default function Login() {
    return (
        <div className="min-h-screen bg-white">
            <PageHeader backgroundImage={loginHeader} title="Login" />
            <LoginComponent />
        </div>
    );
}
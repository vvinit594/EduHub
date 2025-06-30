import { Link } from 'react-router-dom';
import { HiAcademicCap } from 'react-icons/hi';
import AuthForm from '../components/AuthForm';

export default function Login() {
  return (
    <div className="auth-page">
      <div className="form-container">
        <Link to="/" className="flex justify-center">
          <HiAcademicCap className="h-12 w-12" style={{ color: '#69247C' }} />
        </Link>
        <AuthForm type="login" />
      </div>
    </div>
  );
}
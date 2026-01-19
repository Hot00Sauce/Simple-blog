import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser } from './authSlice';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // 1. Call Supabase Auth
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message);
        } else {
            // 2. Update Redux State
            dispatch(setUser(data.user));
            alert('Registration successful! You are now logged in.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default Register;
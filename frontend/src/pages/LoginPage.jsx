import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate is passed into the thunk
        dispatch(loginUser({ email, password }, navigate));
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <form
                className='flex flex-col bg-white w-1/3 p-6 rounded shadow-md'
                onSubmit={handleSubmit}
            >
                <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>

                <label htmlFor="email" className='text-sm font-medium'>Email</label>
                <input
                    id="email"
                    type="email"
                    className='m-2 p-2 border border-gray-300 rounded'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoFocus
                    required
                />

                <label htmlFor="password" className='text-sm font-medium'>Password</label>
                <input
                    id="password"
                    type="password"
                    className='m-2 p-2 border border-gray-300 rounded'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

                <button
                    type="submit"
                    className='hover:bg-amber-800 m-2 p-2 bg-amber-500 text-white rounded'
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {error && (
                    <p className='text-red-600 text-center mt-2'>
                        {typeof error === 'string' ? error : 'Login failed'}
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPage;

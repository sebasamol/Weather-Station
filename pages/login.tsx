'use client';
import React from "react";
import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import '../app/globals.css';

interface LoginResponse {
    success: boolean;
    message?: string;
}

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!username || !password) {
            setError('Nieprawidłowa nazwa użytkownika lub hasło');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: username.trim(),
                    password: password,
                }),
            });

            const data: LoginResponse = await response.json();

            if (response.ok) {
                router.push('/');
            } else {
                setError(data.message || 'Nieprawidłowa nazwa użytkownika lub hasło');
            }
        } catch (error) {
            console.error(error);
            setError('Wystąpił błąd. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-8'>
            <main className='max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                <div className='flex flex-col items-left space-y-6'>
                    <div className='flex flex-col items-center'>
                        <Image
                            src={'/station.png'}
                            width={64}
                            height={64}
                            alt="Weather station"
                            className='rounded-full shadow-md'
                        />
                        <h1 className='mt-3 text-2xl font-semibold tracking-wide text-gray-900 dark:text-white'>
                            Stacja Pogodowa
                        </h1>
                    </div>
                    <div className='w-full border-b border-gray-200 dark:border-gray-700'></div>
                </div>
                <div className='mt-8'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='login' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                Nazwa użytkownika
                            </label>
                            <input
                                className='w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                                id='login'
                                name='login'
                                type='text'
                                data-testid="test-username"
                                required={true}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                placeholder="Nazwa użytkownika"
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                Hasło
                            </label>
                            <input
                                className='w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                                id='password'
                                name='password'
                                type='password'
                                data-testid="test-password"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                placeholder="Hasło"
                            />
                        </div>

                        {error && (
                            <div data-testid="error-message" className='flex items-center space-x-2 p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'>
                                <Image
                                    src="/error.png"
                                    width={18}
                                    height={18}
                                    alt="Error"
                                />
                                <div data-testid="error" className='text-sm'>{error}</div>
                            </div>
                        )}
                        
                        <button 
                            className='w-full py-2 px-4 rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            data-testid='test-button' 
                            type="submit" 
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? 'Logowanie...' : 'Zaloguj'}
                        </button>
                        
                    </form>
                </div>
            </main>
        </div>
    );
}
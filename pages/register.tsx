'use client';
import React from "react";
import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import '../app/globals.css';

interface RegisterResponse {
    success: boolean;
    message?: string;
}

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!username || !password || !confirmPassword) {
            setError('Wszystkie pola są wymagane');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Hasła nie są identyczne');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password,
                }),
            });

            const data: RegisterResponse = await response.json();

            if (response.ok) {
                const alertElement = document.createElement('div');
                alertElement.textContent = 'Rejestracja zakończona sukcesem!';
                alertElement.style.cssText = `
                    position: fixed;
                    top: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 1rem 2rem;
                    background-color: #4CAF50;
                    color: white;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    z-index: 1000;
                `;
                document.body.appendChild(alertElement);
                setTimeout(() => {
                    alertElement.remove();
                }, 3000);
                
                // Add delay before redirect
                setTimeout(() => {
                    router.push('/');
                }, 3500); // Redirect after alert disappears
            } else {
                setError(data.message || 'Wystąpił błąd podczas rejestracji');
            }
        } catch (error) {
            console.error(error);
            setError('Wystąpił błąd. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center h-screen mt-15">
            <h1 className="text-2xl font-bold mb-4">Rejestracja</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-sm font-medium">Nazwa użytkownika</label>
                    <input
                        type="text"
                        id="username"   
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Powtórz hasło</label>
                    <input
                        type="password" 
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {isLoading ? 'Rejestruję...' : 'Zarejestruj'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}


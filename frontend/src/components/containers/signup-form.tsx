'use client';

import React, { useState } from 'react';
import { User, Wrench, Shield, KeyRound, AtSign } from 'lucide-react';

// Define the roles for type safety
type Role = 'client' | 'worker' | 'admin';

// Configuration for each role, including icons and color schemes
const roleConfig = {
  client: {
    icon: <User className="h-6 w-6 text-yellow-400" />,
    buttonClass: 'bg-yellow-500 text-gray-900 hover:bg-yellow-500/90',
    focusRingClass: 'focus:ring-yellow-500',
    checkboxClass: 'data-[state=checked]:bg-yellow-500 data-[state=checked]:text-gray-900',
    linkClass: 'text-yellow-500 hover:text-yellow-400',
  },
  worker: {
    icon: <Wrench className="h-6 w-6 text-green-400" />,
    buttonClass: 'bg-green-500 text-gray-900 hover:bg-green-500/90',
    focusRingClass: 'focus:ring-green-500',
    checkboxClass: 'data-[state=checked]:bg-green-500 data-[state=checked]:text-gray-900',
    linkClass: 'text-green-500 hover:text-green-400',
  },
  admin: {
    icon: <Shield className="h-6 w-6 text-teal-400" />,
    buttonClass: 'bg-teal-500 text-gray-900 hover:bg-teal-500/90',
    focusRingClass: 'focus:ring-teal-500',
    checkboxClass: 'data-[state=checked]:bg-teal-500 data-[state=checked]:text-gray-900',
    linkClass: 'text-teal-500 hover:text-teal-400',
  },
};

// SignUp Component (Reusable for User and Worker)
const SignUpComponent = ({ role }: { role: 'client' | 'worker' }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // In a real app, show a toast notification
            console.error("Passwords don't match!");
            return;
        }
        console.log("Sign up attempt:", { role, fullName, email, password });
        // In a real app, you would send this to your registration API
    };

    const currentRoleConfig = roleConfig[role];
    const roleName = role.charAt(0).toUpperCase() + role.slice(1);

    return (
        <div className="w-full max-w-sm">
            <div className="bg-black border border-zinc-800 rounded-xl shadow-2xl">
                <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full">
                            {currentRoleConfig.icon}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-100">Create {roleName} Account</h1>
                    <p className="text-sm text-zinc-500 mt-1">Join us by filling out the form below.</p>
                </div>

                <div className="px-6 pb-6">
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor={`fullName-signup-${role}`} className="text-sm font-medium text-zinc-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    id={`fullName-signup-${role}`} type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe"
                                    className={`w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.focusRingClass}`}
                                />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label htmlFor={`email-signup-${role}`} className="text-sm font-medium text-zinc-400">Email</label>
                            <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    id={`email-signup-${role}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                                    className={`w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.focusRingClass}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor={`password-signup-${role}`} className="text-sm font-medium text-zinc-400">Password</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    id={`password-signup-${role}`} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                                    className={`w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.focusRingClass}`}
                                />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label htmlFor={`confirm-password-signup-${role}`} className="text-sm font-medium text-zinc-400">Confirm Password</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    id={`confirm-password-signup-${role}`} type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                                    className={`w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.focusRingClass}`}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2.5 px-4 font-semibold rounded-lg transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.buttonClass} ${currentRoleConfig.focusRingClass}`}
                        >
                           Sign Up as {roleName}
                        </button>
                    </form>
                </div>
                <div className="p-6 border-t border-zinc-800 text-center text-sm">
                    <p className="text-zinc-500">
                        Create your account to get started.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default SignUpComponent;
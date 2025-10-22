'use client';

import React from 'react';
import { User, Wrench, Shield, KeyRound, AtSign } from 'lucide-react';

type Role = 'client' | 'worker' | 'admin';

const roleConfig = {
  client: {
    icon: <User className="h-6 w-6 text-yellow-400" />,
    activeTabClass: 'data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-200',
    buttonClass: 'bg-yellow-500 text-gray-900 hover:bg-yellow-500/90',
    focusRingClass: 'focus:ring-yellow-500',
    checkboxClass: 'data-[state=checked]:bg-yellow-500 data-[state=checked]:text-gray-900',
    linkClass: 'text-yellow-500 hover:text-yellow-400',
  },
  worker: {
    icon: <Wrench className="h-6 w-6 text-green-400" />,
    activeTabClass: 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-200',
    buttonClass: 'bg-green-500 text-gray-900 hover:bg-green-500/90',
    focusRingClass: 'focus:ring-green-500',
    checkboxClass: 'data-[state=checked]:bg-green-500 data-[state=checked]:text-gray-900',
    linkClass: 'text-green-500 hover:text-green-400',
  },
  admin: {
    icon: <Shield className="h-6 w-6 text-teal-400" />,
    activeTabClass: 'data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-200',
    buttonClass: 'bg-teal-500 text-gray-900 hover:bg-teal-500/90',
    focusRingClass: 'focus:ring-teal-500',
    checkboxClass: 'data-[state=checked]:bg-teal-500 data-[state=checked]:text-gray-900',
    linkClass: 'text-teal-500 hover:text-teal-400',
  },
};

const App = () => {
  const [role, setRole] = React.useState<Role>('client');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your authentication API
    console.log({
      role,
      email,
      password,
    });
    // A toast notification would be better than an alert here
  };

  const currentRoleConfig = roleConfig[role];

  return (
    <main className="flex items-center justify-center min-h-screen bg-zinc-950 font-sans p-4">
      <div className="w-full max-w-sm">
        {/* Card Container */}
        <div className="bg-black border border-zinc-800 rounded-xl shadow-2xl">
          {/* Card Header */}
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full">
                {currentRoleConfig.icon}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-zinc-100">Welcome Back</h1>
            <p className="text-sm text-zinc-500 mt-1">Select your role to sign in to your account.</p>
          </div>

          {/* Card Content */}
          <div className="px-6 pb-6">
            {/* Tabs for Role Selection */}
            <div className="bg-zinc-900 p-1 rounded-lg grid grid-cols-3 gap-1 mb-6">
              {(['client', 'worker', 'admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  data-state={role === r ? 'active' : 'inactive'}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors text-zinc-400 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${currentRoleConfig.focusRingClass} ${role === r ? `bg-zinc-800 text-white` : ''}`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                 <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                 <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.focusRingClass}`}
                    />
                 </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                 <label htmlFor="password"  className="text-sm font-medium text-zinc-400">Password</label>
                 <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.focusRingClass}`}
                    />
                 </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="remember-me"
                    className={`h-4 w-4 shrink-0 rounded-sm border border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 ${currentRoleConfig.focusRingClass} ${currentRoleConfig.checkboxClass}`}
                  />
                  <label htmlFor="remember-me" className="text-sm text-zinc-400">Remember me</label>
                </div>
                <a href="#" className={`text-sm font-medium ${currentRoleConfig.linkClass}`}>
                  Forgot password?
                </a>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2.5 px-4 font-semibold rounded-lg transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${currentRoleConfig.buttonClass} ${currentRoleConfig.focusRingClass}`}
              >
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>

            {/* Google Auth Button */}
            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center gap-x-3 py-2.5 px-4 font-semibold rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_17_40)">
                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.253v9.0642H37.4346C36.9242 32.0422 35.1818 34.0058 32.7483 35.6197V41.6192H40.2192C44.7856 37.458 47.532 31.571 47.532 24.5528Z" fill="#4285F4"/>
                    <path d="M24.253 48.0001C30.6502 48.0001 36.0526 45.9388 40.2192 42.6192L32.7483 36.6197C30.5633 38.2336 27.6749 39.214 24.253 39.214C17.932 39.214 12.5855 34.8216 10.6518 29.0888H2.97363V35.244C7.03608 43.4353 15.0132 48.0001 24.253 48.0001Z" fill="#34A853"/>
                    <path d="M10.6518 29.0887C10.1742 27.5192 9.88934 25.8679 9.88934 24.1666C9.88934 22.4653 10.1742 20.814 10.6518 19.2445V13.0889H2.97363C1.08203 16.745 0 20.359 0 24.1666C0 27.9742 1.08203 31.5882 2.97363 35.244L10.6518 29.0887Z" fill="#FBBC05"/>
                    <path d="M24.253 9.11932C27.9961 9.11932 30.9839 10.4326 32.6384 11.9965L40.334 4.30078C36.0437 0.509086 30.6502 0 24.253 0C15.0132 0 7.03608 4.56475 2.97363 12.756L10.6518 18.9115C12.5855 13.1788 17.932 9.11932 24.253 9.11932Z" fill="#EB4335"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="48" height="48" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                Sign in with Google
              </button>
            </div>

          </div>
          
          {/* Card Footer */}
          <div className="p-6 border-t border-zinc-800 text-center text-sm">
             <p className="text-zinc-500">
                Don't have an account?{' '}
                <a href="/signup" className={`font-medium ${currentRoleConfig.linkClass}`}>
                   Sign up
                </a>
             </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;


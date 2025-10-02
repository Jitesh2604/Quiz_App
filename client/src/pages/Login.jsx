import React from 'react';


const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);


export function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 transform transition-all duration-500 hover:scale-105">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-white">Welcome Back!</h2>
                    <p className="mt-2 text-gray-400">Login to continue your quiz adventure</p>
                </div>
                <form className="space-y-6">
                    <div className="relative">
                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                            <MailIcon className="w-5 h-5"/>
                        </div>
                        <input
                            placeholder="you@example.com"
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                     <div className="relative">
                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                            <LockIcon className="w-5 h-5"/>
                        </div>
                        <input
                            placeholder="••••••••"
                            type="password"
                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-cyan-400 hover:underline">Forgot Password?</a>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300">
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-400">
                    Don't have an account? <a href="#" className="font-medium text-cyan-400 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

// --- BACKGROUND EFFECTS ---

export  const BackgroundEffects = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-cyan-500/20 rounded-full animate-pulse blur-2xl"></div>
            <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-blue-500/20 rounded-full animate-pulse delay-1000 blur-3xl"></div>
            <div className="absolute bottom-[15%] left-[20%] w-40 h-40 bg-purple-500/20 rounded-full animate-pulse delay-500 blur-2xl"></div>
            <div className="absolute bottom-[5%] right-[25%] w-52 h-52 bg-teal-500/20 rounded-full animate-pulse delay-2000 blur-3xl"></div>
        </div>
    );
};

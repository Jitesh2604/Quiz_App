import React from 'react';
import { useNavigate } from "react-router-dom";

const ReactIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" {...props}>
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const NodeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="#8CC84B" d="M11.3,20.5c-0.2,0.1-0.5,0.2-0.8,0.2c-0.5,0-1-0.2-1.4-0.6c-0.7-0.7-0.7-1.9,0-2.6l4.4-4.4c0.2-0.2,0.5-0.4,0.8-0.4c0.5,0,1,0.2,1.4,0.6c0.7,0.7,0.7,1.9,0,2.6l-4.4,4.4z M19.4,19.1c-0.4,0.4-0.9,0.6-1.4,0.6c-0.3,0-0.6-0.1-0.8-0.2l-4.4-4.4c-0.7-0.7-0.7-1.9,0-2.6c0.4-0.4,0.9-0.6,1.4-0.6c0.3,0,0.6,0.1,0.8,0.2l4.4,4.4C20.1,17.2,20.1,18.4,19.4,19.1z M12,12.2c-0.5,0-1-0.2-1.4-0.6L6.2,7.2C5.5,6.5,5.5,5.3,6.2,4.6c0.7-0.7,1.9-0.7,2.6,0l4.4,4.4c0.4,0.4,0.6,0.9,0.6,1.4C13.8,11.3,13,12.2,12,12.2z M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z"/></svg>
);

const TailwindIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="#38BDF8" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M16.63,10.88l-4.75,4.75 c-0.2,0.2-0.51,0.2-0.71,0l-2.25-2.25c-0.2-0.2-0.2-0.51,0-0.71l0.71-0.71c0.2-0.2,0.51-0.2,0.71,0l1.18,1.18l3.68-3.68 c0.2-0.2,0.51-0.2,0.71,0l0.71,0.71C16.83,10.37,16.83,10.68,16.63,10.88z"/></svg>
);

const BrainIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2A2.5 2.5 0 0112 4.5v1.2a1 1 0 001 1h.38a2 2 0 011.94 2.52c-.22.64-.46 1.25-.73 1.82" /><path d="M12.5 2A2.5 2.5 0 0010 4.5v1.2a1 1 0 01-1 1h-.38a2 2 0 00-1.94 2.52c.22.64.46 1.25.73 1.82" /><path d="M4.5 10.5a2.5 2.5 0 010-5" /><path d="M19.5 10.5a2.5 2.5 0 000-5" /><path d="M12 13a1 1 0 00-1 1v1a1 1 0 01-1 1H9a3 3 0 01-3-3v-1a3 3 0 013-3h1.5" /><path d="M12 13a1 1 0 011 1v1a1 1 0 001 1h1a3 3 0 003-3v-1a3 3 0 00-3-3h-1.5" /><path d="M12 13v8" /><path d="M9 21h6" /></svg>);
const UserGroupIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.284.084A2.25 2.25 0 017.5 15.75v-1.5a2.25 2.25 0 012.25-2.25m3.75 0v6.75m-3.75-6.75a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25m-3.75 0h-1.5a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25m7.5-7.5h1.5a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25z" /></svg>);
const TrophyIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 01-4.874-1.954.5.5 0 01-.21-.383V14.25a.5.5 0 01.21-.383A9.75 9.75 0 017.5 12h9a9.75 9.75 0 015.164 1.813.5.5 0 01.21.383v2.234a.5.5 0 01-.21.383A9.75 9.75 0 0116.5 18.75z" /><path d="M12 14.25v5.25m0 0l-1.04-.39a.75.75 0 01-.52-1.012V6.75a.75.75 0 011.5 0v11.112a.75.75 0 01-.52 1.012L12 19.5zm0 0l1.04-.39a.75.75 0 00.52-1.012V6.75a.75.75 0 00-1.5 0v11.112a.75.75 0 00.52 1.012L12 19.5z" /></svg>);


export default function AboutPage() {
    const navigate = useNavigate();
    const features = [
        { icon: <BrainIcon className="h-10 w-10 text-cyan-400" />, title: "AI-Powered Content", description: "Leverages Google's Gemini AI to generate a limitless supply of unique quiz categories and questions." },
        { icon: <UserGroupIcon className="h-10 w-10 text-green-400" />, title: "User Authentication", description: "Secure login and signup to track your personal progress, scores, and achievements over time." },
        { icon: <TrophyIcon className="h-10 w-10 text-yellow-400" />, title: "Leaderboard & Ranking", description: "Compete with other players and see how you stack up on the public leaderboard." },
    ];

    const techStack = [
        { name: "React", icon: <ReactIcon className="h-12 w-12" /> },
        { name: "Node.js", icon: <NodeIcon className="h-12 w-12" /> },
        { name: "MongoDB", icon: <span className="text-3xl font-bold text-green-500">M</span> },
        { name: "Express.js", icon: <span className="text-3xl font-bold text-gray-400">Ex</span> },
        { name: "Tailwind CSS", icon: <TailwindIcon className="h-12 w-12" /> },
        { name: "Gemini AI", icon: <span className="text-3xl font-bold text-purple-400">G</span> },
    ];

    return (
        <div className="py-12 animate-fade-in text-white">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-white">About QuizWhiz</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                    An intelligent quiz application designed to provide a dynamic and ever-changing trivia experience.
                </p>
            </div>
            
            {/* --- Project Philosophy Section --- */}
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 mb-16">
                 <h2 className="text-3xl font-bold text-center mb-6">Project Philosophy</h2>
                 <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
                    The goal of QuizWhiz was to move beyond the limitations of static, hard-coded quizzes. We envisioned a "living" trivia platform that constantly evolves, offering fresh challenges to users every time they play. By fusing a modern, full-stack web architecture with a powerful generative AI, we created an application that is not just a game, but a scalable and endlessly replayable content engine.
                 </p>
            </div>

            {/* --- Key Features Section --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-700 text-center">
                            <div className="flex justify-center items-center h-16 w-16 mx-auto mb-4 bg-gray-900 rounded-full">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Architectural Choices Section --- */}
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Architecture & Design</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">Full-Stack JavaScript (MERN)</h3>
                        <p className="text-gray-400">The MERN (MongoDB, Express.js, React, Node.js) stack was chosen for its unified language—JavaScript—across the entire application. This allows for seamless data flow using JSON, consistent development practices, and access to a vast ecosystem of libraries and tools via npm.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">AI-Driven Content Engine</h3>
                        <p className="text-gray-400">The core innovation is the complete decoupling of the app from a static question database. The Google Gemini API acts as a real-time content provider. This makes the app highly scalable and removes the need for manual content updates, ensuring the trivia is always fresh and surprising.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">Component-Based Frontend</h3>
                        <p className="text-gray-400">React was selected for its powerful component-based architecture. This approach enables the creation of a responsive and interactive Single-Page Application (SPA), where UI elements are reusable, state management is predictable, and the user experience is fast and fluid without constant page reloads.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">How It Works: Data Flow</h3>
                        <p className="text-gray-400">When a user requests a quiz, the React frontend calls the Node.js backend API. The server then constructs a precise prompt for the Gemini AI, which returns a perfectly structured JSON object of questions. This data is relayed back to the client, ensuring a clean separation of concerns and an efficient process.</p>
                    </div>
                </div>
            </div>

            {/* --- Technology Stack Section --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Technology Stack</h2>
                <div className="flex flex-wrap justify-center items-center gap-8">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center gap-2 p-4 bg-gray-800/60 rounded-xl border border-gray-700 w-32">
                            {tech.icon}
                            <span className="font-semibold text-gray-300">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="text-center">
                 <button 
                    onClick={() => navigate('/')}
                    className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                >
                    Start a Quiz!
                </button>
            </div>
        </div>
    );
}


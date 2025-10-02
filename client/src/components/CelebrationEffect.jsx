import React from "react";

export default function CelebrationEffect() {
    const particles = Array.from({ length: 100 });
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {particles.map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-yellow-300 rounded-full animate-fall"
                    style={{
                        width: `${Math.random() * 5 + 2}px`,
                        height: `${Math.random() * 5 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${Math.random() * 5 + 5}s`,
                        opacity: Math.random(),
                    }}
                />
            ))}
        </div>
    );
};
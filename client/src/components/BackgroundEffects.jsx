import React from "react";

export default function BackgroundEffects() {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-cyan-500/20 rounded-full animate-pulse blur-2xl"></div>
            <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-blue-500/20 rounded-full animate-pulse delay-1000 blur-3xl"></div>
            <div className="absolute bottom-[15%] left-[20%] w-40 h-40 bg-purple-500/20 rounded-full animate-pulse delay-500 blur-2xl"></div>
            <div className="absolute bottom-[5%] right-[25%] w-52 h-52 bg-teal-500/20 rounded-full animate-pulse delay-2000 blur-3xl"></div>
        </div>
    );
};
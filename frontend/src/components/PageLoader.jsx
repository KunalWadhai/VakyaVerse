

export const PageLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Main loader container */}
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 animate-ping"></div>

                {/* Middle rotating ring */}
                <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>

                {/* Inner rotating ring (opposite direction) */}
                <div className="absolute inset-8 rounded-full border-4 border-transparent border-b-blue-500 border-l-cyan-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>

                {/* Center glowing orb */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>

                    {/* Bouncing dots */}
                    <div className="flex gap-2 z-10">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>

                {/* Loading text */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <p className="text-white text-lg font-semibold tracking-wider animate-pulse">
                        Loading<span className="animate-[pulse_1.5s_ease-in-out_infinite]">...</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function GeneratingView({ templateName, imageMethod }: { templateName: string, imageMethod: string }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev
                return prev + (Math.random() * 5)
            })
        }, 800)
        return () => clearInterval(interval)
    }, [])


    return (
        <div className="relative w-full flex-1 overflow-hidden selection:bg-primary selection:text-primary-foreground flex flex-col">
            <div className="relative z-10 flex flex-1 flex-col p-6 md:p-10">
                {/* Main Content */}
                <main className="flex-1 mt-10 flex flex-col items-center w-full">
                    {/* Title */}
                    <div className="text-center mb-16 w-full">
                        <h1 className="text-xl md:text-3xl font-bold tracking-widest text-primary">
                            Generating your website
                        </h1>
                    </div>

                    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 text-sm md:text-base font-semibold tracking-wider">
                        <div className="space-y-4">
                            <p>Template :{templateName}</p>
                            <p>Image Generation :{imageMethod.replace("_", " ")}</p>
                        </div>


                        {/* Right Details */}
                        <div className="md:text-right">
                            <p>
                                Estimated Time ≈ <span className="text-primary text-xl font-bold ml-2 mr-2">1 - 3</span> Minutes
                            </p>
                        </div>
                    </div>

                    {/* Center Loading Area */}
                    <div className="mt-32 flex flex-col items-center justify-center w-full">
                        {/* Spinning Ring */}
                        <div className="relative size-12 mb-8">
                            <div className="absolute inset-0 rounded-full border-[5px] border-primary/20"></div>
                            <div className="absolute inset-0 rounded-full border-[5px] border-primary border-t-transparent animate-spin"></div>
                        </div>

                        <p className="text-sm font-semibold tracking-widest mb-8 text-center">
                            Generating images for your website
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full max-w-5xl h-[2px] bg-zinc-800 relative rounded-full overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-auto pt-12 pb-4">
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground">
                        Bored of waiting ? <Link href="https://www.chess.com" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">click here to play chess</Link>
                    </p>
                </footer>
            </div>
        </div>
    )
}

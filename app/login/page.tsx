"use client"

import { LoginForm } from "@/components/login-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { CommandIcon } from "@hugeicons/core-free-icons"
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* LEFT SIDE - FORM */}
      <div className="relative flex flex-col gap-4 p-6 md:p-10 bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white overflow-hidden transition-colors duration-300">
        {/* Dot Pattern Background - adaptif untuk light/dark mode */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-black">
              <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-4" />
            </div>
            <span className="font-bold">Subarvibe</span>
          </a>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - MARQUEE & MOTTO */}
      <div className="relative hidden flex-col items-center justify-center bg-black overflow-hidden lg:flex">
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black"></div>

        {/* Motto Section */}
        <div className="relative z-20 flex flex-col items-center text-center mt-20 mb-10 px-8">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Build your first website <br />
            <span
              className="text-transparent bg-clip-text bg-primary"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              instantly
            </span>
          </h2>
          <p className="text-lg text-zinc-200 max-w-md mt-4">
            Easy, Fast, and Interactive. Describe your website and watch it come to life in seconds.
          </p>
        </div>

        {/* Marquee Section */}
        <div
          className="relative z-10 w-full flex-1 flex items-center overflow-hidden pb-16"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <div className="animate-marquee flex gap-6 px-6 items-center">
            {/* First Set of Images */}
            <div className="flex shrink-0 items-center gap-6">
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-1.png" alt="App Mockup 1" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-2.png" alt="App Mockup 2" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-3.png" alt="App Mockup 3" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-4.png" alt="App Mockup 4" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
            </div>

            {/* Duplicate Set for Seamless Loop */}
            <div className="flex shrink-0 items-center gap-6">
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-1.png" alt="App Mockup 1" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-2.png" alt="App Mockup 2" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-3.png" alt="App Mockup 3" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
              <div className="h-[300px] w-[450px] rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                <img src="images/project-4.png" alt="App Mockup 4" className="h-full w-full rounded-xl object-cover opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

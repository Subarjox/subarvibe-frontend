"use client" // [Certain] WAJIB ADA: Formulir butuh interaksi peramban

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  // [Likely] Inisialisasi Klien Supabase (Pastikan fail .env.local milikmu sudah diisi)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

  // State untuk menahan data input
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // [Certain] Fungsi Eksekutor Penembus Brankas Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Mencegah halaman termuat ulang bodoh
    setIsLoading(true)
    setErrorMsg("")

    if (!isLogin && password !== confirmPassword) {
      setErrorMsg("Passwords do not match")
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMsg(error.message)
        toast.error(`Login failed: ${error.message}`)
        setIsLoading(false)
        return
      }

      // Login sukses!
      console.log("Login sukses. Membawa klien ke dasbor...")
      toast.success("Login Success! Welcome back.")
      router.refresh() // [Certain] Paksa Next.js membaca Cookie baru
      router.push("/project")
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      })

      if (error) {
        setErrorMsg(error.message)
        toast.error(`Sign up failed: ${error.message}`)
        setIsLoading(false)
        return
      }

      // [Certain] Cek apakah Supabase langsung memberikan sesi, atau menahannya
      if (data.session) {
        console.log("Sign up sukses. Membawa klien ke dasbor...")
        toast.success("Account Created Successfully!")
        router.refresh() // [Certain] Paksa Next.js membaca Cookie baru
        router.push("/project")
      } else {
        // Ini terjadi jika 'Confirm Email' menyala di dasbor Supabase
        setErrorMsg("Registration successful! Please check your email to confirm your account.")
        toast.success("Registration successful! Check your email to confirm.")
        setIsLoading(false)
        setIsLogin(true) // Kembalikan UI ke mode login
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold transition-all duration-300">
            {isLogin ? "Login to your account" : "Create an account"}
          </h1>
          <p className="text-sm text-balance text-muted-foreground transition-all duration-300">
            {isLogin ? "Enter your email and password below" : "Fill in your details to get started"}
          </p>
        </div>

        {/* Indikator Eror Mutlak */}
        {errorMsg && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center font-medium">
            {errorMsg}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="alexander@example.com"
            required
            className="bg-background h-10 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mengikat ketikan ke state
            disabled={isLoading}
          />
        </Field>

        {/* Animasi Slide up/down untuk Username */}
        <div className={cn("grid transition-all duration-500 ease-in-out", isLogin ? "grid-rows-[0fr] opacity-0 -mt-4" : "grid-rows-[1fr] opacity-100")}>
          <div className="overflow-hidden">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="alexander"
                required={!isLogin}
                className="bg-background h-10 transition-all duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </Field>
          </div>
        </div>

        <Field>
          <div className="flex items-center mt-4">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className={cn("ms-auto grid transition-all duration-500 ease-in-out", isLogin ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <a
                  href="#"
                  className="text-sm underline-offset-4 hover:underline whitespace-nowrap block"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="Minimum 6 Characters"
            className="bg-background h-10 transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mengikat ketikan ke state
            disabled={isLoading}
          />
        </Field>

        {/* Animasi Slide up/down untuk Confirm Password */}
        <div className={cn("grid transition-all duration-500 ease-in-out", isLogin ? "grid-rows-[0fr] opacity-0 -mt-4" : "grid-rows-[1fr] opacity-100")}>
          <div className="overflow-hidden">
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                required={!isLogin}
                placeholder="Re-enter your Password"
                className="bg-background h-10 transition-all duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </Field>
          </div>
        </div>

        <Field>
          <Button type="submit" className="h-10 mt-2 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]" disabled={isLoading}>
            <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500", isLogin ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full")}>
              {isLoading ? "Authenticating..." : "Login"}
            </div>
            <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500", !isLogin ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full")}>
              {isLoading ? "Authenticating..." : "Sign Up"}
            </div>
          </Button>
        </Field>

        <FieldSeparator>Or</FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="relative h-10 overflow-hidden transition-all duration-300 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground hover:border-primary"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
              setErrorMsg("");
            }}
          >
            <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500", isLogin ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full")}>
              Create a new account
            </div>
            <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500", !isLogin ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full")}>
              Log in to existing account
            </div>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
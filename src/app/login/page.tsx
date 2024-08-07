'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUserStore from "@/store"

const LoginPage = () => {
    const router = useRouter()

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const setUser = useUserStore((state) => state.setUser)

    async function handleSubmit(e: any) {
        e.preventDefault()

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.status == 200) {
            setUser(data.user)
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e) => setEmail(e.target.value)} name="email" type="email" required className="block w-full rounded-md border-0 p-1.5 shadow-sm text-slate-900" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6">Password</label>

                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" required className="block w-full rounded-md border-0 p-1.5 shadow-sm text-slate-900" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don&apos;t have an account?
                    <Link href="/signup" className="mx-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;

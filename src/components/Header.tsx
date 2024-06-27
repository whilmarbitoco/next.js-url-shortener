import Link from "next/link";
import useUserStore from "@/store"

function Header() {
    const user = useUserStore((state) => state.user)

    return (
        <div className="py-2 flex justify-between items-center">
            <Link href="/" className="text-[2rem] font-bold">Shortener</Link>

            <div className="flex gap-3 items-center">
                {
                    user.name != '' ? <Link href="/dashboard" className="text-md">Dashboard</Link> : <><Link href="/login" className="text-md">Login</Link>
                        <Link href="/signup" className="text-md">Signup</Link></>
                }
            </div>
        </div>
    )
}

export default Header
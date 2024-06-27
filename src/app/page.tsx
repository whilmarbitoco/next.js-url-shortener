'use client';

import { useState } from "react"
import LinkPopup from "@/components/LinkPopup";
import Header from "@/components/Header"
import useUserStore from "@/store"
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter()

  const [url, setUrl] = useState('')
  const [shorten, setShorten] = useState('')

  let [hidden, setHidden] = useState(true)
  const user = useUserStore((state) => state.user)

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (user.email == "") {
      router.push("login")
      return;
    }

    const response = await fetch('/api/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: url, id: user.id }),
    });

    const data = await response.json();
    setShorten(data.shortened)
    setHidden(hidden = !hidden)
  }

  function toggleHidden() {
    if (user.email != "") {
      setHidden(hidden = !hidden)
      return;
    }
    router.push("login")
  }

  return (
    <div className="h-full w-[70%] p-auto m-auto">
      <Header />
      <div className="w-full flex flex-col items-center">
        <h1 className="text-[3em] m-4 mb-5">URL Shortener</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input onChange={(e) => setUrl(e.target.value)} type="text" name="link" className="w-[30rem] outline-none text-slate-950 text-lg p-3 border-2 rounded" />
          <button type="submit" className="mx-2 p-3 border-2 rounded hover:text-slate-800 hover:bg-white ease-in duration-300">Shorten</button>
        </form>
        <LinkPopup hidden={hidden} toggleHidden={toggleHidden} link={shorten} />
      </div>
    </div>

  )
}

export default HomePage
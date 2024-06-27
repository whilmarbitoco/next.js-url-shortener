import { create } from 'zustand'

type userType = {
    id: number,
    email: string,
    name: string,
    password: string
}

type storeType = {
    user: userType,
    setUser: (user: userType) => void
}

const useUserStore = create<storeType>((set) => ({
    user: {
        id: 0,
        email: '',
        name: '',
        password: ''
    },
    setUser: async (newUser: userType) => await set((state) => ({ user: newUser }))
}))

export default useUserStore

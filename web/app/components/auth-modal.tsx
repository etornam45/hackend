import { apiClient } from "~/api"
// import { Button } from "~/ui/button"
import {useState} from 'react'
export const Login = () => {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function Login() {
        const { data } = await apiClient.auth.login.post({
            email: email,
            password: password
        })
        
        console.log(data)
    }

    return (<form className="flex flex-col gap-2 w-md">
        <h1 className="font-bold text-2xl mb2">Welcome back</h1>
        <input onChange={(e) => setEmail(e.target.value)} className="p2 rounded bg-slate/20" type="email" name="email" placeholder="emailaddress@mail.com" />
        <input onChange={(e) => setPassword(e.target.value)} className="p2 rounded bg-slate/20" type="password" name="password" placeholder="************" />
        <button onClick={Login} type="submit" className="p2 rounded shadow-sm !bg-[#3ba6f7] active:bg-[#3ba6d1]">
            <div className="i-proicons-door-open text-xl"></div> Login
        </button>
    </form>)
}
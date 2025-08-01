import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export function Signin() {
     const usernameRef = useRef<HTMLInputElement>()
     const passwordRef = useRef<HTMLInputElement>()
     const navigate = useNavigate();
     

    const handleSignin= async()=>{
         const username = usernameRef.current.value
         const pass = passwordRef.current.value
       const res = await axios.post("http://localhost:3001/api/v1/signin",{
        username,
        pass
       })
  
    localStorage.setItem("token", res.data.token)
    navigate("/")
      }

  return (
     <div className="h-screen w-screen bg-[url('https://wallpapers.com/images/hd/black-space-4k-2560-x-1570-kggpnp5y8sq8ut07.jpg')] bg-cover relative">
  <div className="absolute inset-0 backdrop-blur-md"></div>

  <div className="absolute inset-0 z-10 h-screen w-screen bg-gray-200/0 flex justify-center items-center">
    <div className="shadow-2xl rounded-xl border border-gray-200 min-w-48 p-8">
      <div className="flex flex-col gap-5">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />
      </div>
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSignin}
          loading={false}
          variant="secondary"
          text="Signin"
          classname="p-3 border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl"
        />
      </div>
    </div>
  </div>
</div>
  );
}

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/Input";
import axios from "axios";

export function SignupPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

  const handleSignup = async () => {
    const username = usernameRef.current?.value || "";
    const pass = passwordRef.current?.value || "";

    try {
      const response = await axios.post("http://localhost:3001/api/v1/signup", {
        username,
        pass,
      });

      alert(response.data.message);
      navigate("/signin");
    } catch (e: any) {
      console.error("❌ Signup error:", e.response?.data || e.message);
      alert(e.response?.data?.message || "Signup failed");
    }
  };

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
          onClick={handleSignup}
          loading={false}
          variant="secondary"
          text="Signup"
          classname="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl"
        />
      </div>
    </div>
  </div>
</div>

  );
}
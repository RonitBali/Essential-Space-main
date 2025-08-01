import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/Twittericon";
import { YoutubeIcon } from "../icons/Youtubeicon";
import Sidebaritems from "./Sidebaritems";

export function Sidebar(){
  return(
    <div className="h-screen bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 w-72 fixed left-0 top-0 shadow-2xl">
      <div className="px-6 py-8">
        <div className="flex text-2xl font-bold items-center text-slate-800">
          <div className=" justify-center text-center mr-3 p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
             <Logo/>
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Essential Space
          </span>
        </div>
      </div>
      
      <div className="px-4">
        <div className="space-y-2 pt-10">
          <Sidebaritems text="YouTube" icon={<YoutubeIcon/>} />
          <Sidebaritems text="Twitter" icon={<TwitterIcon/>}/>
        </div>
      </div>

    </div>
  )
}
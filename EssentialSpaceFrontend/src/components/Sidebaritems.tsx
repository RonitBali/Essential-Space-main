import  { type ReactElement } from 'react'


interface Sidebarprop{
     text: string;
    icon: ReactElement;
}
const Sidebaritems = ({ text, icon }:Sidebarprop)  => {

    return (
        <div className="group flex items-center text-slate-600 py-3 px-4 mx-2 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-slate-800 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <div className="mr-3 p-2 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                {icon}
            </div>
            <div className="font-medium">
                {text}
            </div>
        </div>
    )
}

export default Sidebaritems
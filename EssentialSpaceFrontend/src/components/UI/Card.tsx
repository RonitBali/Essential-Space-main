import { CrossIcon } from "../../icons/CrossIcon";
import { ShareIcon } from "../../icons/Shareicon";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CreateContentModel } from "./CreateContentModel";

// Declare Twitter global
declare global {
    interface Window {
        twttr?: {
            widgets: {
                load: () => void;
            };
        };
    }
}

interface CardProps {
    id:string,
    title: string;
    link: string;
    type: "Twitter" | "Youtube";
    contentId?:string;
    userId?: string;
    contents: ()=> void;
}

export function Card({id,title, link,type,contents}: CardProps) {
    
    const getYoutubeEmbedUrl = (url: string) => {
        const videoIdMatch = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
        );
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    };
    
    const[isEdit,setIsedit] = useState(false)

    const handleEdit = () =>{
        setIsedit(true)
    }

    const handleClose = () =>{
        setIsedit(false)
    }
    const yt = getYoutubeEmbedUrl(link);
    
    // Load Twitter widgets after component mounts
    useEffect(() => {
        if (type === "Twitter" && window.twttr) {
            window.twttr.widgets.load();
        }
    }, [type, link]);

    //  const Sharecontent = async() =>{
    //     await axios.post()
    //  }

     const DeleteContent = async () =>{
        try {
            await axios.delete("http://localhost:3001/api/v1/content", {
                data: {
                    contentId: id,
                },
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            contents();
        } catch (error) {
            console.log(error);
        }
    }
    
    // const handleUpdate = async () => {
    //       await axios.patch("http://localhost:3001/api/v1/brain/update",{
    //         id,
    //         title,
    //         link,
    //     })
    // }
    
    // const share = async () => {
    //     const response = await axios.post("http://localhost:3001/api/v1/brain/share", {
    //       share: true,
    //     }, {
    //       headers: {
    //         "Authorization": localStorage.getItem("token")
    //       }
    //     })
    //     const shareUrl = `http://localhost:5173/share/${response.data.hash}`
    //     navigator.clipboard.writeText(shareUrl)
    //     alert("copied to clipboard");
    
    //   }

    return <div>
         <CreateContentModel
                     open={isEdit}
                     onclose={handleClose}
                     editContent={{id,title,link,type}}
                     onUpdate={contents}
                    />
        <div className="group p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300/80 max-w-80 min-h-64 min-w-80 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center text-lg font-semibold text-slate-800 truncate flex-1 mr-4 pt-2">
                    {title}
                </div>
                <div>
                    <Button
                    text='Edit'
                    onClick={handleEdit}
                    />
                   

                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="p-3 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                        
                        <button   className="text-slate-400 hover:text-red-500">
                             <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700">
                            <ShareIcon size="md"/>
                        </a> 
                        </button>
                       
                    </div>
                    <div className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <button
                         onClick={DeleteContent}
                         className="text-slate-400 hover:text-red-500"
                        >
                        <CrossIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-slate-50">
                {type === "Youtube" && (

                    <iframe 
                    className="w-full h-48 rounded-xl" 
                    src={yt}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    />
                    
                )}
      
                {type === "Twitter" && (
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a> 
                        </blockquote>
                    </div>
                )}
                
            </div>

        </div>
    </div>
}
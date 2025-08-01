import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "../Input";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

enum Contenttype {
  Youtube = "Youtube",
  Twitter = "Twitter"
}

interface CreateContentModel {
  open: boolean;
  onclose: () => void;
  onUpdate: () => void;
  editContent?: {
    id: string;
    title: string;
    link: string;
    type: "Youtube" | "Twitter";
  }
}

export function CreateContentModel({ open, onclose, editContent }: CreateContentModel) {
  // const titleref = useRef<HTMLInputElement>(null)
  // const linkref = useRef<HTMLInputElement>(null)

  const [title,setTitle] = useState(editContent?.title || "")
  const [link,setLink] = useState(editContent?.link || "")
  const [type, setType] = useState<Contenttype>(editContent?.type === "Twitter" ? Contenttype.Twitter : Contenttype.Youtube)


  useEffect(() => {
    if (editContent) {
    setTitle(editContent.title);
    setLink(editContent.link);
    setType(editContent.type === "Twitter" ? Contenttype.Twitter : Contenttype.Youtube);
  }
  }, [editContent])




  const addcontent = async () => {
    
    const payload = {
    id: editContent?.id, 
    title,
    link,
  };

    try {
      if (editContent) {
       
        await axios.patch("http://localhost:3001/api/v1/brain/update", payload, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      } else {
       
        await axios.post("http://localhost:3001/api/v1/content", {
          title,
          link,
          type,
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      }
      if (onUpdate) onUpdate();  /
      onclose(); 
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };

  return (
    <div>
      {open && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onclose}>
        </div>
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{editContent ? 'EditContent':'Add New Content'}</h2>
              <button
                onClick={onclose}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200 text-slate-400 hover:text-slate-600"
              >
                <CrossIcon />
              </button>
            </div>

            
            <div className="space-y-6">
              <div className="space-y-4">
               <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                <Input value={link} onChange={(e)=> setLink(e.target.value)} placeholder={"Paste your link here"} />
              </div>

            
              <div>
                <h3 className="pl-3 text-lg font-semibold text-slate-900 mb-3">Content Type</h3>
                <div className="flex gap-3 items-center">
                  <Button
                    variant={type == Contenttype.Youtube ? "primary" : "secondary"}
                    onClick={() => { setType(Contenttype.Youtube) }}
                    size="mb"
                    text="YouTube"
                  />

                  <Button
                    variant={type == Contenttype.Twitter ? "primary" : "secondary"}
                    onClick={() => {
                      setType(Contenttype.Twitter)
                    }}
                    size="mb"
                    text="Twitter"
                  />
                </div>
              </div>

             
              <div className="pt-2 flex">
                <Button
                  variant="primary"
                  text={editContent? "Update Content" : "Add Content"}
                  onClick={addcontent}
                  size="mb"
                />
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
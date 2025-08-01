import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
    const [content, setContent] = useState([]);

    async function contents() {
        try {
            const response = await axios.get("http://localhost:3001/api/v1/content", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            
           
            setContent(response.data.content || []);
        } catch (error) {
            console.error('Error fetching content:', error);
            setContent([]);
        }
    }

    useEffect(() => {
        contents();
        const interval = setInterval(() => {
            contents()
        }, 10 * 1000);
        
        return () => {
            clearInterval(interval);
        }
    }, []);

    return { content, contents }
}
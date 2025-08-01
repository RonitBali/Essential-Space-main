import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useContent } from '../hooks/useContent'
import { Card } from '../components/UI/Card'

const SharedContent = () => {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [content, setContent] = useState<any[]>([])
    const { hash } = useParams()
 

    useEffect(() => {
        const fetchshared = async () => {
            const res = await axios.get(`http://localhost:3001/api/v1/brain/${hash}`);
            setContent(res.data.content || [])
            setUsername(res.data.username)
        }
        
        fetchshared()
        setLoading(false)
    }, [hash])

    if (loading) return <div className='text-black'>Loading Shared Content....</div>
    if (!content) return <div className='text-black'>No Content Found....</div>

    return (
        <div>
            <h1 className='text-2xl font-bold pt-10 ml-10 font-sans'>{username}'s Shared Content</h1>
            <div className='ml-10 mt-4 flex flex-row gap-4'>
              {content.map((item) => (
                    <Card
                        key={item._id}
                        title={item.title}
                        link={item.link}
                        type={item.type}
                        contentId={item._id}
                        // userId={hash || ''}
                    />
                ))}
                </div>
        </div>
    )
}

export default SharedContent
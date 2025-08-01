import { useState } from 'react'
import {Card} from '../components/UI/Card'
import { Button } from '../components/UI/Button'
import { CreateContentModel } from '../components/UI/CreateContentModel'
import { ShareIcon } from '../icons/Shareicon'
import {Sidebar} from '../components/Sidebar'
import { PlusIcon } from '../icons/Plusicon'
import axios from 'axios'
import { useContent} from '../hooks/useContent'
import { useEffect } from 'react'


const Dashboard = () => {

  const [modalopen, setModalopen] = useState(false)
  const { content, contents} = useContent();

 useEffect(() => {
  
 contents()

 }, [modalopen, contents])
 

const share = async () => {
        const response = await axios.post("http://localhost:3001/api/v1/brain/share", {
          share: true,
        }, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        const shareUrl = `http://localhost:5173/share/${response.data.hash}`
        navigator.clipboard.writeText(shareUrl)
        alert("copied to clipboard");
    
      }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-200">
      <Sidebar />
      <div className="pl-72">
        <div className="p-8">
          <CreateContentModel open={modalopen} onclose={() => {
            setModalopen(false);
          }} />

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 mt-5"> My Dashboard</h1>
                <p className="text-slate-600">Manage and organize your saved content</p>
              </div>
              <div className="flex gap-3">
                <Button
                  text='Add Content'
                  variant='primary'
                  size='mb'
                  classname='mr-2'
                  onClick={() => {
                    setModalopen(true)
                  }}
                  startIcon={<PlusIcon size='lg' />}
                />

                <Button
                  size='mb'
                  variant='secondary'
                  onClick={share}
                  text="Share"
                  startIcon={<ShareIcon size='lg' />}
                />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex flex-row gap-4 ">
            {content.map(({title, link, type, _id, }) => (
              <Card
                id={_id}
                key={_id}
                title={title}
                link={link}
                type={type}
                contents = {contents}
              />
            ))}
          </div>

          {/* Empty State */}
          {content.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                <PlusIcon size='lg' />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No content yet</h3>
              <p className="text-slate-600 mb-6">Start by adding your first piece of content</p>
              <Button
                text='Add Your First Content'
                variant='primary'
                size='mb'
                onClick={() => {
                  setModalopen(true)
                }}
                startIcon={<PlusIcon size='lg' />}
                
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
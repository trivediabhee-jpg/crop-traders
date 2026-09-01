import React from 'react'

const video = () => {
  return (
    <div className='h-screen w-full'>
         <video className='h-full w-full object-cover' autoPlay muted loop src="/videos/crop.mp4"></video>
    </div>
  )
}

export default video

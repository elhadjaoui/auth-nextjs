import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div className=' flex  justify-center items-center  h-screen  text-white  text-2xl  font-bold - gap-4 w-full shadow-md  rounded  px-8  pt-6  pb-8  mb-4'>
            <h1 className='text-3xl font-bold'>Profile</h1>
            <p className= ' bg-orange-500 p-2 rounded text-black'>id: {params.id}</p>
        </div>
    )
}

export default UserProfile
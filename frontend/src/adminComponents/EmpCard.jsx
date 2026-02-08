import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const EmpCard = ({user,onDelete}) => {
  const handleDelete = async() =>{
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/deleteuser`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:user._id})
        })
        const data = await res.json();  
        if(!res.ok){
            console.log(data.message)
        }
        if(res.ok){
            onDelete(user._id)
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    
    <tr className='bg-gray-50 p-5 '>
       
       <td className='p-5'>
          <p className='text-lg font-semibold text-gray-600'>{user.name}</p>
       </td>
       <td className='p-5'>
          <p className='text-lg font-semibold text-gray-600'>{user.email}</p>
       </td>
       <td className='p-5'>
          <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete}
      className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold
                shadow-md hover:bg-red-600 hover:shadow-lg
                active:scale-95 transition-all duration-200 cursor-pointer"/>
                            
                        
       </td>
    </tr>
  )
}

export default EmpCard

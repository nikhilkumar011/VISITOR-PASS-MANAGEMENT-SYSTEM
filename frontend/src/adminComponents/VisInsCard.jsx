import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye } from '@fortawesome/free-solid-svg-icons'


const VisInsCard = ({visitor,onDelete,onRowClick}) => {
  const deleteRequest = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/visitordashboard/registrationform`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: visitor._id })
            })
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message)
            }
            if (res.ok) {
                console.log("Deleted Successfully")
                onDelete(visitor._id)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <tr  className='bg-gray-50 p-5'>
            <td className='flex justify-center items-center m-auto'>
                <img
                    src={`${import.meta.env.VITE_API_URL}/${visitor.photo}`}
                    alt="visitor"
                    className="w-19 h-19 object-cover rounded-lg border flex items-center"
                />
            </td>
           
            <td className='px-4 py-3 md:px-2 md:py-2'>
                <h3 className='text-gray-700'>{visitor.firstname + " " + visitor.lastname}</h3>
            </td>
            <td className='hidden md:table-cell'>
                <h3 className='text-gray-700'> {visitor.visitingEmployee} </h3>
            </td>
            <td className='hidden md:table-cell'>
                <h3 className='text-gray-700'> {visitor.reason} </h3>
            </td>
            <td className='hidden md:table-cell'>
                <h3 className='text-gray-700'>{new Date(visitor.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}</h3>
            </td>
            <td className='hidden md:table-cell'>
                <h3 className='text-gray-700'> {visitor.time} </h3>
            </td>
            <td className='px-4 py-3 md:px-2 md:py-2'>
                <div className='flex gap-2 items-center'>
                    <FontAwesomeIcon onClick={() => onRowClick(visitor)} icon={faEye} className='p-2 border border-gray-500 text-gray-600 rounded-2xl cursor-pointer hover:text-white hover:bg-black text-sm' />
                    <button
                    onClick={deleteRequest}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Check Out and Delete
                </button>
                </div>
               
            </td>
            
        </tr>
  )
}

export default VisInsCard

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye } from '@fortawesome/free-solid-svg-icons'


const PendingRequests = ({ visitor, onDelete,onRowClick }) => {
    const handleStatusUpdate = async (newStatus) => {
        const res = await fetch(`http://localhost:3000/visitordashboard/updatestatus/${visitor._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();

    }
    const handleAction = async (status) => {
        await handleStatusUpdate(status);
        onDelete(visitor._id);
    };


    return (
        <tr  className='bg-gray-50 p-5 '>
            <td className='flex justify-center items-center m-auto'>
                <img
                    src={`http://localhost:3000/${visitor.photo}`}
                    alt="visitor"
                    className="w-19 h-19 object-cover rounded-lg border"
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
            <td>
                <FontAwesomeIcon onClick={() => onRowClick(visitor)} icon={faEye} className='p-2 border border-gray-500 text-gray-600 rounded-2xl cursor-pointer hover:text-white hover:bg-black text-sm' />
                
            </td>
            <td className='px-4 py-3 md:px-2 md:py-2'>
                <button onClick={() => {
                            handleAction("Rejected")
                        }}
                            className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold
               shadow-md hover:bg-red-600 hover:shadow-lg
               active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            Reject
                        </button>
            </td>
            <td>
                <button onClick={() => {
                            handleAction("Approved")
                        }}
                            className="px-5 py-2 rounded-xl bg-green-500 text-white font-semibold
               shadow-md hover:bg-green-600 hover:shadow-lg
               active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            Approve
                        </button>
            </td>
            
            
        </tr>
    )
}

export default PendingRequests

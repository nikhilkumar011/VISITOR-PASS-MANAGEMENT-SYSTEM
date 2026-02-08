import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan,faEye } from '@fortawesome/free-solid-svg-icons'



const RaisedRequests = ({ visitor, onDelete, onRowClick }) => {
  const [qrData, setQrData] = useState(null);
  const [loadingQR, setLoadingQR] = useState(false);


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
        onDelete(visitor._id)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const fetchQR = async () => {
    try {
      setLoadingQR(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visitordashboard/qrgenerate/${visitor._id}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();
      setQrData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingQR(false);
    }
  };

  useEffect(() => {
    if (visitor.approvedStatus === "Approved") {
      fetchQR();
    }
  }, [visitor.approvedStatus]);



  return (
    <tr  className='bg-gray-50 p-5'>
      <td className='flex justify-center items-center m-auto'>
        <img
          src={`${import.meta.env.VITE_API_URL}/${visitor.photo}`}
          alt="visitor"
          className="w-15 h-15 object-cover rounded-lg border"
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
        <h3 className={`text-white flex p-2 justify-center rounded-2xl shadow m-2
          
          ${visitor.approvedStatus == 'Pending' ? "bg-yellow-500" : visitor.approvedStatus == 'Approved' ? "bg-green-600" : visitor.approvedStatus == 'Rejected' ? "bg-red-600" : ""}`}>{visitor.approvedStatus}</h3>

      </td>
      <td className='px-4 py-3 md:px-2 md:py-2'>
        <div className='flex gap-2 justify-center'>
        <FontAwesomeIcon onClick={() => onRowClick(visitor)} icon={faEye} className='p-2 border border-gray-500 text-gray-600 rounded-2xl cursor-pointer hover:text-white hover:bg-black text-sm' />
       
        <FontAwesomeIcon onClick={deleteRequest} icon={faTrashCan} className='p-2 border border-gray-500 text-red-600 rounded-2xl cursor-pointer hover:text-white hover:bg-red-600 text-sm' />
     </div>
      </td>
    </tr>

    
  )
}

export default RaisedRequests

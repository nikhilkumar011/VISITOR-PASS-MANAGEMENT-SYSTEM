import React from 'react'

const PopupBox = ({ visitor, onClose }) => {
    if (!visitor) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[520px] rounded-xl shadow-xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>
                <div className='p-2 flex gap-3 bg-gray-50'>
                    <img src={`${import.meta.env.VITE_API_URL}/${visitor.photo}`} alt="img" className='w-25' />
                    <div className='flex flex-col'>
                    <h3 className='text-2xl text-gray-800 font-semibold'>{visitor.firstname} {visitor.lastname}</h3>
                    
                    <p className='text-gray-700'>{visitor.email}</p>
                    </div>
                    
                </div>
                
                <div className='flex flex-col md:grid p-3 grid-cols-2 gap-3'>
                     <div>
                        <p className='text-gray-600'>Visiting Employee</p>
                        <p className='text-black font-semibold'>{visitor.visitingEmployee}</p>
                     </div>
                     <div>
                        <p className='text-gray-600'>Reason for visit</p>
                        <p className='text-black font-semibold'>{visitor.reason}</p>
                     </div>
                     <div>
                        <p className='text-gray-600'>Date of visit</p>
                        <p className='text-black font-semibold'>{new Date(visitor.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}</p>
                     </div>
                     <div>
                        <p className='text-gray-600'>Time of visit</p>
                        <p className='text-black font-semibold'>{visitor.time}</p>
                     </div>
                </div>
                
            </div>
        </div>
    )
}


export default PopupBox

import React from 'react'

const PopupBox = ({ visitor, onClose }) => {
    if (!visitor) return null;
    return (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center">
            <div role="dialog" aria-modal="true" aria-label="Visitor details" className="modal-panel relative">
                <button
                    onClick={onClose}
                    aria-label="Close visitor details"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                >
                    ✕
                </button>
                <div className='flex items-center gap-4 rounded-2xl bg-slate-50 p-4 pr-12'>
                    <img src={`${import.meta.env.VITE_API_URL}/${visitor.photo}`} alt="" className='h-16 w-16 rounded-xl object-cover shadow-sm' />
                    <div className='flex flex-col'>
                    <h3 className='text-xl font-bold tracking-tight text-slate-900'>{visitor.firstname} {visitor.lastname}</h3>
                    
                    <p className='mt-1 break-all text-sm text-slate-500'>{visitor.email}</p>
                    </div>
                    
                </div>
                
                <div className='grid grid-cols-1 gap-3 py-5 sm:grid-cols-2'>
                     <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Visiting employee</p>
                        <p className='mt-1 break-all font-semibold text-slate-800'>{visitor.visitingEmployee}</p>
                     </div>
                     <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Reason for visit</p>
                        <p className='mt-1 font-semibold text-slate-800'>{visitor.reason}</p>
                     </div>
                     <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Date of visit</p>
                        <p className='mt-1 font-semibold text-slate-800'>{new Date(visitor.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}</p>
                     </div>
                     <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Time of visit</p>
                        <p className='mt-1 font-semibold text-slate-800'>{visitor.time}</p>
                     </div>
                </div>
                
            </div>
        </div>
    )
}


export default PopupBox

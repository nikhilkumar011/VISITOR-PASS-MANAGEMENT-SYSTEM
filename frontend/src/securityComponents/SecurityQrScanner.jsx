import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";



const SecurityQrScanner = () => {
  const videoRef = useRef(null);
  const [visitor, SetVisitor] = useState({})
  const [error, SetError] = useState("")
  const [checkedInMsg, setCheckedInMsg] = useState("")
  const [scanButton,setScanButton] = useState(false);
  const [open,setOpen] = useState(false)
 
   const scannerRef = useRef(null);

   const PopBox = ()=>{
    if(!visitor) return null
    return(
       <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[520px] rounded-xl shadow-xl p-6 relative">
                <button
                    onClick={()=>setOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>
                <div className='p-2 flex gap-3 bg-gray-50'>
                    <img src={`http://localhost:3000/${visitor.photo}`} alt="img" className='w-25' />
                    <div className='flex flex-col'>
                    <h3 className='text-2xl text-gray-800 font-semibold'>{visitor.firstname} {visitor.lastname}</h3>
                    <p className='text-gray-700'>id : {visitor._id}</p>
                    <p className='text-gray-700'>{visitor.email}</p>
                    </div>
                    
                </div>
                
                <div className='grid p-3 grid-cols-2 gap-3'>
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
                        <p className='text-black font-semibold'>{visitor.date}</p>
                     </div>
                     <div>
                        <p className='text-gray-600'>Time of visit</p>
                        <p className='text-black font-semibold'>{visitor.time}</p>
                     </div>
                </div>
                <button
                onClick={async ()=>{
                  const res = await fetch("http://localhost:3000/visitordashboard/checkin",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({id:visitor._id})
                  })

                  const data = await res.json()
                  if(!res.ok){
                    SetError(data.message)
                    setTimeout(()=>SetError(""),2000)
                  }
                  else{
                    setCheckedInMsg("check-in successful")
                    setTimeout(()=>{
                      SetVisitor({})
                      setCheckedInMsg("")
                      setOpen(false);
                    },2000)
                    
                  }
                } }
                className='bg-green-600 text-white p-3 cursor-pointer rounded-lg hover:bg-green-700 h-15 w-full mt-3'

                >Check In</button>
               {checkedInMsg && <p className="text-green-600 font-semibold">{checkedInMsg}</p>}

            </div>
        </div>
    )
   }

useEffect(() => {
  if (!videoRef.current) return;

  scannerRef.current = new QrScanner(videoRef.current, async (result) => {
    const scannedData = typeof result === "string" ? result : result?.data;
    if (!scannedData) return;

    const cleanPassId = scannedData.trim();

    try {
      const res = await fetch("http://localhost:3000/visitordashboard/verifyqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passId: cleanPassId })
      });

      const data = await res.json();

      if (!res.ok) {
        SetError(data.message);
        setTimeout(() => SetError(""), 2000);
      } else {
        SetVisitor(data.visitor);
        setOpen(true);
      }
    } catch (err) {
      SetError("Something went wrong");
      setTimeout(() => SetError(""), 2000);
    }

    scannerRef.current.stop();
    setScanButton(false); 
  });

  return () => {
    scannerRef.current?.destroy(); 
  };
}, []);

 
  useEffect(() => {
  if (!scannerRef.current) return;

  if (scanButton) {
    scannerRef.current.start();
  } else {
    scannerRef.current.stop();
  }
}, [scanButton]);

   

    
  

  return <div className="flex flex-col md:flex-row items-center justify-center mt-20 
                bg-white shadow-xl rounded-3xl 
                w-[90%] md:w-[75%] mx-auto 
                p-6 md:p-10 gap-8">
  <div className="flex flex-col items-center gap-5 w-full md:w-1/3">
    <h2 className="text-2xl font-semibold text-gray-800">
      QR Code Scanner
    </h2>
    <p className="text-sm text-gray-500 text-center">
      Align the QR code within the frame to scan visitor entry
    </p>
    <button
      onClick={() => setScanButton(prev => !prev)}
      className={`w-full py-3 rounded-xl font-medium text-white 
        transition-all duration-300 
        ${scanButton 
          ? "bg-red-500 hover:bg-red-600" 
          : "bg-blue-600 hover:bg-blue-700"}
        shadow-lg active:scale-95`}
    >
      {scanButton ? "Stop Scan" : "Start Scan"}
    </button>
  </div>
  <div className="relative w-full md:w-2/3 flex justify-center">
    <div className="relative rounded-2xl overflow-hidden 
                    border-4 border-dashed border-gray-300 
                    shadow-inner bg-gray-50 p-2">
      <video
        ref={videoRef}
        className="w-[280px] sm:w-[340px] md:w-[420px] 
                   rounded-xl object-cover"
      />
      {scanButton && (
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500 
                        animate-pulse pointer-events-none" />
      )}
    </div>
  </div>
  {error && (
    <p className="text-red-600 text-sm mt-2 text-center">
      {error}
    </p>
  )}
  {open && <PopBox />}
</div>



}

export default SecurityQrScanner

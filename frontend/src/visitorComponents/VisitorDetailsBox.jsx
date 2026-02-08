import React,{useState,useEffect} from "react";

const VisitorDetailsBox = ({ visitor, onClose }) => {
  if (!visitor) return null;
  const [qrData, setQrData] = useState(null);
  const [loadingQR, setLoadingQR] = useState(false);
  const [qrCache, setQrCache] = useState({});


  const fetchQR = async () => {
    if (qrCache[visitor._id]) {
    setQrData(qrCache[visitor._id]);
    return;
  }
      try {

        setLoadingQR(true);
        const res = await fetch(
          `http://localhost:3000/visitordashboard/qrgenerate/${visitor._id}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
  
        const data = await res.json();
        setQrData(data);
        setQrCache(prev => ({
      ...prev,
      [visitor._id]: data
    }));
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingQR(false);
      }
    };
  
    useEffect(() => {
  if (visitor && visitor.approvedStatus === "Approved") {
    fetchQR();
  }
}, [visitor]);


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
        <div className="flex gap-4 items-center mb-6">
          <img
            src={`http://localhost:3000/${visitor.photo}`}
            alt="Visitor"
            className="w-20 h-20 rounded-lg object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {visitor.firstname} {visitor.lastname}
            </h2>
            

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs text-white rounded-full
                ${
                  visitor.approvedStatus === "Approved"
                    ? "bg-green-600"
                    : visitor.approvedStatus === "Pending"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
            >
              {visitor.approvedStatus}
            </span>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Detail label="Visiting Employee" value={visitor.visitingEmployee} />
          <Detail label="Reason" value={visitor.reason} />
          <Detail label="Date" value={new Date(visitor.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })} />
          <Detail label="Time" value={visitor.time} />
        </div>

        {visitor.approvedStatus === "Approved" && (
          <div className="mt-6 text-center">
            <h3 className="font-semibold mb-2 text-gray-700">
              Visitor QR Code
            </h3>

            {loadingQR && (
              <p className="text-gray-500 text-sm">Fetching QR...</p>
            )}

            {!loadingQR && qrData?.passId && (
              <p className='text-gray-700 text-sm p-3'>{qrData.passId}</p>
              
            )}
            {!loadingQR && qrData?.qrCode && (
              <img
                 src={qrData.qrCode}
                alt="QR Code"
                className="mx-auto w-40 h-40 border rounded-lg"
              />
              
            )}

            {!loadingQR && !qrData?.qrCode && (
              <p className="text-sm text-red-500">
                QR code not available
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || "—"}</p>
  </div>
);

export default VisitorDetailsBox;

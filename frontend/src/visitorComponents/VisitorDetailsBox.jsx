import React, { useCallback, useEffect, useState } from "react";

const VisitorDetailsBox = ({ visitor, onClose }) => {
  const [qrData, setQrData] = useState(null);
  const [loadingQR, setLoadingQR] = useState(false);

  const fetchQR = useCallback(async () => {
    if (!visitor || visitor.approvedStatus !== "Approved") return;

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
  }, [visitor]);

  useEffect(() => {
    fetchQR();
  }, [fetchQR]);

  if (!visitor) return null;


  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center">
      <div role="dialog" aria-modal="true" aria-label="Visitor pass details" className="modal-panel relative">
        <button
          onClick={onClose}
          aria-label="Close visitor details"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
        >
          ✕
        </button>
        <div className="mb-6 flex items-center gap-4 pr-10">
          <img
            src={`${import.meta.env.VITE_API_URL}/${visitor.photo}`}
            alt="Visitor"
            className="h-20 w-20 rounded-2xl border border-slate-200 object-cover shadow-sm"
          />
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {visitor.firstname} {visitor.lastname}
            </h2>
            

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs text-white rounded-full
                ${
                  visitor.approvedStatus === "Approved"
                    ? "bg-emerald-600"
                    : visitor.approvedStatus === "Pending"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
            >
              {visitor.approvedStatus}
            </span>
          </div>
        </div>

        
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
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
            <h3 className="mb-3 font-semibold text-slate-800">
              Visitor QR Code
            </h3>

            {loadingQR && (
              <p className="flex items-center justify-center gap-2 py-4 text-sm text-slate-500" role="status">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />
                Preparing your visitor pass...
              </p>
            )}

            {!loadingQR && qrData?.passId && (
              <p className='p-3 text-sm font-semibold tracking-wide text-slate-600'>{qrData.passId}</p>
              
            )}
            {!loadingQR && qrData?.qrCode && (
              <img
                 src={qrData.qrCode}
                alt="QR Code"
                className="mx-auto h-44 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
              />
              
            )}

            {!loadingQR && !qrData?.qrCode && (
              <p className="text-sm font-medium text-rose-600">
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
  <div className="min-w-0">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-1 break-words font-semibold text-slate-800">{value || "—"}</p>
  </div>
);

export default VisitorDetailsBox;

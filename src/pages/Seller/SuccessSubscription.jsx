import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { getSessionDetails } from "../../utils/api";
import { FcOk } from "react-icons/fc";

const SuccessSubscription = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      getSessionDetails(sessionId)
        .then((response) => {
          console.log("Session Data:", response);
          setSession(response);
        })
        .catch((error) => {
          console.error("Error retrieving session:", error);
          setError("An error occurred while retrieving subscription details.");
        });
    }
  }, [location]);

  const handleButtonClick=()=>{
navigate('/listedproperties')
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!session) {
    return <p>Loading...</p>;
  }

  const { metadata, amount_subtotal, expires_at } = session;
  const amountPaid = amount_subtotal / 100;

  return (
    <>

      <div className="flex w-full h-screen justify-center gap-10  flex-col">
        <div className=" w-full absolute top-10">
          <img
            src="/images/REAL-TY.png"
            alt="Realty Logo"
            className="w-24 mx-auto h-24"
          />
        </div>
        <div className="flex justify-center h-80 w-full">
          <div className="flex justify-between flex-col bg-white p-4 w-3/12 rounded shadow h-full ">
            <div className="text-green-500 text-center font-bold">
                <div className="flex justify-center">
                <FcOk size={47} />
                </div>
             
              <p className="font-medium">Payment Success!</p>
              <div className="text-2xl font-semibold text-center">
                ₹{amountPaid?.toFixed(2)}
              </div>
              <p className="text-black font-semibold">
                Thank you for your purchase
              </p>
            </div>
            <hr />
            {metadata && (
              <div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <span>Expiry Date</span>
                    <span>
                      {expires_at
                        ? new Date(expires_at * 1000).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span>{metadata.subscription_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span>{amountPaid.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleButtonClick} className="text-red-600 font-bold ">Close</button>
      </div>
    </>
  );
};

export default SuccessSubscription;

// import React, { useState, useEffect, useRef } from 'react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { format } from 'date-fns';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const ChatComponent = ({ sellerId }) => {
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello Sir", sender: "user", time: "Wed 10.20 AM" },
//     { id: 2, text: "Yes, How can I help you.", sender: "me", time: "5min ago" },
//   ]);

//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages([
//         ...messages,
//         { id: messages.length + 1, text: newMessage, sender: "me", time: "Just now" },
//       ]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <>  
    
//     <Navbar />
//     <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
//         <div className="w-2/4 h-3/4 bg-white rounded-lg shadow-lg p-4">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                     <img
//                         src="https://via.placeholder.com/40" 
//                         alt="User Avatar"
//                         className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                         <p className="font-bold">Alex</p>
//                     </div>
//                 </div>
//                 <button className="text-gray-500 hover:text-gray-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//                 </button>
//             </div>

//             <div className="mt-4 overflow-y-auto h-60">
//                 {messages.map((message) => (
//                 <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-4`}>
//                     <div className={`max-w-xs ${message.sender === "me" ? "bg-gray-200" : "bg-gray-100"} rounded-lg p-2`}>
//                         <p className="text-sm">{message.text}</p>
//                         <p className="text-xs text-gray-500">{message.time}</p>
//                     </div>
//                 </div>
//                 ))}
//             </div>
//                 <div className="flex items-center mt-4">
//                     <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Text here.."
//                     />
//                     <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     </button>
//                 </div>
//         </div> 
//     </div>
  
//     </>
//   );
// };

// export default ChatComponent;




// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar';
// import { handleFetchSellerProfile } from '../../utils/auth';

// const ChatComponent = ({ sellerId }) => {
//   const [messages, setMessages] = useState([]); 
//   const [newMessage, setNewMessage] = useState("");
//   const [user, setUser] = useState(null);
 

//   useEffect(() => {
 
//     const fetchMessages = async () => {
//       try {
    
//         const response = await fetch(`/api/messages/${sellerId}`);
//         const data = await response.json();

//         setMessages(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setMessages([]); 
//       }
//     };

//     fetchMessages();
//   }, [sellerId]);
 
//   useEffect(async () => {
//     const sellerResponse = await handleFetchSellerProfile(sellerId)
//     setUser(sellerResponse.data);
  
//   }, [sellerId])
  


//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const newMessageObject = {
//         id: messages.length + 1,
//         text: newMessage,
//         sender: "me",
//         time: "Just now",
//       };

//       setMessages([
//         ...messages,
//         newMessageObject,
//       ]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <>  
//       <Navbar />
//       <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
//         <div className="w-2/4 h-3/4 bg-white rounded-lg shadow-lg p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               {/* <img
//                 src="https://via.placeholder.com/40" 
//                 alt="User Avatar"
//                 className="w-10 h-10 rounded-full"
//               /> */}
//               <img 
//                   src={user.profile_image? user.profile_image : '/images/user.png'}                  
//                   alt="Profile" 
//                   className="w-10 h-10 rounded-full" 
//                 />
//               <div>
//                 <p className="font-bold">{user.username}</p>
//               </div>
//             </div>
//             <button className="text-gray-500 hover:text-gray-700">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-4 overflow-y-auto h-60">
//             {messages.map((message) => (
//               <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-4`}>
//                 <div className={`max-w-xs ${message.sender === "me" ? "bg-gray-200" : "bg-gray-100"} rounded-lg p-2`}>
//                   <p className="text-sm">{message.text}</p>
//                   <p className="text-xs text-gray-500">{message.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="flex items-center mt-4">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Text here.."
//             />
//             <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//             </button>
//           </div>
//         </div> 
//       </div>
//     </>
//   );
// };

// export default ChatComponent;


// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar';
// import { handleFetchSellerProfile } from '../../utils/auth';
// import { useNavigate, useParams } from 'react-router-dom';


// const ChatComponent = () => {
// const { sellerId } = useParams();  // Extract sellerId from URL params

//   const [messages, setMessages] = useState([]); 
//   const [newMessage, setNewMessage] = useState("");
//   const [seller, setSeller] = useState(null);
//   const navigate = useNavigate()

//   useEffect(() => {
//  console.log(sellerId);
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(`/api/messages/${sellerId}`);
//         const data = await response.json();

//         setMessages(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setMessages([]);  
//       }
//     };

//     fetchMessages();
//   }, [sellerId]);
 
//   useEffect(() => {
//     const fetchUser = async () => {
//     try {
//         if (sellerId) {
//           const sellerResponse = await handleFetchSellerProfile(sellerId);
//           setSeller(sellerResponse.data);
//         }
//       } catch (error) {
//         console.error('Error fetching seller data:', error);
//       }
//     };

//     fetchUser();
//   }, [sellerId]);
  

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const newMessageObject = {
//         id: messages.length + 1,
//         text: newMessage,
//         sender: "me",
//         time: "Just now",
//       };

//       setMessages([
//         ...messages,
//         newMessageObject,
//       ]);
//       setNewMessage("");
//     }
//   };

//   const handleCloseChat = () => {
//     navigate(-1);  
//   };

//   return (
//     <>  
//       <Navbar />
//       <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
//         <div className="w-2/4 h-3/4 bg-white rounded-lg shadow-lg p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               {seller && (
//                 <>
//                   <img 
//                     src={seller.profile_image ? seller.profile_image : '/images/user.png'}                  
//                     alt="Profile" 
//                     className="w-10 h-10 rounded-full" 
//                   />
//                   <div>
//                     <p className="font-bold">{seller.username}</p>
//                   </div>
//                 </>
//               )}
//             </div>
//             <button onClick={handleCloseChat} className="text-gray-500 hover:text-gray-700">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-4 overflow-y-auto h-60">
//             {messages.map((message) => (
//               <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-4`}>
//                 <div className={`max-w-xs ${message.sender === "me" ? "bg-gray-200" : "bg-gray-100"} rounded-lg p-2`}>
//                   <p className="text-sm">{message.text}</p>
//                   <p className="text-xs text-gray-500">{message.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="flex items-center mt-4">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Text here.."
//             />
//             <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//             </button>
//           </div>
//         </div> 
//       </div>
//     </>
//   );
// };

// export default ChatComponent;


import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { handleFetchSellerProfile } from '../../utils/auth';
import { fetchMessages, sendMessage } from '../../utils/messageService';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatComponent = () => {
  const { sellerId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  // Get the current user from the Redux store
  const currentUser = useSelector(state => state.auth.user);

  // Load messages from the server
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages(sellerId);
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      }
    };

    loadMessages();
  }, [sellerId]);

  // Load seller profile from the server
  useEffect(() => {
    const loadSellerProfile = async () => {
      try {
        if (sellerId) {
          const sellerResponse = await handleFetchSellerProfile(sellerId);
          setSeller(sellerResponse.data);
        }
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    loadSellerProfile();
  }, [sellerId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const newMessageObject = await sendMessage(sellerId, newMessage);
        setMessages([...messages, newMessageObject]);
        setNewMessage("");
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    }
  };

  // Handle closing the chat
  const handleCloseChat = () => {
    navigate(-1);  
  };

  return (
    <>  
      <Navbar />
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
        <div className="w-2/4 h-3/4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {seller && (
                <>
                  <img 
                    src={seller.profile_image ? seller.profile_image : '/images/user.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{seller.username}</p>
                  </div>
                </>
              )}
            </div>
            <button onClick={handleCloseChat} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 overflow-y-auto h-60">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender.id === currentUser.id ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`max-w-xs ${message.sender.id === currentUser.id ? "bg-blue-200 text-white" : "bg-gray-100"} rounded-lg p-2`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div> 
      </div>
    </>
  );
};

export default ChatComponent;

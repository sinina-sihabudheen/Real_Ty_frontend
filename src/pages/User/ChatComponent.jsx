import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { handleFetchSellerProfile } from '../../utils/auth';
import { fetchMessages, sendMessage, handleMarkMessageAsRead } from '../../utils/messageService';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatComponent = () => {
  const { sellerId, propertyId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user); 

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages(sellerId); 
        setMessages(Array.isArray(data.results) ? data.results : []);
        console.log(("MSG",messages));
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      }
    };

    loadMessages();
  }, [sellerId]);

  useEffect(() => {
    const markMessagesAsRead = async (sellerId) => {
        try {
            await handleMarkMessageAsRead(sellerId);
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    if (sellerId) {
        markMessagesAsRead(sellerId); 
    }
}, [sellerId]);

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

  
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        console.log("PropertyID",propertyId);
        const newMessageObject = await sendMessage(sellerId, currentUser.id, propertyId || null, newMessage); 
        setMessages([...messages, newMessageObject]);
        setNewMessage("");
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    }
  };

  const handleCloseChat = () => {
    navigate(-1); 
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  };

  return (
    <>
      <Navbar />
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
        <div className="w-1/3 h-3/4 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
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

          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === currentUser.id ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-xs ${message.sender === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-100 text-black"} rounded-lg p-2`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-gray-700">{formatDateTime(message.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex">
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

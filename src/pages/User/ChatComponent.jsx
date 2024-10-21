import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import { handleFetchSellerProfile } from '../../utils/auth';
import { fetchMessages } from '../../utils/messageService';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatComponent = () => {
  const { sellerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [seller, setSeller] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user);

  const messagesEndRef = useRef(null);   
  const chatBoxRef = useRef(null);  

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages(sellerId);
        const validMessages = data.results.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp).toISOString(), 
        }));
        setMessages(Array.isArray(validMessages) ? validMessages : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      }
    };

    loadMessages();

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const token = localStorage.getItem('access'); 

    const createWebSocket = () => {
      const wsUrl = `${protocol}://localhost:8000/ws/chat/${sellerId}/?token=${token}`;
      
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };

   
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
    
      // Check if message has the text and sender info
      if (message && message.text) {
        const parsedTimestamp = message.timestamp ? new Date(message.timestamp) : new Date();
        
        // Ensure valid timestamp
        if (!isNaN(parsedTimestamp.getTime())) {
          message.timestamp = parsedTimestamp.toISOString();
          
          // Add the message to state
          setMessages((prevMessages) => [...prevMessages, message]);
        } else {
          console.error("Received message does not have a valid timestamp:", message);
        }
      } else {
        console.error("Received message format is invalid:", message);
      }
    };
    

      ws.onclose = (e) => {
        console.error('Chat socket closed unexpectedly', e.code);
        setTimeout(createWebSocket, 5000); 
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return ws;
    };

    const ws = createWebSocket();
    setSocket(ws);
 
    return () => {
      ws.close();
    };
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


  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use effect to scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = () => {
    if (newMessage.trim()) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        const messageObject = {
          sender: currentUser.id,
          receiver: sellerId,
          text: newMessage,
          timestamp: new Date().toISOString(), // Current date and time in ISO format
        };

        // Log the message being sent
        console.log('Sending message:', messageObject);

        // Add the message to the local state immediately
        setMessages((prevMessages) => [...prevMessages, messageObject]);

        // Send the message through the WebSocket
        socket.send(JSON.stringify(messageObject)); 
        setNewMessage("");
      } else {
        console.error('WebSocket is not connected.');
      }
    }
  };

  const handleCloseChat = () => {
    navigate(-1);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid date" : `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
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
                    <p className="font-bold capitalize">{seller.username}</p>
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

          <div ref={chatBoxRef} className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === currentUser.id ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-xs ${message.sender === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-100 text-black"} rounded-lg p-2`}
                >
                  {/* <p className="text-sm capitalize">{message.text}</p> */}
                  <p className="text-sm capitalize">{message.text || "No message content"}</p>

                  <p className="text-xs text-gray-700">{formatDateTime(message.timestamp)}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex ">
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

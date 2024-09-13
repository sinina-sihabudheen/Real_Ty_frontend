import api from './api'; 

export const fetchMessages = async (sellerId) => {
    try {
        const response = await api.get(`/api/messages/${sellerId}/`);
        console.log("MESSAGES DATA",response.data.results);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const sendMessage = async (sellerId,userId,id, newMessage) => { 
    try {
        console.log("SELLER,USER",sellerId,userId,id);
      const response = await api.post('/api/send-message/', {
        text: newMessage,
        property_content_type: 'property',
        property_object_id: id,
        sender: userId,
        receiver: sellerId
      }, {
        headers: {
          'Content-Type': 'application/json',
       
        }
      });
      
      console.log("Server response:", response.data);

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };
  


  export const fetchUnreadMessages = async (setUnreadMessages) => {
    try {
        const response = await api.get('api/messages/unread/');
        console.log("UNREAD",response.data)
        setUnreadMessages(response.data);
    } catch (error) {
        console.error("Error fetching unread messages:", error);
        setUnreadMessages([]);
    }
};

export const handleMarkMessageAsRead = async(senderId) => {
    try{
        const response = await api.post(`api/messages/mark-messages-as-read/${senderId}`);
        
        return response;
    }catch(error){
        console.error('Error marking messages as read:', error);
        throw error;
    }
}
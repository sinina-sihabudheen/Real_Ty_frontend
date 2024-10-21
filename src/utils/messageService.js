import api from './api'; 

export const fetchMessages = async (sellerId) => {
    try {
        const response = await api.get(`/notifications/messages/${sellerId}/`);
        console.log("MESSAGES DATA",response.data.results);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};


  export const fetchUnreadMessages = async (setUnreadMessages) => {
    try {
        const response = await api.get('notifications/messages/unread/');
        console.log("UNREAD",response.data)
        setUnreadMessages(response.data);
    } catch (error) {
        console.error("Error fetching unread messages:", error);
        setUnreadMessages([]);
    }
};

export const markMessagesAsRead = async(senderId) => {
    try{
        const response = await api.post(`notifications/messages/mark-messages-as-read/${senderId}`);
        
        return response;
    }catch(error){
        console.error('Error marking messages as read:', error);
        throw error;
    }
}
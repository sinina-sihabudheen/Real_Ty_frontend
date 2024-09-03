import api from './api'; 

export const fetchMessages = async (sellerId) => {
    try {
        const response = await api.get(`/api/messages/${sellerId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const sendMessage = async () => {
    try {
        const response = await api.post('/api/send-message/', {
            text: newMessage,
            property_content_type: 'property',
            property_object_id: propertyId,
            receiver: sellerId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${yourToken}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
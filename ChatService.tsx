import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:6968";


    class ChatService {

        // Since your server only has the /completion endpoint, let's focus on that
        createCompletion(chat: { text: string; sender: string; }) {
            const prompt = chat.text;
            const n_predict = 200;
            const stream = false;  // Set to true if you want to handle streaming
        
            return axios.post(`${API_BASE_URL}/completion`, {
                prompt,
                n_predict,
                stream
            });
        }

//     getModels(){
//         return axios.get(`${API_BASE_URL}/models`);
//     }

//     createChatCompletion(chat: { text: string; sender: string; }){
//         return axios.post(`${API_BASE_URL}/chat/completions`, chat);
//     }

//     createCompletion(chat: { text: string; sender: string; }){
//         return axios.post(`${API_BASE_URL}/completions`, chat);
//     }

//     createEmbedding(chat: { text: string; sender: string; }){
//         return axios.post(`${API_BASE_URL}/embeddings`, chat);
//     }
}

export default new ChatService();
import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.github.com",
    
});

export function useAxios() {

    async function get(url: string, params?: object, throwError = false) {
        try {
            const response = await api.get(url, { params });
            return response.data;
        } catch (error: any) {
            if (throwError) throw error;
            console.log(error);
        }
    }

    return { get };
}
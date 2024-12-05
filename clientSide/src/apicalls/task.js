import { axiosInstance } from '../apicalls/index';

export const addTask = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/task/add-task', payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getTasks = async (payload) => {
    try {
        const response = await axiosInstance.get('/api/task/get-tasks', payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
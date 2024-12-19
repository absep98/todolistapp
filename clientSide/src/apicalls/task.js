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

export const updateTask = async (taskId, taskData) => {
    try {
        console.log('====================================');
        console.log(taskData, taskId);
        console.log('====================================');
        const response = await axiosInstance.put(`/api/task/update-task/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        console.log('====================================');
        console.log( taskId);
        console.log('====================================');
        const response = await axiosInstance.delete(`/api/task/delete-task/${taskId}`);
        console.log('backend response ', response);
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
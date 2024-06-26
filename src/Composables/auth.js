import {ref} from "vue";
import axios from "axios";

export function auth(){
    const authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    const base_url = ref('https://jobconnecting.kwetunyumbani.online/api/')
    const storage = ref('https://jobconnecting.kwetunyumbani.online/backend/public/')

    // const base_url = ref('http://127.0.0.1:8000/api/')
    // const storage = ref('http://127.0.0.1:8000/')

    const   authUser = async () => {
        try {
            const res= await axios.get(base_url.value+'auth/user', authHeader);
        } catch (error) {
            window.location.href = '/auth/login';
        }
    }
    return {
        authHeader,authUser,base_url,storage
    }
}
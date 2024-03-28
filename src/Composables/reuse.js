import {ref} from "vue";
import axios from "axios";

import {auth} from "@/Composables/auth.js";
const {authHeader,authUser,base_url,storage} =auth()

const my_connect_now = ref('')
const j_connect_now = ref('')
const my_connects = ref('')
const e_connects = ref('')

export function reuse(){

    const   my_Connects   = async () => {
        const res= await axios.get(base_url.value+'posts/my_connects', authHeader)
        if(res.status === 200){
            my_connect_now.value = res.data.connects
        }
    }
    const   j_Connects   = async () => {
        const res= await axios.get(base_url.value+'posts/j_connects', authHeader)
        if(res.status === 200){
            j_connect_now.value = res.data.connects
        }
    }



    const   fetchmyConnect = async () => {
        const res= await axios.get(base_url.value+'show_j_connects', authHeader)
        if(res.status === 200){
            my_connects.value = res.data.connects
        }
    }

    const   fetch_e_Connect = async () => {
        const res= await axios.get(base_url.value+'show_e_connects', authHeader)
        if(res.status === 200){
            e_connects.value = res.data.connects
        }
    }

    return{
        my_Connects,j_Connects,fetchmyConnect,fetch_e_Connect,e_connects,my_connects,my_connect_now,j_connect_now
    }
}

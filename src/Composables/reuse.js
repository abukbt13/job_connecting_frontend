import {ref} from "vue";
import axios from "axios";

import {auth} from "@/Composables/auth.js";
const {authHeader,authUser,base_url,storage} =auth()

const my_connect_now = ref('')
const j_connect_now = ref('')

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
    return{
        my_Connects,j_Connects,my_connect_now,j_connect_now
    }
}

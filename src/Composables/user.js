import {ref} from "vue";
import axios from "axios";
import {auth} from "@/Composables/auth.js";
const {authHeader,authUser,base_url,storage} =auth()
export function user(){
    const details=ref(null)
    const userd=ref('')
    const   userDetails = async () => {
            const res= await axios.get(base_url.value+'user', authHeader)
        if(res.status === 200){
            details.value=res.data
            userd.value=res.data.email
        }
    }
    return{
        authHeader,authUser,base_url,storage,userDetails,details,userd
    }
}
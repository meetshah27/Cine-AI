import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand'

export const userAuthStore=create((set)=>
({ 
    user:null,
    isSignup:false,
    isCheckingAuth:true,
    isLoggingout:false,
    isLoggingin:false,
    signup:async(credentials)=>{
        set({isSignup:true});
        try 
        {
           const response=await axios.post("/api/v1/auth/signup",credentials); 
           console.log(response);   
           set({user:response.data.user, isSignup:false});
        }
        catch (error) 
        {
            toast.error(error.response.data.message||"Error Occured");
            set({isSignup:false,user:null});
        }
    },
    login:async(credentials)=>{
        set({isLoggingin:true});
        try 
        {
            const response=await axios.post("/api/v1/auth/login",credentials); 
            console.log(response);   
            set({user:response.data.user, isLoggingin:false});
            toast.success("Logged In Successfully");
        }
        catch (error) 
        {
            toast.error(error.response.data.message||"Error Occured");
            set({isLoggingin:false, user:null});
        }
    },
    logout:async()=>{
        set({isLoggingout:true});
        try 
        {
            await axios.post("/api/v1/auth/logout");
            set({user:null,isLoggingout:false});
            toast.success("Logged Out Successfully");
        } catch (error)
        {
            set({isLoggingout:false});
            toast.error(error.response.data.message||"Error Occured");
            console.log(error.message);
        }
    },
    authCheck:async()=>{
        set({isCheckingAuth:true});
        try 
        {
            const response = await axios.get("/api/v1/auth/authcheck")
            set({user:response.data.user, isCheckingAuth:false});
        } 
        catch (error)  
        {
            console.log(error.response.data.message||"Error Occured");
            set({user:null, isCheckingAuth:false});
        }
    },
}))
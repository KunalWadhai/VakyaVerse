import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
   authUser: null,
   isCheckingAuth: true, 
   isSigningUp: false,

   checkAuth: async () => {
      try{
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data?.user, isCheckingAuth: false});
      }catch(error){
        console.log(error);
        set({authUser: null});
      }
      finally{
        set({isCheckingAuth: false});
      }
   },

   signup: async (userData) => {
     set({isSigningUp: true});
     try{
        const res = await axiosInstance.post("/auth/signup", userData);
        set({authUser: res.data?.user});

        toast.success("Signup Successfully!");
        return res.data;
     }catch(error){
        toast.error(error.response?.data?.message || "Signup Failed");
        console.log(error);
     }
     finally{
        set({isSigningUp: false}); 
     }
   }
}));
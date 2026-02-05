import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser : {name: 'Kunal', _id: 2707, age: 22},
    isLoading: false,
    isLoggedIn: false,

    login: () => {
        console.log("We are just logged in");
        set({isLoggedIn: true});
    }
}));
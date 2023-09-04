import { selector } from "recoil";
import { userState } from "../store/atoms/user";

export const isUserLoading = selector({
    key:"isUserLoading",
    get:({get})=>{
        const state = get(userState);
        return state.isLoading
    }
})
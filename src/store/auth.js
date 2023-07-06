import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/main";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                throw error
            }
        }
    }
}
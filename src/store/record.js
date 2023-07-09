import { ref, push, child, get, update } from "firebase/database"
import { database } from "@/main"

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                const newRecord = await push(ref(database, `/users/${uid}/records`), record)
                return newRecord
            } catch (error) {
                commit('setError', error)
                throw error
            }
        }
    }
}
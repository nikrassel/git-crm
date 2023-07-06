import { ref, child, get } from "firebase/database"
import { database } from "@/main"

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const refDB = ref(database)
                const info = await get(child(refDB, `/users/${uid}/info`))
                commit('setInfo', info.val())
            } catch (error) {
                
            }
        }
    },
    getters: {
        info: s => s.info
    }
}
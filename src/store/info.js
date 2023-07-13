import { ref, child, get, update } from "firebase/database"
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
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch("getUid")
                const refDB = ref(database)
                const info = await get(child(refDB, `/users/${uid}/info`))
                commit("setInfo", info.val())
            } catch (error) {
                commit("setError", error)
                throw error
            }
        },
        async updateInfo({ dispatch, commit, getters }, toUpdate) {
            try {
                const uid = await dispatch("getUid")
                const updates = {}
                updates[`/users/${uid}/info`] = { ...getters.info, ...toUpdate }
                await update(ref(database), updates)
                commit("setInfo", { ...getters.info, ...toUpdate })
            } catch (error) {
                commit("setError", error)
                throw error
            }
        }
    },
    getters: {
        info: (s) => s.info
    }
}

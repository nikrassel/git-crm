import { ref, push, child, get } from "firebase/database"
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
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const refDB = ref(database)
                const res = await get(child(refDB, `/users/${uid}/records`))
                const records = res.val()
                return Object.keys(records).map(key => ({
                    ...records[key],
                    id: key
                }))
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async fetchRecordById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUid')
                const refDB = ref(database)
                const res = await get(child(refDB, `/users/${uid}/records/${id}`))
                const record = res.val()
                return {...record, id}
            } catch (error) {
                commit('setError', error)
                throw error
            }
        }
    }
}
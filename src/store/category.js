import { ref, set, push } from "firebase/database"
import { database } from "@/main"

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
                const category = await push(ref(database, `/users/${uid}/categories`), {
                    title,
                    limit
                })
                return {title, limit, id: category.key}
            } catch (error) {
                commit('setError', error)
                throw error
            }
        }
    }
}
import { ref, push, child, get, update } from "firebase/database"
import { database } from "@/main"

export default {
    actions: {
        async fetchCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const refDB = ref(database)
                const res = await get(child(refDB, `/users/${uid}/categories`))
                const categories = res.val()
                return Object.keys(categories).map(key => ({
                    ...categories[key],
                    id: key
                }))
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async fetchCategoryById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid')
                const refDB = ref(database)
                const res = await get(child(refDB, `/users/${uid}/categories/${id}`))
                const category = res.val()
                return {...category, id}
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
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
        },
        async updateCategory({commit, dispatch}, {id, title, limit}) {
            const uid = await dispatch('getUid')
            const updates = {}
            updates[`/users/${uid}/categories/${id}`] = { title: title, limit: limit}
            await update(ref(database), updates)
        }
    }
}
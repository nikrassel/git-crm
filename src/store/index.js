import { createStore } from "vuex"
import auth from "./auth"
import info from "./info"
import category from "./category"
import record from "./record"
import { ref, child, get } from "firebase/database"
import { database } from "@/main"

export default createStore({
    state: {
        error: null
    },
    getters: {
        error: (s) => s.error
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async fetchCurrency() {
            const key = process.env.VUE_APP_FIXER
            const res = await fetch(
                `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
            )
            return await res.json()
        },
        async fetchRates() {
            const refDB = ref(database)
            const rates = await get(child(refDB, `/currency`))
            return rates.val()
        }
    },
    modules: {
        auth,
        info,
        category,
        record
    }
})

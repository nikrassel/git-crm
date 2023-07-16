<template>
    <form class="form" @submit.prevent="submitHandler">
        <h4>{{ $filters.localizeFilter("Top_Up_Title") }}</h4>
        <div class="input-field">
            <input
                id="amount"
                type="number"
                v-model.number="amount"
                :class="{
                    invalid: v$.amount.$dirty && !v$.amount.minValue.$response
                }"
            />
            <label for="amount">{{
                $filters.localizeFilter("Table_Amount")
            }}</label>
            <span
                class="helper-text invalid"
                v-if="v$.amount.$dirty && !v$.amount.minValue.$response"
                >{{ $filters.localizeFilter("Amount_Error") }}
                {{ v$.amount.minValue.$params.min }}</span
            >
        </div>
        <button class="btn waves-light" type="submit">
            {{ $filters.localizeFilter("Top_Up_Button") }}
            <i class="material-icons right">send</i>
        </button>
    </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import { minValue } from "@vuelidate/validators"
import { mapGetters } from "vuex"
export default {
    name: "home",
    data: () => ({
        v$: useVuelidate(),
        amount: 1
    }),
    validations: {
        amount: { minValue: minValue(1) }
    },
    async mounted() {
        setTimeout(() => {
            M.updateTextFields()
        }, 0)
    },
    computed: {
        ...mapGetters(["info"])
    },
    methods: {
        async submitHandler() {
            this.v$.$validate()
            if (!this.v$.$error) {
                const updatedBill = this.info.bill + this.amount
                try {
                    await this.$store.dispatch("updateInfo", {
                        bill: updatedBill
                    })
                    this.v$.$reset()
                    this.amount = 1
                } catch (error) {}
            }
        }
    }
}
</script>

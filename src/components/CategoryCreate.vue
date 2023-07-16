<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ $filters.localizeFilter("Create") }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{
                            invalid:
                                v$.title.$dirty && !v$.title.required.$response
                        }"
                    />
                    <label for="name">{{
                        $filters.localizeFilter("Category_Name")
                    }}</label>
                    <span
                        v-if="v$.title.$dirty && !v$.title.required.$response"
                        class="helper-text invalid"
                        >{{
                            $filters.localizeFilter("Category_Name_Error")
                        }}</span
                    >
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{
                            invalid:
                                v$.limit.$dirty && !v$.limit.minValue.$response
                        }"
                    />
                    <label for="limit">{{
                        $filters.localizeFilter("Limit")
                    }}</label>
                    <span
                        v-if="v$.limit.$dirty && !v$.limit.minValue.$response"
                        class="helper-text invalid"
                        >{{ $filters.localizeFilter("Limit_Error") }}
                        {{ v$.limit.minValue.$params.min }}</span
                    >
                </div>

                <button class="btn waves-light" type="submit">
                    {{ $filters.localizeFilter("Create") }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import { required, minValue } from "@vuelidate/validators"
export default {
    data: () => ({
        v$: useVuelidate(),
        title: "",
        limit: 1
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(1) }
    },
    mounted() {
        M.updateTextFields()
    },
    methods: {
        async submitHandler() {
            this.v$.$validate()
            if (!this.v$.$error) {
                try {
                    const category = await this.$store.dispatch(
                        "createCategory",
                        {
                            title: this.title,
                            limit: this.limit
                        }
                    )
                    this.title = ""
                    this.limit = 1
                    this.v$.$reset()
                    M.toast({ html: "Категория была создана" })
                    this.$emit("created", category)
                } catch (error) {}
            }
        }
    }
}
</script>

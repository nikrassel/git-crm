<template>
    <div>
        <div class="page-title">
            <h3>{{ $filters.localizeFilter("ProfileTitle") }}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="name"
                    :class="{
                        invalid: v$.name.$dirty && !v$.name.required.$response
                    }"
                />
                <label for="description">{{
                    $filters.localizeFilter("Name")
                }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.name.$dirty && !v$.name.required.$response"
                    >{{ $filters.localizeFilter("Message_EnterName") }}</small
                >
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isRuLocale" />
                    <span class="lever"></span>
                    Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ $filters.localizeFilter("Update") }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { mapGetters, mapActions } from "vuex"
export default {
    data: () => ({
        v$: useVuelidate(),
        name: "",
        isRuLocale: true
    }),
    mounted() {
        this.name = this.info.name
        this.isRuLocale = this.info.locale === "ru-RU"
        setTimeout(() => {
            M.updateTextFields()
        })
    },
    computed: {
        ...mapGetters(["info"])
    },
    validations: {
        name: { required }
    },
    methods: {
        ...mapActions(["updateInfo"]),
        async submitHandler() {
            this.v$.$validate()
            if (!this.v$.$error) {
                try {
                    await this.updateInfo({
                        name: this.name,
                        locale: this.isRuLocale ? "ru-RU" : "en-US"
                    })
                } catch (error) {}
            }
        }
    }
}
</script>

<style>
.switch {
    margin-bottom: 2rem;
}
</style>

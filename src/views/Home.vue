<template>
    <div>
        <div class="page-title">
            <h3>{{ $filters.localizeFilter("Menu_Bill") }}</h3>

            <button class="btn waves-light btn-small" @click="refresh">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <Loader v-if="loading" />
        <div v-else>
            <div class="row">
                <HomeBill :rates="currency.rates" />
                <HomeCurrency :rates="currency.rates" :date="currency.date" />
            </div>
            <HomeTopup />
        </div>
    </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue"
import HomeCurrency from "@/components/HomeCurrency.vue"
import HomeTopup from "@/components/HomeTopup.vue"
export default {
    name: "home",
    data: () => ({
        loading: true,
        currency: null
    }),
    async mounted() {
        await this.$store.dispatch("fetchInfo")
        this.currency = await this.$store.dispatch("fetchCurrency")
        if (this.currency.success === false) {
            this.currency = await this.$store.dispatch("fetchRates")
        }
        this.loading = false
    },
    methods: {
        async refresh() {
            this.loading = true
            this.currency = await this.$store.dispatch("fetchCurrency")
            if (this.currency.success === false) {
                this.currency = await this.$store.dispatch("fetchRates")
            }
            this.loading = false
        }
    },
    components: {
        HomeBill,
        HomeCurrency,
        HomeTopup
    }
}
</script>

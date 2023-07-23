<template>
    <div class="col s12 m6 l4">
        <div class="card cyan darken-1 bill-card">
            <div class="card-content white-text">
                <span class="card-title">{{
                    $filters.localizeFilter("Currency_Account")
                }}</span>

                <p v-for="cur of currencies" :key="cur" class="currency-line">
                    <span>{{
                        $filters.currencyFilter(getCurrency(cur), cur)
                    }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["rates"],
    data: () => ({
        currencies: ["RUB", "USD", "EUR"]
    }),
    computed: {
        base() {
            return this.$store.getters.info
                ? this.$store.getters.info.bill /
                      (this.rates["RUB"] / this.rates["EUR"])
                : 0
        }
    },
    methods: {
        getCurrency(currency) {
            return Math.floor(this.base * this.rates[currency])
        }
    }
}
</script>

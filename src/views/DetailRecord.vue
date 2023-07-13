<template>
    <div>
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb"
                    >История</router-link
                >
                <a @click.prevent class="breadcrumb">
                    {{ record.typeText }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="[record.typeClass]">
                        <div class="card-content white-text">
                            <p>Описание: {{ record.description }}</p>
                            <p>Сумма: {{ record.amount }}</p>
                            <p>Категория: {{ record.categoryName }}</p>

                            <small>{{
                                dateFormater(record.date, "datetime")
                            }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else>
            Запись с id {{ $route.params.id }} не найдена
        </p>
    </div>
</template>

<script>
export default {
    name: "detail",
    data: () => ({
        record: null,
        loading: true
    }),
    async mounted() {
        await this.$store.dispatch("fetchInfo")
        const id = this.$route.params.id
        const record = await this.$store.dispatch("fetchRecordById", id)
        const category = await this.$store.dispatch(
            "fetchCategoryById",
            record.categoryId
        )
        this.record = {
            ...record,
            categoryName: category.title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "доход" : "расход"
        }
        this.loading = false
    },
    methods: {
        dateFormater: function (recordDate, timeFormat) {
            const options = {}
            if (timeFormat.includes("date")) {
                options.day = "2-digit"
                options.month = "long"
                options.year = "numeric"
            }
            if (timeFormat.includes("time")) {
                options.hour = "2-digit"
                options.minute = "2-digit"
                options.second = "2-digit"
            }
            return new Intl.DateTimeFormat("ru-Ru", options).format(
                new Date(recordDate)
            )
        }
    }
}
</script>

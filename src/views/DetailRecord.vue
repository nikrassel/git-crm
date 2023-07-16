<template>
    <div>
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">{{
                    $filters.localizeFilter("Menu_History")
                }}</router-link>
                <a @click.prevent class="breadcrumb">
                    {{ record.typeText }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="[record.typeClass]">
                        <div class="card-content white-text">
                            <p>
                                {{ $filters.localizeFilter("Description") }}:
                                {{ record.description }}
                            </p>
                            <p>
                                {{ $filters.localizeFilter("Table_Amount") }}:
                                {{ record.amount }}
                            </p>
                            <p>
                                {{ $filters.localizeFilter("Table_Category") }}:
                                {{ record.categoryName }}
                            </p>

                            <small>{{
                                $filters.dateFilter(record.date, "datetime")
                            }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else>
            {{ $filters.localizeFilter("Record_Not_Found1") }}
            {{ $route.params.id }}
            {{ $filters.localizeFilter("Record_Not_Found2") }}
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
            typeText: record.type
        }
        this.loading = false
    }
}
</script>

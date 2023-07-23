<template>
    <div>
        <div class="page-title">
            <h3>{{ $filters.localizeFilter("Menu_Categories") }}</h3>
        </div>
        <section>
            <Loader v-if="loading" />
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit
                    v-if="categories"
                    :categories="categories"
                    @updated="updateCategories"
                    :key="categories.length + updateCount"
                />
                <p v-else class="center">
                    {{ $filters.localizeFilter("Empty_Categories") }}
                </p>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue"
import CategoryEdit from "@/components/CategoryEdit.vue"
export default {
    name: "categories",
    data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
    }),
    components: {
        CategoryCreate,
        CategoryEdit
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category)
        },
        updateCategories(category) {
            const index = this.categories.findIndex((c) => c.id === category.id)
            this.categories[index].title = category.title
            this.categories[index].limit = category.limit
            this.updateCount += 1
        }
    },
    async mounted() {
        await this.$store.dispatch("fetchInfo")
        this.categories = await this.$store.dispatch("fetchCategories")
        this.loading = false
    }
}
</script>

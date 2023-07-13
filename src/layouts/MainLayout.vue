<template>
    <div>
        <Loader v-if="loading" />
        <div class="app-main-layout" v-else>
            <Navbar @changeState="NavbarState = !NavbarState" />
            <Sidebar v-bind:state="NavbarState" :key="locale" />
            <main class="app-content" :class="{ full: !NavbarState }">
                <div class="app-page">
                    <router-view />
                </div>
            </main>
            <div class="fixed-action-btn">
                <router-link
                    class="btn-floating btn-large blue"
                    to="/record"
                    v-tooltip="$filters.localizeFilter('Add_Button')"
                >
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue"
import Sidebar from "@/components/app/Sidebar.vue"
import messages from "@/utils/messages"
export default {
    name: "main-layout",
    data: () => ({
        NavbarState: true,
        loading: true
    }),
    async mounted() {
        await this.$store.dispatch("fetchInfo")
        // const userInfo = this.$store.getters.info
        // console.log(userInfo)
        // if (!userInfo && !userInfo.name) {
        //   console.log('test')
        //   await this.$store.dispatch('fetchInfo')
        // }
        this.loading = false
    },
    components: {
        Navbar,
        Sidebar
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        locale() {
            return this.$store.getters.info.locale
        }
    },
    watch: {
        error(fbError) {
            console.log(fbError)
            M.toast({ html: messages[fbError.code] || "Что-то пошло не так" })
        }
    }
}
</script>

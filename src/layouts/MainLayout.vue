<template>
    <div>
      <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @changeState="NavbarState = !NavbarState"/>
      <Sidebar v-bind:state="NavbarState"/>
    <main class="app-content" :class="{full: !NavbarState}">
        <div class="app-page">
            <router-view />
        </div>
    </main>
<div class="fixed-action-btn">
  <router-link class="btn-floating btn-large blue" to="/record">
    <i class="large material-icons">add</i>
  </router-link>
</div>
</div>
</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
export default {
  name: 'main-layout',
  data: () => ({
    NavbarState: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    Navbar, Sidebar
  }
}
</script>
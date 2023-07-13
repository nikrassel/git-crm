<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('changeState')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ $filters.dateFilter(this.currentDate, 'datetime') }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              {{ userName }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>{{ $filters.localizeFilter('ProfileTitle') }}
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>{{ $filters.localizeFilter('Exit') }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
    data: () => ({
        currentDate: new Date(),
        timeChangeInterval: null,
        dropdownFunc: null
    }),
    methods: {
        async logout() {
          await this.$store.dispatch('logout')
          this.$router.push('/login?message=logout')
        }
    },
    computed: {
        userName() {
          const userInfo = this.$store.getters.info
          return userInfo ? userInfo.name : 'unknown'
        }
    },
    mounted() {
        this.timeChangeInterval = setInterval(() => {
            this.currentDate = new Date()
        }, 1000)
        this.dropdownFunc = M.Dropdown.init(this.$refs.dropdown), {
            constrainWidth: false
        }
    },
    beforeUnmount() {
        clearInterval(this.timeChangeInterval)
        if (this.dropdownFunc && this.dropdownFunc.destroy) {
            this.dropdownFunc.destroy()
        }
    }
}
</script>
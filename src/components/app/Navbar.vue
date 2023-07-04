<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('changeState')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ dateFormater }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
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
        dropdownFunc: null,
        timeFormat: 'datetime'
    }),
    methods: {
        logout() {
            console.log('Logout')
            this.$router.push('/login?message=logout')
        }
    },
    computed: {
        dateFormater() {
            const options = {}
            if (this.timeFormat.includes('date')) {
                options.day = '2-digit'
                options.month = 'long'
                options.year = 'numeric'
            }
            if (this.timeFormat.includes('time')) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(this.currentDate))
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
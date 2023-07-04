<template>
    <ul class="sidenav app-sidenav" :class="{open: state}">
      <router-link
        v-for="link in links"
        :key="link.url" 
        active-class="avtive" 
        :to="link.url" 
        :exact="link.exact"
        >
        <li>
            <a href="#" class="waves-effect waves-light btn">{{ link.title }}</a>
        </li>
      </router-link>
    </ul>
</template>

<script>
export default {
    props: {
        state: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        links: [
            {title: 'Счет', url: '/', exact: true},
            {title: 'История', url: '/history'},
            {title: 'Планирование', url: '/planning'},
            {title: 'Новая запись', url: '/record'},
            {title: 'Категории', url: '/categories'}
        ]
    })
}
</script>
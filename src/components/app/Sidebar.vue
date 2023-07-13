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
import localizeFilter from '@/filters/locale.filter';
export default {
    props: {
        state: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        links: [
            {title: localizeFilter('Menu_Bill'), url: '/', exact: true},
            {title: localizeFilter('Menu_History'), url: '/history'},
            {title: localizeFilter('Menu_Plannig'), url: '/planning'},
            {title: localizeFilter('Menu_New_Record'), url: '/record'},
            {title: localizeFilter('Menu_Categories'), url: '/categories'}
        ]
    })
}
</script>
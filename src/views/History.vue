<template>
    <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <!-- <canvas ref="canvas"></canvas> -->
    <Pie 
      :options="chartOptions"
      :data="chartData"
    />
  </div>
  <Loader v-if="loading"/>
  <p class="center" v-else-if="!records.length">Записей пока нет
    <router-link to="/record">Добавьте первую</router-link>
  </p>
  <section v-else>
    <HistoryTable :records="items"/>
    <paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    >
    </paginate>
  </section>
</div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable';
import Paginate from 'vuejs-paginate-next';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)
export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    chartData: {
        labels: [ 'Category1' ],
        datasets: [{
          label: 'Расходы по категориям',
          data: [100],
          backgroundColor: [
            'rgb(255, 99, 132)',
          ], 
        }]
      },
    chartOptions: {
      responsive: true
    },
  }),
  async mounted() {
    await this.$store.dispatch('fetchInfo')
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading = false
  },
  methods: {
    generateRandomColor: function() {
      const hexCodes = '0123456789ABCDEF'
      let color = ''
      for(let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
      }
      return '#' + color
    },
    setup(categories) {
      this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'доход' : 'расход'
      }
    }))
      const chart = {
          labels: categories.map(c => c.title),
          datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(c => {
            return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
            }, 0)
            }),
            backgroundColor: categories.map(c => {
              return this.generateRandomColor()
            }), 
          }]
        }
      this.chartData = chart
    }
  },
  components: {
    paginate: Paginate,
    HistoryTable,
    Pie
  }
}
</script>
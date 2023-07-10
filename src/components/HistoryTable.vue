<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount }}</td>
        <td>{{ dateFormater(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button 
            class="btn-small btn" 
            @click="$router.push('/detail/' + record.id)"
            v-tooltip="'Посмотреть запись'">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    data: () => ({
        timeFormat: 'datetime'
    }),
    props: {
        records: {
            required: true,
            type: Array
        }
    },
    methods: {
        dateFormater: function(recordDate) {
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
            return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(recordDate))
        },
    }
}
</script>
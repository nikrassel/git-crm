<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>{{ $filters.localizeFilter("Table_Amount") }}</th>
                <th>{{ $filters.localizeFilter("Table_Date") }}</th>
                <th>{{ $filters.localizeFilter("Table_Category") }}</th>
                <th>{{ $filters.localizeFilter("Table_Type") }}</th>
                <th>{{ $filters.localizeFilter("Table_Details") }}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, idx) of records" :key="record.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ $filters.currencyFilter(record.amount) }}</td>
                <td>{{ $filters.dateFilter(record.date, "datetime") }}</td>
                <td>{{ record.categoryName }}</td>
                <td>
                    <span
                        class="white-text badge"
                        :class="[record.typeClass]"
                        >{{ $filters.localizeFilter(record.typeText) }}</span
                    >
                </td>
                <td>
                    <button
                        class="btn-small btn"
                        @click="$router.push('/detail/' + record.id)"
                        v-tooltip="$filters.localizeFilter('Details_Tooltip')"
                    >
                        <i class="material-icons">open_in_new</i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>

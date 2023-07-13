<template>
    <div>
  <div class="page-title">
    <h3>{{ $filters.localizeFilter('Menu_New_Record') }}</h3>
  </div>

  <Loader v-if="loading" />
  <p class="center" v-else-if="!categories.length">{{ $filters.localizeFilter('Empty_Categories') }}
    <router-link to="/categories">
      {{ $filters.localizeFilter('Add_First_Record') }}
    </router-link>
  </p>
  <form class="form" @submit.prevent="submitHandler" v-else>
    <div class="input-field" >
      <select ref="select" v-model="category">
        <option
        v-for="c in categories"
        :key="c.id"
        :value="c.id"
        >{{ c.title }}
        </option>
      </select>
      <label>{{ $filters.localizeFilter('Category_Selection') }}</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="operationType"
        />
        <span>{{ $filters.localizeFilter('income') }}</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="operationType"
        />
        <span>{{ $filters.localizeFilter('outcome') }}</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: v$.amount.$dirty && !v$.amount.minValue.$response}"
      >
      <label for="amount">{{ $filters.localizeFilter('Table_Amount') }}</label>
      <span class="helper-text invalid"
        v-if="v$.amount.$dirty && !v$.amount.minValue.$response"
      >{{ $filters.localizeFilter('Amount_Error') }} {{ v$.amount.minValue.$params.min }}</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: v$.description.$dirty && !v$.description.required.$response}"
      >
      <label for="description">{{ $filters.localizeFilter('Description') }}</label>
      <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && !v$.description.required.$response"
      >{{ $filters.localizeFilter('Description_Error') }}</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{ $filters.localizeFilter('Create') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'record',
  data: () => ({
    loading: true,
    v$: useVuelidate(),
    categories: [],
    select: null,
    category: null,
    operationType: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    await this.$store.dispatch('fetchInfo')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.operationType === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate()
      if(!this.v$.$error) {
          if (this.canCreateRecord) {
            try {
                await this.$store.dispatch('createRecord', {
                categoryId: this.category,
                amount: this.amount,
                description: this.description,
                type: this.operationType,
                date: new Date().toJSON()
                })
                const bill = this.operationType === 'income' 
                  ? this.info.bill + this.amount
                  : this.info.bill - this.amount
                await this.$store.dispatch('updateInfo', {bill})
                M.toast({html: `Запись успешно создана`})
                this.v$.$reset()
                this.amount = 1
                this.description = ''
            } catch (error) {
              
            }
            
          } else {
            M.toast({html: `Недостаточно средств на счете`})
          }
      }
    }
  }
}
</script>
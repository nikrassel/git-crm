<template>
    <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{ c.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: v$.title.$dirty && !v$.title.required.$response}"
              >
              <label for="name">Название</label>
              <span
                v-if="v$.title.$dirty && !v$.title.required.$response"
                class="helper-text invalid"
                >Введите название категории</span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: v$.limit.$dirty && !v$.limit.minValue.$response}"
              >
              <label for="limit">Лимит</label>
              <span
                v-if="v$.limit.$dirty && !v$.limit.minValue.$response"
                class="helper-text invalid"
              >Минимальная величина {{ v$.limit.minValue.$params.min }}</span>
            </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    v$: useVuelidate(),
    title: '',
    limit: 1,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  watch: {
    current(catId) {
      const { title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate()
      if(!this.v$.$error) {
          try {
            const categoryData = {
              id: this.current,
              title: this.title,
              limit: this.limit
            }
            const category = await this.$store.dispatch('updateCategory', categoryData)
            // this.title = ''
            // this.limit = 1
            // this.v$.$reset()
            M.toast({html: 'Категория была обновлена'})
            this.$emit('updated', categoryData)
          } catch (error) {
                    
          }
      }
    }
  }
}
</script>


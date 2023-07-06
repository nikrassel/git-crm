<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: (v$.email.$dirty && !v$.email.required.$response) || (v$.email.$dirty && !v$.email.email.$response)}"
      >
      <label for="email">Email</label>
      <small 
        class="helper-text invalid"
        v-if="v$.email.$dirty && !v$.email.required.$response"
      >Поле Email не должно быть пустым</small>
      <small 
        class="helper-text invalid"
        v-if="v$.email.$dirty && !v$.email.email.$response"
      >Email введен неккоректно</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="password"
          :class="{invalid: (v$.password.$dirty && !v$.password.required.$response) || (v$.password.$dirty && !v$.password.minLength.$response)}"
      >
      <label for="password">Пароль</label>
      <small 
        class="helper-text invalid"
        v-if="v$.password.$dirty && !v$.password.required.$response"
      >Поле Password не должно быть пустым</small>
      <small 
        class="helper-text invalid"
        v-if="v$.password.$dirty && !v$.password.minLength.$response"
      >Password должен содержать как минимум {{ v$.password.minLength.$params.min }} символов</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: (v$.name.$dirty && !v$.name.required.$response)}"
      >
      <label for="name">Имя</label>
      <small 
        class="helper-text invalid"
        v-if="v$.name.$dirty && !v$.name.required.$response"
      >Поле Name не должно быть пустым</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default {
  name: 'register',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      this.v$.$validate()
      if(!this.v$.$error) {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        } catch (error) {
          
        }
      }
    }
  }
}


</script>
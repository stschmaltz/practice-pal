<template>
  <div>
    <form onsubmit="return false;">
      <div class="mb-4">
        <label class="header" for="email"> Email </label>
        <input
          v-model="formData.email"
          class="input"
          placeholder="Email"
          type="email"
          autocomplete="username"
        />
      </div>
      <div class="mb-4">
        <label class="header" for="email"> Password </label>
        <input
          v-model="formData.password"
          class="input"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <Btn @click="signInUser">Sign In</Btn>
      <Btn @click="createUser">Register</Btn>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
export default Vue.extend({
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>

<style>
.header {
  @apply block text-secondaryMain text-base font-bold mb-2;
}

.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-secondaryMain leading-tight focus:border-transparent focus:outline-none focus:shadow-md;
}
</style>

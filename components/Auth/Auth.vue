<template>
  <div>
    <form class="flex flex-col" onsubmit="return false;">
      <div class="mt-6 mb-4">
        <input
          v-model="formData.email"
          class="input"
          placeholder="Email"
          type="email"
          autocomplete="username"
        />
      </div>
      <div class="mt-4 mb-8">
        <input
          v-model="formData.password"
          class="input"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <div class="flex justify-around pt-2">
        <div class="buttonContainer">
          <Btn @click="signInUser">Sign In</Btn>
        </div>
        <div class="buttonContainer">
          <Btn @click="createUser">Register</Btn>
        </div>
      </div>
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
          this.formData.password,
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password,
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
  @apply block text-secondaryMain text-base font-bold mb-2 text-left;
}

.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-secondaryMain leading-tight focus:border-transparent focus:outline-none focus:shadow-md;
}

.buttonContainer {
  @apply w-2/5;
}
</style>

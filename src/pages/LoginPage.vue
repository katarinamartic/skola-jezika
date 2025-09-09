<template>
  <div class="fullscreen bg-grey-1 flex flex-center">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="text-center">
        <q-icon name="account_circle" size="80px" color="primary" />
        <div class="text-h5 q-mt-sm">Prijava u sustav</div>
        <div class="text-subtitle2">Sustav upravljanja tečajevima</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onLogin" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Email adresa"
            type="email"
          />

          <q-input
            filled
            v-model="password"
            label="Lozinka"
            type="password"
          />

          <q-btn
            color="primary"
            size="lg"
            label="Prijavi se"
            type="submit"
            style="width: 100%"
            :loading="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center text-grey-6">
        <small>Demo verzija - bilo koji email i lozinka će raditi</small>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();

    const email = ref("katarina@test.com");
    const password = ref("admin123");
    const loading = ref(false);

    const onLogin = () => {
      loading.value = true;

      // FAKE LOGIN - spremi bilo koje podatke
      if (email.value && password.value) {
        // Spremi u localStorage
        localStorage.setItem('auth_token', 'fake-token-' + Date.now());
        localStorage.setItem('user_email', email.value);

        console.log('Fake login uspješan');

        // Preusmjeri na početnu stranicu
        router.push("/");
      } else {
        console.log('Molimo unesite email i lozinku');
      }

      loading.value = false;
    };

    return {
      email,
      password,
      loading,
      onLogin
    };
  }
};
</script>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
}
</style>

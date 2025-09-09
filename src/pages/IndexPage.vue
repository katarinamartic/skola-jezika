<template>
  <q-page class="flex flex-center q-pa-md column">

    <h2>Dobrodošli u sustav upravljanja tečajevima stranim jezika</h2>
    <p class="text-subtitle2 q-mt-md" style="max-width: 400px; text-align: center;">
      Jednostavan i učinkovit sustav za upravljanje profesorima, tečajevima i upisima.
      Počnite upravljati sada!
    </p>
    <img
      src="~assets/landing.png"
      alt="Landing page illustration"
      style="max-width: 250px; margin-bottom:20px"
    />
    <div class="flex q-gutter-md">
      <q-btn color="primary" label="Idi na Profesore" @click="$router.push('/profesori')" />
      <q-btn color="primary" label="Idi na Tečajeve" @click="$router.push('/tecajevi')" />
      <q-btn color="primary" label="Idi na Upise" @click="$router.push('/upisi')" />

    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});
</script>

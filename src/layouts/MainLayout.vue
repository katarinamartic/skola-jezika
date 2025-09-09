<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Tečajevi stranim jezika</q-toolbar-title>

        <!-- Prikaži ovisno o auth statusu -->
        <div v-if="authStore.isAuthenticated" class="flex items-center q-gutter-sm">
          <q-icon name="person" />
          <span>{{ authStore.user?.email }}</span>
          <q-btn flat icon="logout" label="Odjava" @click="onLogout" />
        </div>

        <q-btn v-else flat icon="login" label="Prijava" @click="$router.push('/login')" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <!-- Prikaži izbornik samo ako je ulogiran -->
      <div v-if="authStore.isAuthenticated">
        <q-list>
          <q-item-label header>Izbornik</q-item-label>

          <q-item clickable v-ripple @click="$router.push('/')">
            <q-item-section avatar><q-icon name="home" /></q-item-section>
            <q-item-section>Početna</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/profesori')">
            <q-item-section avatar><q-icon name="person" /></q-item-section>
            <q-item-section>Profesori</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/tecajevi')">
            <q-item-section avatar><q-icon name="school" /></q-item-section>
            <q-item-section>Tečajevi</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push('/upisi')">
            <q-item-section avatar><q-icon name="assignment" /></q-item-section>
            <q-item-section>Upisi</q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple @click="$router.push('/statistika')">
            <q-item-section avatar><q-icon name="analytics" /></q-item-section>
            <q-item-section>Statistike</q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple @click="onLogout">
            <q-item-section avatar><q-icon name="logout" /></q-item-section>
            <q-item-section>Odjava</q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Poruka za neulogirane korisnike -->
      <div v-else class="q-pa-md text-center">
        <q-icon name="lock" size="48px" color="grey" />
        <div class="text-h6 q-mt-md">Molimo prijavite se</div>
        <q-btn
          color="primary"
          label="Idi na prijavu"
          @click="$router.push('/login')"
          class="q-mt-md"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth-store";

const router = useRouter();
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);

// Provjeri auth status kada se komponenta učita
onMounted(() => {
  authStore.checkAuth();
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const onLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

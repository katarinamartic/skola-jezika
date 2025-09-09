<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>
        <q-toolbar-title>Tečajevi stranim jezika</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Izbornik</q-item-label>

        <q-item clickable v-ripple @click="$router.push('/profesori')">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>Profesori</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push('/tecajevi')">
          <q-item-section avatar>
            <q-icon name="school"/>
          </q-item-section>
          <q-item-section>Tečajevi</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push('/upisi')">
          <q-item-section avatar>
            <q-icon name="assignment"/>
          </q-item-section>
          <q-item-section>Upisi</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref} from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

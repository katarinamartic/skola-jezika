<template>
  <q-page>
    <div class="q-pa-md">
      <h4>Statistike sustava</h4>

      <!-- Profesori po broju tečajeva -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Profesori po broju tečajeva</div>
        </q-card-section>
        <q-card-section>
          <q-table
            :rows="statistikeProfesora"
            :columns="profesorColumns"
            row-key="ime"
            flat
          >
            <template v-slot:top>
              <q-btn color="primary" label="Pročitaj" @click="loadStatistikeProfesora" />
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <!-- Polaznici po jezicima -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Sum polaznika po jezicima</div>
        </q-card-section>
        <q-card-section>
          <q-table
            :rows="statistikeJezika"
            :columns="jezikColumns"
            row-key="jezik"
            flat
          >
            <template v-slot:top>
              <q-btn color="primary" label="Pročitaj" @click="loadStatistikeJezika" />
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <!-- Detalji tečajeva -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Detalji tečajeva (preko 5 polaznika)</div>
        </q-card-section>
        <q-card-section>
          <q-table
            :rows="detaljiTecajeva"
            :columns="detaljiColumns"
            row-key="tecaj"
            flat
          >
            <template v-slot:top>
              <q-btn color="primary" label="Pročitaj" @click="loadDetaljiTecajeva" />
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

defineOptions({
  name: "StatistikaPage",
});

// Statistike profesora
const statistikeProfesora = ref([]);
const profesorColumns = [
  { name: "ime", label: "Ime", align: "left", field: "ime" },
  { name: "prezime", label: "Prezime", align: "left", field: "prezime" },
  { name: "broj_tecajeva", label: "Broj tečajeva", align: "center", field: "broj_tecajeva" }
];

// Statistike jezika
const statistikeJezika = ref([]);
const jezikColumns = [
  { name: "jezik", label: "Jezik", align: "left", field: "jezik" },
  { name: "broj_tecajeva", label: "Broj tečajeva", align: "center", field: "broj_tecajeva" },
  { name: "ukupno_polaznika", label: "Ukupno polaznika", align: "center", field: "ukupno_polaznika" }
];

// Detalji tečajeva
const detaljiTecajeva = ref([]);
const detaljiColumns = [
  { name: "ime", label: "Profesor", align: "left", field: row => `${row.ime} ${row.prezime}` },
  { name: "tecaj", label: "Tečaj", align: "left", field: "tecaj" },
  { name: "jezik", label: "Jezik", align: "left", field: "jezik" },
  { name: "broj_polaznika", label: "Polaznika", align: "center", field: "broj_polaznika" },
  { name: "cijena", label: "Cijena", align: "right", field: "cijena", format: val => `${val} €` }
];

// Methods
const loadStatistikeProfesora = async () => {
  try {
    const result = await api.get("/statistike/profesori");
    statistikeProfesora.value = result.data;
  } catch (error) {}
};

const loadStatistikeJezika = async () => {
  try {
    const result = await api.get("/statistike/jezici");
    statistikeJezika.value = result.data;
  } catch (error) {}
};

const loadDetaljiTecajeva = async () => {
  try {
    const result = await api.get("/statistike/zarade");
    detaljiTecajeva.value = result.data;
  } catch (error) {}
};

onMounted(() => {
  loadStatistikeProfesora();
  loadStatistikeJezika();
  loadDetaljiTecajeva();
});
</script>

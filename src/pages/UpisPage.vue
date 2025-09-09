<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Upisi"
        :rows="upisi"
        :columns="columns"
        row-key="id"
        flat
        selection="single"
        v-model:selected="upis"
        @update:selected="onSelectionRow"
      >
        <template v-slot:top>
          <q-space />
          <q-btn color="primary" label="Novi upis" @click="onAddRow" />
          <q-btn
            v-if="upis.length !== 0"
            class="q-ml-sm"
            color="primary"
            label="Izmijeni upis"
            @click="onEditRow"
          />
          <q-btn
            v-if="upis.length !== 0"
            class="q-ml-sm"
            color="red"
            label="Obriši upis"
            @click="onDeleteRow"
          />
        </template>
      </q-table>
    </div>
    <!-- {{ upis }} -->
    <div class="q-pa-md" v-if="showForm">
      <q-card flat bordered class="q-pa-sm">
        <q-card-section>
          <q-form @submit="onSave">
            <q-select
              filled
              v-model="editUpis.profesor_id"
              :options="profesorOptions"
              option-value="id"
              option-label="label"
              label="Profesor"
              emit-value
              map-options
              lazy-rules
              :rules="[
                (val) => val !== null || 'Odaberite profesor',
              ]"
            />
            <q-select
              filled
              v-model="editUpis.tecaj_id"
              :options="tecajOptions"
              option-value="id"
              option-label="label"
              label="Tečaj"
              emit-value
              map-options
              lazy-rules
              :rules="[
                (val) => val !== null || 'Odaberite tečaj',
              ]"
            />
            <q-input
              filled
              v-model.number="editUpis.broj_polaznika"
              label="Broj polaznika"
              type="number"
            />

            <div>
              <q-btn label="Spremi" type="submit" color="primary" />
              <q-btn
                label="Zatvori"
                color="primary"
                @click="onClose"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

defineOptions({
  name: "UpisPage",
});

const columns = [
  {
    name: "profesor_ime",
    required: true,
    label: "Profesor",
    align: "left",
    field: "profesor_ime",
    sortable: true,
  },
  {
    name: "tecaj_naziv",
    label: "Tečaj",
    align: "left",
    field: "tecaj_naziv",
    sortable: true,
  },
  {
    name: "jezik",
    label: "Jezik",
    align: "left",
    field: "jezik",
  },
  {
    name: "broj_polaznika",
    label: "Broj polaznika",
    align: "center",
    field: "broj_polaznika",
  },
];

const upisi = ref([]);
const upis = ref([]);
const editUpis = ref({});
const showForm = ref(false);
const profesorOptions = ref([]);
const tecajOptions = ref([]);

const loadProfesori = async () => {
  try {
    const result = await api.get("/profesori");
    profesorOptions.value = result.data.map(p => ({
      id: p.id,
      label: `${p.ime} ${p.prezime}`
    }));
  } catch (error) {}
};

const loadTecajevi = async () => {
  try {
    const result = await api.get("/tecajevi");
    tecajOptions.value = result.data.map(t => ({
      id: t.id,
      label: `${t.naziv} (${t.jezik})`
    }));
  } catch (error) {}
};

const onRead = async () => {
  try {
    const result = await api.get("/upisi");
    upisi.value = result.data;
    upis.value = [];
    showForm.value = false;
  } catch (error) {}
};

const onDeleteRow = async () => {
  try {
    const result = await api.delete("/upisi", {
      data: {
        id: upis.value[0].id,
      },
    });
    onRead();
    upis.value = [];
  } catch (error) {}
};

const onAddRow = () => {
  upis.value = [];
  editUpis.value.id = null;
  editUpis.value.profesor_id = null;
  editUpis.value.tecaj_id = null;
  editUpis.value.broj_polaznika = null;
  showForm.value = true;
};

const onEditRow = () => {
  editUpis.value = Object.assign({}, upis.value[0]);
  showForm.value = true;
};

const onClose = () => {
  editUpis.value.id = null;
  editUpis.value.profesor_id = null;
  editUpis.value.tecaj_id = null;
  editUpis.value.broj_polaznika = null;
  showForm.value = false;
};

const onSelectionRow = () => {
  editUpis.value = Object.assign({}, upis.value[0]);
};

const onSave = async () => {
  try {
    if (editUpis.value.id === null) {
      const result = await api.post("/upisi", editUpis.value);
    } else {
      const result = await api.put("/upisi", editUpis.value);
    }
    onRead();
  } catch (error) {}
};

onMounted(() => {
  loadProfesori();
  loadTecajevi();
  onRead();
});
</script>

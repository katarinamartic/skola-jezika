<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Tečajevi"
        :rows="tecajevi"
        :columns="columns"
        row-key="id"
        flat
        selection="single"
        v-model:selected="tecaj"
        @update:selected="onSelectionRow"
      >
        <template v-slot:top>
          <q-space />
          <q-btn color="primary" label="Novi tečaj" @click="onAddRow" />
          <q-btn
            v-if="tecaj.length !== 0"
            class="q-ml-sm"
            color="primary"
            label="Izmijeni tečaj"
            @click="onEditRow"
          />
          <q-btn
            v-if="tecaj.length !== 0"
            class="q-ml-sm"
            color="red"
            label="Obriši tečaj"
            @click="onDeleteRow"
          />
        </template>
      </q-table>
    </div>
    <!-- {{ tecaj }} -->
    <div class="q-pa-md" v-if="showForm">
      <q-card flat bordered class="q-pa-sm">
        <q-card-section>
          <q-form @submit="onSave">
            <q-input
              filled
              v-model="editTecaj.naziv"
              label="Naziv tečaja"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Unesite naziv tečaja',
              ]"
            />
            <q-input
              filled
              v-model="editTecaj.jezik"
              label="Jezik"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Unesite jezik',
              ]"
            />
            <q-select
              filled
              v-model="editTecaj.profesor_id"
              :options="profesorOptions"
              option-value="id"
              option-label="label"
              label="Profesor"
              emit-value
              map-options
            />
            <q-input
              filled
              v-model.number="editTecaj.cijena"
              label="Cijena (EUR)"
              type="number"
              step="0.01"
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
  name: "TecajPage",
});

const columns = [
  {
    name: "naziv",
    required: true,
    label: "Naziv",
    align: "left",
    field: "naziv",
    sortable: true,
  },
  {
    name: "jezik",
    label: "Jezik",
    align: "left",
    field: "jezik",
    sortable: true,
  },
  {
    name: "profesor_ime",
    label: "Profesor",
    align: "left",
    field: "profesor_ime",
  },
  {
    name: "cijena",
    label: "Cijena",
    align: "right",
    field: "cijena",
    format: (val) => `${val} €`,
  },
];

const tecajevi = ref([]);
const tecaj = ref([]);
const editTecaj = ref({});
const showForm = ref(false);
const profesorOptions = ref([]);

const loadProfesori = async () => {
  try {
    const result = await api.get("/profesori");
    profesorOptions.value = result.data.map(p => ({
      id: p.id,
      label: `${p.ime} ${p.prezime}`
    }));
  } catch (error) {}
};

const onRead = async () => {
  try {
    const result = await api.get("/tecajevi");
    tecajevi.value = result.data;
    tecaj.value = [];
    showForm.value = false;
  } catch (error) {}
};

const onDeleteRow = async () => {
  try {
    const result = await api.delete("/tecajevi", {
      data: {
        id: tecaj.value[0].id,
      },
    });
    onRead();
    tecaj.value = [];
  } catch (error) {}
};

const onAddRow = () => {
  tecaj.value = [];
  editTecaj.value.id = null;
  editTecaj.value.naziv = null;
  editTecaj.value.jezik = null;
  editTecaj.value.profesor_id = null;
  editTecaj.value.cijena = null;
  showForm.value = true;
};

const onEditRow = () => {
  editTecaj.value = Object.assign({}, tecaj.value[0]);
  showForm.value = true;
};

const onClose = () => {
  editTecaj.value.id = null;
  editTecaj.value.naziv = null;
  editTecaj.value.jezik = null;
  editTecaj.value.profesor_id = null;
  editTecaj.value.cijena = null;
  showForm.value = false;
};

const onSelectionRow = () => {
  editTecaj.value = Object.assign({}, tecaj.value[0]);
};

const onSave = async () => {
  try {
    if (editTecaj.value.id === null) {
      const result = await api.post("/tecajevi", editTecaj.value);
    } else {
      const result = await api.put("/tecajevi", editTecaj.value);
    }
    onRead();
  } catch (error) {}
};

onMounted(() => {
  loadProfesori();
  onRead();
});
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Profesori"
        :rows="profesori"
        :columns="columns"
        row-key="id"
        flat
        selection="single"
        v-model:selected="profesor"
        @update:selected="onSelectionRow"
      >
        <template v-slot:top>
          <q-btn color="primary" label="Pročitaj" @click="onRead" />
          <q-space />
          <q-btn color="primary" label="Novi profesor" @click="onAddRow" />
          <q-btn
            v-if="profesor.length !== 0"
            class="q-ml-sm"
            color="primary"
            label="Izmijeni profesor"
            @click="onEditRow"
          />
          <q-btn
            v-if="profesor.length !== 0"
            class="q-ml-sm"
            color="red"
            label="Obriši profesor"
            @click="onDeleteRow"
          />
        </template>
      </q-table>
    </div>
    <!-- {{ profesor }} -->
    <div class="q-pa-md" v-if="showForm">
      <q-card flat bordered class="q-pa-sm">
        <q-card-section>
          <q-form @submit="onSave">
            <q-input
              filled
              v-model="editProfesor.ime"
              label="Ime"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Unesite ime',
              ]"
            />
            <q-input
              filled
              v-model="editProfesor.prezime"
              label="Prezime"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Unesite prezime',
              ]"
            />
            <q-input
              filled
              v-model="editProfesor.email"
              label="Email"
              type="email"
            />
            <q-input
              filled
              v-model="editProfesor.telefon"
              label="Telefon"
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
  name: "ProfesorPage",
});

const columns = [
  {
    name: "ime",
    required: true,
    label: "Ime",
    align: "left",
    field: "ime",
    sortable: true,
  },
  {
    name: "prezime",
    required: true,
    label: "Prezime",
    align: "left",
    field: "prezime",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
  {
    name: "telefon",
    label: "Telefon",
    align: "left",
    field: "telefon",
  },
];

const profesori = ref([]);
const profesor = ref([]);
const editProfesor = ref({});
const showForm = ref(false);

const onRead = async () => {
  try {
    const result = await api.get("/profesori");
    profesori.value = result.data;
    profesor.value = [];
    showForm.value = false;
  } catch (error) {}
};

const onDeleteRow = async () => {
  try {
    const result = await api.delete("/profesori", {
      data: {
        id: profesor.value[0].id,
      },
    });
    onRead();
    profesor.value = [];
  } catch (error) {}
};

const onAddRow = () => {
  profesor.value = [];
  editProfesor.value.id = null;
  editProfesor.value.ime = null;
  editProfesor.value.prezime = null;
  editProfesor.value.email = null;
  editProfesor.value.telefon = null;
  showForm.value = true;
};

const onEditRow = () => {
  editProfesor.value = Object.assign({}, profesor.value[0]);
  showForm.value = true;
};

const onClose = () => {
  editProfesor.value.id = null;
  editProfesor.value.ime = null;
  editProfesor.value.prezime = null;
  editProfesor.value.email = null;
  editProfesor.value.telefon = null;
  showForm.value = false;
};

const onSelectionRow = () => {
  editProfesor.value = Object.assign({}, profesor.value[0]);
};

const onSave = async () => {
  try {
    if (editProfesor.value.id === null) {
      const result = await api.post("/profesori", editProfesor.value);
    } else {
      const result = await api.put("/profesori", editProfesor.value);
    }
    onRead();
  } catch (error) {}
};

onMounted(() => {
  onRead();
});
</script>

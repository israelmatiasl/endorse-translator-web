<template>
  <div class="container py-5">
    <div class="card shadow-sm p-4">
      <h2 class="mb-4 text-center">Formulario de Endoso Dinámico</h2>

      <form @submit.prevent="submit">
        <div v-for="(field, index) in fields" :key="field.id" class="mb-3">
          <div class="d-flex align-items-center">
            <input
              v-model="field.label"
              type="text"
              class="form-control me-2"
              placeholder="Nombre del campo"
            />
            <input
              v-model="field.value"
              type="text"
              class="form-control me-2"
              placeholder="Valor del campo"
            />
            <button
              v-if="index >= initialFields.length"
              type="button"
              class="btn btn-danger"
              @click="removeField(index)"
            >
              ✖
            </button>
          </div>
        </div>

        <button type="button" class="btn btn-secondary mb-3" @click="addField">
          ➕ Agregar campo
        </button>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Enviar
        </button>
      </form>

      <div v-if="result" class="alert alert-info mt-4">
        <h5>Resultado:</h5>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { translateEndorse } from "./services/endorseService";

interface Field {
  id: number;
  label: string;
  value: string;
}

const nextId = ref(1);

const initialFieldsData = {
  policyNumber: "08200000049",
  idEnvio: "5984",
  frecuencia: "Semestral",
  tipoEndoso: "CambioFrecuencia",
  producto: "Rumbo",
  plan: "PlanRumbo",
  moneda: "Nuevo Sol",
  usuario: "interface.servicios",
  fechaSolicitud: "2025-08-27",
  fechaCliente: "2025-08-27",
  fechaEfectiva: "2025-09-01"
};

const initialFields: Field[] = Object.entries(initialFieldsData).map(([label, value]) => ({
  id: nextId.value++,
  label,
  value
}));

const fields = reactive<Field[]>([...initialFields]);

const result = ref<any>(null);
const loading = ref(false);

function addField() {
  fields.push({
    id: nextId.value++,
    label: "",
    value: ""
  });
}

function removeField(index: number) {
  fields.splice(index, 1);
}

async function submit() {
  loading.value = true;
  result.value = null;

  try {
    const payload: Record<string, any> = {};
    fields.forEach(f => {
      if (f.label.trim() !== "") {
        payload[f.label] = f.value;
      }
    });
    result.value = await translateEndorse(payload);
  } catch (error: any) {
    result.value = { error: error.message };
  } finally {
    loading.value = false;
  }
}
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>

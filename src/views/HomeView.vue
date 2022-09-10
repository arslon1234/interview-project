<template>
  <div class="w-full h-screen bg-gray-100">
    <div class="w-full flex justify-between mt-4">
      <div class="w-full ml-3">
        <select
          v-model="filter"
          class="
            w-48
            text-center
            h-10
            rounded-xl
            border-gray-200 border-2
            border-button_bg
            outline-none
          "
        >
          <option disabled selected hidden value="">Departments</option>
          <option value="IT">IT</option>
          <option value="Accounting">Accounting</option>
          <option value="Marketing">Marketing</option>
        </select>
        <button
          @click="filter = ''"
          class="
            pl-4
            pr-4
            pt-2
            pb-2
            border-2
            bg-delate_btn
            ml-2
            rounded-xl
            text-sidebar_bg
          "
        >
          X
        </button>
      </div>
      <button
        @click="openModal"
        class="
          p-2
          px-5
          border-2
          bg-[#bcdbec]
          ml-2
          rounded-xl
          text-[#5e5e5e]
          mr-4
        "
      >
        Add+
      </button>
    </div>
    <apptable :headers="headers" :body="filteredList">
      <template #body_actions="{item}">
        <i @click="openModalEdit(item)" class="mx-1 text-edit_btn fa-solid fa-pen-to-square"></i>
        <i @click="delateEmployee(item.id)" class=" mx-1  text-delate_btn fa-solid fa-trash"></i>
      </template>
    </apptable>
    <v-pagination
      class="mt-7 pb-7"
      v-model="params.page"
      :pages="params.total"
      :range-size="1"
      active-color="#EAF5FF"
      @update:modelValue="changePage"
    />
    <employers-form-modal @getEmployers="getEmployers" ref="employerModalRef" />
  </div>
</template>

<script setup>
import apptable from "@/components/ui/app-table.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { computed, onMounted, ref, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import EmployersFormModal from '@/components/pages/EmployersFormModal.vue'
const route = useRoute();
const router = useRouter();
const filters = ref([]);
let filter = ref("");
const employees = ref([]);
const employerModalRef = ref();
const params = ref({
  page: 1,
  per_page: 10,
  total: 0,
});
const filteredList = computed(() => {
  let a = filters.value.filter((item) => item.department === filter.value);
  if (filter.value) {
    return a;
  } else {
    return employees.value;
  }
});
const headers = ref([
  { title: "№", value: "id" },
  { title: "FullName", value: "full_name" },
  { title: "Department", value: "department" },
  { title: "Gender", value: "gender" },
  { title: "Birth date", value: "birth_date" },
  { title: "Amallar", value: "actions" },
]);
async function changePage(val) {
  await router.push({ query: { page: val } });
  getEmployers();
}
function delateEmployee(id) {
  axios.delete(`http://localhost:3000/items/${id}`).then((res) => {
    console.log(res);
     getEmployers();
  });
}
async function getEmployers() {
  const page = route.query.page || 1;
  axios.get(`http://localhost:3000/items`).then((res) => {
    filters.value = res.data;
    const pagination = params.value.per_page * (+page - 1);
    params.value.total = Math.ceil(res.data.length / params.value.per_page);
    employees.value = res.data.slice(pagination, pagination + 10);
  });
}
const openModal = () => {
  employerModalRef.value.openModal()
}
const openModalEdit =(item)=>{
  employerModalRef.value.openModal(item)
}
onMounted(async () => {
  const { page } = route.query;
  if (!page) {
    router.replace({ query: { page: params.value.page } });
  }
  getEmployers();
});
</script>

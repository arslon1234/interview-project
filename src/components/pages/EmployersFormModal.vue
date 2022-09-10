<template>
     <AppModal v-model="dialog" :width="'40%'">
      <Form @submit="send" class="w-full p-7 text-center flex flex-col">
        <p class="text-xl" v-if="!forms.id">Yangi ishchi qo'shish</p>
        <p class="text-xl" v-else>O'zgartirish</p>
        <div class="w-full flex items-center mb-3 flex-wrap">
           <Field
              rules="required"
              :modelValue="forms.full_name"
              v-slot="{ errors }"
              name="Full Name"
            >
               <Input
            :id_name="input_data.input1"
            :label_name="input_data.label1"
            v-model="forms.full_name"
          />
              <span v-if="errors && errors.length" style="color: red">
                {{ errors[0] }}
              </span>
            </Field>
        </div>
        <div class="w-full flex items-center mb-3 flex-wrap">
            <Field
              rules="required"
              :modelValue="forms.department"
              v-slot="{ errors }"
              name="Department"
            >
                <select
            v-model="forms.department"
            class="
              w-full
              text-center
              h-11
              rounded-md
              border-2
              border-dashboard_border
              outline-none
            "
          >
            <option disabled selected hidden value="">Department</option>
            <option value="IT">IT</option>
            <option value="Accounting">Accounting</option>
            <option value="Marketing">Marketing</option>
          </select>
              <span v-if="errors && errors.length" style="color: red">
                {{ errors[0] }}
              </span>
            </Field>
        
        </div>
        <div class="mb-3 items-center">
              <span>Gender</span>
          <Field class="w-80 ml-1 flex text-start" rules="required"
              v-slot="{ errors }"
              :modelValue="forms.gender"
              name="Gender">
            <div class="flex">
                <div class="w-6/12 flex items-center"  >
               <input
                type="radio"
                v-model="forms.gender"
                value="male"
                name="gender"
              />
              <span class="ml-1">Male</span>
            </div>
            <div class="w-6/12 flex items-center">
              <input
                type="radio"
                v-model="forms.gender"
                value="female"
                name="gender"
              />
              <span class="ml-1">Female</span>
            </div>
            </div>
               <div>
                <span v-if="errors && errors.length" style="color: red">
                {{ errors[0] }}
              </span>
               </div>
          </Field>
        </div>
        <div class="w-full flex mb-3 pb-8 items-center flex-wrap">
          <span>Date_birth:</span>
          <Field
            v-slot="{ errors }"
              :modelValue="forms.birth_date"
              name="Birth Date"
          >
          <datepicker
            v-model="birth_date"
            class="
              h-10
              flex-1
              w-[355px]
              ml-1
              border-2
              rounded-md
              border-dashboard_border
              text-base
              p-3
              outline-none
            "
          />
          <span v-if="errors && errors.length" style="color: red">
                {{ errors[0] }}
            </span>
          </Field>
        </div>
        <button
          type="submit"
          class="p-2 border-2 bg-[#bcdbec] ml-2 rounded-xl"
          v-if="!forms.id"
        >
          Add Employee
        </button>
        <button
          type="submit"
          class="p-2 border-2 bg-[#bcdbec] ml-2 rounded-xl"
           v-else
        >
          Edit Employee
        </button>
      </Form>
    </AppModal>
</template>


<script setup>
import {ref, defineExpose} from 'vue'
import { Field, Form } from "vee-validate";
import AppModal from "@/components/ui/app-modal.vue";
import Input from "@/components/ui/app-input.vue";
import Datepicker from "vue3-datepicker";
import axios from 'axios';
import moment from "moment";
import Notification from '@/plugins/Notification'
const emits = defineEmits(['getEmployers'])
const form = ref({})
const dialog = ref(false)
const input_data = ref({
  input1: "f_name1",
  label1:'Full Name'
}); 

const birth_date = ref(new Date())

const forms = ref({
  full_name: "",
  department: "",
  birth_date: "",
  gender: "",
});

const openModal = (value) => {
    if(value && value.id) forms.value = {...value}
    dialog.value = true
}

async function send(event) {
  forms.value.birth_date = moment(birth_date.value).format("DD-MM-YYYY");
  try {
    if(forms.value.id) {
        await axios.patch(`http://localhost:3000/items/${forms.value.id}`, forms.value)
    }
    else await axios.post(`http://localhost:3000/items`, forms.value)
    dialog.value = false
    Notification({ text: "Everything is okay !!!" },{type: 'success'}
    )
    emits('getEmployers')

  } catch(err) {
    console.log(err);
     Notification({ text: "Something wrong !!!" },{type: 'danger'}
    )
  }
}

defineExpose({openModal})

</script>
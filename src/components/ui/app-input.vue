<template>
  <div class="form">
    <input
      type="text"
      name="fName"
      :id="props.id_name"
      autocomplete="off"
      required
      v-model="props.modelValue"
      @input="change"
    />
    <label :for="props.id_name" class="label_name">
      <span class="content_name">
        {{ props.label_name }}
      </span>
    </label>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { watch } from "@vue/runtime-core";
const props = defineProps({
  id_name: {
    type: String,
  },
  label_name: {
    type: String,
  },
  input_value: {
    type: String,
  },
  modelValue: {
    type: String,
    default: () => "",
  },
});
const emits = defineEmits('update:modelValue')
function change(val){
    emits('update:modelValue', val.target.value)
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
}
.form {
  width: 100%;
  height: 50px;
  position: relative;
  overflow: hidden;
}
.form input {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  border: none;
  color: #00aaff;
  outline: none;
}
.form label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid #e2e2e8;
}
.form label::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid #00aaff;
  transform: translateX(-100%);
  transition: 0.5s transform ease;
}
.content_name {
  position: absolute;
  left: 0;
  bottom: 5px;
  transition: 0.35s all ease;
}
.form input:focus + .label_name .content_name,
.form input:valid + .label_name .content_name {
  transform: translateY(-110%);
  font-size: 14px;
  color: #00aaff;
}
.form input:focus + .label_name::after,
.form input:valid + label::after {
  transform: translateX(0);
}
</style>
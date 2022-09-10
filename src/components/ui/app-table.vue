<template>
  <div class="rounded-lg mt-7">
    <table class="table-auto rounded-lg w-full overflow-auto min-w-[800px] border-[#eaf5fb] text-center">
    <thead class="bg-[#bcdbec]">
      <tr>
        <th class="p-3 text-sm font-semibold tracking-wide text-center" v-for="(header, i) in headers" :key="`header${i}`">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-green border-[#eaf5fb]">
      <tr v-for="item in body" :key="item.id" class="text-base truncate hover:bg-[#c7e3f1] cursor-pointer">
        <td
          class="p-2 text-sm text-green whitespace-nowrap "
          v-for="(bodyInHeader, bodyHeaderIndex) in headers"
          :key="`bodyHeader${bodyHeaderIndex}`"
        >
          <slot :name="`body_${bodyInHeader.value}`" :item="item">{{
            item[bodyInHeader.value]
          }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <!-- <div class="nothing" v-if="!body.length">
    <span>Malumot yo'q</span>
  </div> -->
</template>
<script setup>
const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  body: {
    type: Array,
    default: () => [],
  },
});
</script>
<style scoped>

</style>
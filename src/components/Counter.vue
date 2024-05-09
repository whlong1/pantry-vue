<script>
import {ref, computed, defineComponent} from "vue"

export default defineComponent({
  setup(){
    const count = ref(0);
    const inc = () => count.value++;
    const dec = () => count.value--;

    const count2 = computed(()=>count.value * 2)

    return {count, count2, inc, dec}
  }
})
</script>

<template>
  <section class="w-full flex flex-row justify-center items-center border border-white">
    <button @click="inc">+</button>
    <p>{{count}}</p>
    <button @click="dec">-</button>
  </section>
</template>
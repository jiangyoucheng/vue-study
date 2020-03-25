<template>
  <div>
      <h2>插槽</h2>
      <!-- 插槽 -->
      <comp>
          <!-- 具名插槽 -->
          <template v-slot:content>内容。。。</template>
          <!-- 匿名插槽 -->
          <template>插槽学习笔记</template>
          <!-- 作用域插槽 -->
          <!-- <template v-slot="slotProps">{{slotProps.content}}</template> -->
          <!-- 可以通过解构的方式 -->
          <template v-slot="{content}">{{content}}</template>
      </comp>
  </div>
</template>

<script>
import comp from './comp'
export default {
  components: {
      comp
  }
}
</script>

<style>

</style>
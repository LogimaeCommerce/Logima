<template>
  <li class="lh30 h5">
    <span>{{ label|htmlDecode }} </span>
    <span class="weight-700">{{ value|htmlDecode }}</span>
  </li>
</template>

<script>
import { ProductAttribute } from '@logima-pwa/core/modules/catalog/components/ProductAttribute.ts'

export default {
  mixins: [ProductAttribute]
}
</script>

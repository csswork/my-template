<template>
  <svg :class="[svgClass, 'svg-icon__' + name]" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: () => ''
  },
  size: {
    type: String,
    default: () => ''
  }
});

const iconName = computed(() => {
  return `#icon-${props.name}`;
});

const svgClass = computed(() => {
  let className = 'svg-icon';
  if (props.className) {
    className += ` ${props.className}`;
  }

  if (props.size) {
    className += ` size-${props.size}`;
  }
  return className;
});
</script>
<style scoped lang="scss">
.svg-icon {
  fill: currentColor;

  &.size-48 {
    width: 48px;
    height: 48px;
  }
}
</style>

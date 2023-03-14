<template>
  <div>demo</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { useDemoStore } from '@/store/modules/demo';
import { postAppLogin } from '@/api/demo';
import useJudgePcOrApp from '@/hooks/useJudgePcOrApp';

/* props demo */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
console.log(props.modelValue, 'props demo');

/* emit demo */
const emit = defineEmits(['update:modelValue']);
emit('update:modelValue', false);

/* axios demo */
postAppLogin({
  password: 123456,
  username: 19673239497,
}).then((res) => {
  console.log(res, 'axios demo');
});

/* watch demo */
const visible = ref(false);
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  },
  {
    immediate: true,
  },
);

/* computed demo */
const computedVal = computed(() => {
  return visible.value;
});
console.log(computedVal.value, 'computed demo');

/* pinia状态管理demo */
const demoStore = useDemoStore();
console.log(demoStore.state_count, 'pinia demo');

/* 路由使用demo */
const router = useRouter();
const onJump = () => {
  router.push('/my');
};

/* 使用hooks */
const isPC = useJudgePcOrApp() === 'PC';
</script>
<style scoped lang="scss">
// vue3深度作用选择器示例 :deep(){}
:deep(.demo) {
  margin-bottom: 0;
}
div {
  color: $theme-color;
  @extend %ov1;
}
</style>

<template>
  <page-wrapper>
    <a-space direction="vertical">
      <PartA />
      <a-card title="b区伤害" />

      <a-card title="c区伤害" />

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item>
    </a-space>
  </page-wrapper>
</template>

<script setup lang="ts">
// 地下城堡3伤害计算器
import PartA from '/@/pages/games/underground-castle/components/part-A.vue';

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style scoped></style>

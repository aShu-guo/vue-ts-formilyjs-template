<template>
  <PageContainer>
    <a-card>
      <slot></slot>
    </a-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { PageContainer } from '@ant-design-vue/pro-layout';
</script>

<style scoped></style>

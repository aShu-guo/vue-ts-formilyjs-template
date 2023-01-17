<template>
  <ConfigProvider :locale="locale">
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
</script>
<style lang="less"></style>

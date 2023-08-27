<template>
  <AConfigProvider :locale="locale">
    <router-view />
  </AConfigProvider>
</template>
<script setup lang="ts">
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
dayjs.locale('en');
</script>
<style></style>

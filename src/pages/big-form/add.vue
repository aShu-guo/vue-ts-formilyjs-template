<template>
  <div>
    <span>patrol-log-collect</span>
    <Table :schema="schema" :api="initList" :scope="{ detail: {} }" />
  </div>
</template>
<script lang="ts" setup>
import Table from '/@/components/table-render/index.vue';
import { schema } from './config';
import { SearchApi } from '/@/components/table-render/types';
import { EventColumn } from '/@/pages/patrol-log/collect/config';

const initList: SearchApi<EventColumn> = async (params, _sorter) => {
  console.log('>>>>>>>params:', JSON.stringify(params));
  // const { records, total } = await post(EventApi.getReportCreatedPageList, params);
  return {
    rows: [],
    total: 0,
  };
};

const initialValue = reactive({
  node: '',
});

onMounted(() => {
  setTimeout(() => {
    initialValue.node = '0-0-0';
  });
});
</script>

<template>
  <div>
    <span>patrol-log-collect</span>
    <Table :schema="schema" :api="initList" :scope="{ detail }" />
  </div>
</template>
<script lang="ts" setup>
import Table from '/@/components/table-render/index.vue';
import { schema } from './config';
import { post } from '/@/common/http';
import EventApi from '/@/api/event';
import { SearchApi } from '/@/components/table-render/types';
import { EventColumn } from '/@/pages/patrol-log/collect/config';
import detail from './detail.json';

const initList: SearchApi<EventColumn> = async (params, _sorter) => {
  console.log('>>>>>>>params:', params);
  const { records, total } = await post(EventApi.getReportCreatedPageList, params);
  return {
    rows: records,
    total,
  };
};

const rawDetail = ref({});

onMounted(() => {
  setTimeout(() => {
    rawDetail.value = detail;
  }, 300);
});
</script>

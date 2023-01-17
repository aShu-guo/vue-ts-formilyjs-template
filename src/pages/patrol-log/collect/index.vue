<template>
  <div>
    <span>patrol-log-collect</span>
    <Table :schema="schema" :columns="columns" :scope="scope" :api="initList" />
  </div>
</template>
<script lang="ts" setup>
import Table from '/@/components/table-render/index.vue';
import { schema, columns, EventColumn } from './config';
import { action } from '@formily/reactive';
import { post } from '/@/common/http';
import EventApi from '/@/api/event';
import { SearchApi } from '/@/components/table-render/types';

const useAsyncDataSource = (service) => (field) => {
  // console.log(field);
  field.loading = true;
  service(field).then(
    action.bound &&
      action.bound((data) => {
        field.dataSource = data;
        field.loading = false;
      }),
  );
};

const initList: SearchApi<EventColumn> = async (params, _sorter) => {
  // console.log('>>>>>>>params:', params);
  // console.log('>>>>>>>sorter:', _sorter);
  const { records, total } = await post(EventApi.getReportCreatedPageList, params);
  return {
    rows: records,
    total,
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

const initDepTree = async () => {
  return Promise.resolve([
    {
      label: 'AAA',
      value: 'aaa',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
        },
        {
          title: 'Child Node2',
          value: '0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Child Node3',
          value: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      label: 'BBB',
      value: 'ccc',
      children: [
        {
          title: 'Child Node1',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'Child Node2',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Child Node3',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ]);
};

const scope = reactive({
  initialValue,
  useAsyncDataSource,
  initDepTree,
});
</script>
<style lang="less" scoped>
@import './index.less';
</style>

<template>
  <Params
    ref="form"
    v-if="search"
    :api="api"
    :schema="schema"
    :scope="scope"
    :extra-params="extraParams"
    :need-pagination="!!columns"
    @loading="(value) => (loading = value)"
    @submit="initData"
    @reset="reset"
  />
  <a-table
    v-if="columns"
    :showSorterTooltip="false"
    :columns="rawColumns"
    :data-source="data"
    :loading="loading"
    :pagination="{
      showQuickJumper: true,
      pageSizeOptions: [10, 15, 20],
      hideOnSinglePage: true,
      showLessItems: true,
      total: pageInfo.total,
      pageSize: pageInfo.pageSize,
      current: pageInfo.current,
    }"
    emptyText="-"
    @change="tableChangeHandler"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : '')"
    v-bind="extraProps"
  />
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import Params from './params/index.vue';
import { ExtraParams, InnerColumnsType, SearchApi } from '/@/components/table-render/types';
import { defaultPageSize, useRawColumns } from '/@/components/table-render/table-helper';
import { FilterValue, SorterResult, TablePaginationConfig } from 'ant-design-vue/es/table/interface';

const {
  schema, // json schema
  scope = {}, // json schema 构建的作用域
  search = true, // 是否展示search组件
  api, // 列表接口，return Promise
  columns, // 列表字段，与antdv table组件结构保持一致，新增了valueType字段
  extraProps = {}, // 其他要传入table的props
} = defineProps<{
  schema: object;
  scope?: object;
  api: SearchApi<object>;
  search?: boolean;
  columns?: InnerColumnsType<object>;
  extraProps?: object;
}>();
// 构造修正过的columns对象
const data = ref([]);
const loading = ref(false);
// 受控的筛选、排序对象：变动时会触发接口请求 以及 重新标准化columns对象
const extraParams = reactive<ExtraParams>({
  pagination: {
    current: 1,
    pageSize: defaultPageSize,
  },
  filters: {},
  sorter: [],
});
const rawColumns = useRawColumns(columns, extraParams);

const pageInfo = reactive({
  total: 0,
  pageSize: defaultPageSize,
  current: 1,
});

const initData = ({ rows, total }) => {
  data.value = rows;
  pageInfo.total = total;
};
// table:分页、排序、筛选变化时触发，需要重新请求
const tableChangeHandler = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult | SorterResult[],
) => {
  // 更改分页参数
  pageInfo.pageSize = pagination.pageSize!;
  pageInfo.current = pagination.current!;

  // debugger
  let sortedInfo: SorterResult[] = extraParams.sorter;

  if (Array.isArray(sorter)) {
    sortedInfo = sorter;
  } else {
    // sortedInfo只能存放相同排序方式：只能多列排序 或者 只能单列排序
    //  多列排序与单列排序不能共存，互斥时需要清空掉原数组
    const hasSingle = sortedInfo.some((item) => item.column && !item.column.sorter!['multiple']);
    if (hasSingle || (!hasSingle && !sorter.column?.sorter!['multiple'])) {
      // 只要有一列是单列排序，那么需要重置排序
      sortedInfo = [sorter];
    } else {
      const index = extraParams.sorter.findIndex((item) => item.columnKey === sorter.columnKey);

      if (index >= 0) {
        sortedInfo.splice(index, 1, sorter);
      } else {
        sortedInfo.push(sorter);
      }
    }
  }

  extraParams.pagination = pagination;
  extraParams.filters = filters;
  extraParams.sorter = sortedInfo;
};

const reset = () => {
  extraParams.pagination = {
    current: 1,
    pageSize: defaultPageSize,
  };
  extraParams.sorter = [];
};

const form = ref<InstanceType<typeof Params> | null>(null);
defineExpose({
  form: form?.value?.form,
});
</script>
<style lang="less" scoped>
@import './index.less';
</style>

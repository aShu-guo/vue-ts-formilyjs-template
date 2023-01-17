<template>
  <FormProvider :form="form">
    <SchemaField :schema="rawSchema" :scope="scope" />
  </FormProvider>
</template>
<script lang="ts" setup>
import {
  Space,
  FormLayout,
  Form,
  FormItem,
  FormGrid,
  Input,
  Select,
  Radio,
  Checkbox,
  Cascader,
  TreeSelect,
  Switch,
  DatePicker,
  TimePicker,
  FormButtonGroup,
  Submit,
  Password,
  ArrayCards,
  ArrayItems,
  InputNumber,
} from '@formily/antdv-x3';
import { Schema } from '@formily/vue';
import { Button, Alert, Divider } from 'ant-design-vue';
import BizDatePicker from '/@/components/table-render/biz-date-picker';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/vue';
import { ISchema } from '@formily/json-schema/esm/types';
import { Component, Decorator, noop, SearchApi } from '/@/components/table-render/types';
import { TimeOut } from '/@/components/table-render/table-helper';
import { FilterValue, SorterResult, TablePaginationConfig } from 'ant-design-vue/es/table/interface';
import Verification from '/@/components/verification';
// 开启协议垫片
Schema.enablePolyfills(['1.0']);

const emits = defineEmits<{
  (e: 'submit', value: Awaited<ReturnType<SearchApi<object>>>);
  (e: 'loading', value: boolean);
  (e: 'reset');
}>();

const {
  schema = {},
  scope = {},
  api = noop,
  extraParams = {
    pagination: {},
    filters: {},
    sorter: [],
  },
  needPagination,
} = defineProps<{
  schema: ISchema<Decorator, Component>;
  scope?: object;
  api: SearchApi<Record<string, unknown>>;
  extraParams?: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult | SorterResult[];
  };
  needPagination: boolean;
}>();

const { SchemaField } = createSchemaField({
  components: {
    Space,
    FormLayout,
    Form,
    FormItem,
    Input,
    FormGrid,
    Select,
    Radio,
    Checkbox,
    Cascader,
    TreeSelect,
    Switch,
    DatePicker,
    TimePicker,
    BizDatePicker,
    FormButtonGroup,
    Submit,
    Button,
    Password,
    Alert,
    ArrayCards,
    Divider,
    ArrayItems,
    InputNumber,
    Verification,
  },
});

const request = (params?) => {
  emits('loading', true);
  return new Promise((resolve) => {
    setTimeout(() => {
      const rawParams = needPagination
        ? {
            ...params,
            pageNo: extraParams.pagination.current,
            pageSize: extraParams.pagination.pageSize,
          }
        : { ...params };
      api(
        rawParams,
        (extraParams.sorter as SorterResult[])
          .filter((item) => item.order)
          .map((item) => ({
            field: item.field,
            order: item.order,
          })),
      ).then((res) => emits('submit', res));
      emits('loading', false);
      resolve('success');
    }, TimeOut);
  });
};
watch(
  () => [extraParams.pagination, extraParams.sorter],
  () => request(),
  {
    immediate: true,
  },
);

const reset = async () => {
  await form.reset('*');
  emits('reset');
};

const rawSchema = schema;

if (rawSchema.properties) {
  rawSchema.properties['buttons'] = {
    type: 'void',
    'x-component': 'FormButtonGroup',
    'x-component-props': {
      align: 'center',
    },
    properties: {
      submit: {
        type: 'void',
        'x-component': 'Submit',
        'x-content': '提交',
        'x-component-props': {
          onSubmit: request,
        },
      },
      reset: {
        type: 'void',
        'x-component': 'Button',
        'x-content': '重置',
        'x-component-props': {
          onClick: reset,
        },
      },
    },
  };
}

const form = createForm();
defineExpose({
  form,
});
</script>
<style lang="less" scoped>
@import './index.less';
</style>

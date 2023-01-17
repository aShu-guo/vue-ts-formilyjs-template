import { h } from 'vue';
import { Component, Decorator, InnerColumnsType } from '/@/components/table-render/types';
import { InnerEnum } from '/@/common/types';
import { SmileOutlined } from '@ant-design/icons-vue';
import { ISchema } from '@formily/json-schema/esm/types';
import { genSchemaEnums, genTableEnums } from '/@/components/table-render/table-helper';

export interface EventColumn {
  reportEventNum: string;
  patrolExecutionNum: string;
  reportEvent: string;
  eventTime: string;
  handleStates: string;
}

export const CollectStatusEnum: InnerEnum = {
  UnReport: { value: '0', label: '未上报' },
  NotHandle: { value: '1', label: '不受理' },
  Refuse: { value: '2', label: '已驳回' },
  Report: { value: '3', label: '已上报' },
};

export const EventTypeEnum: InnerEnum = {
  TrafficFlow: { label: '车流量识别', value: 'a' },
  IllegalParking: { label: '违章停车', value: 'b' },
  IllegalOccupation: { label: '违规占道', value: 'c' },
  PollutantIdentification: { label: '污染物识别', value: 'd' },
  FishIdentification: { label: '偷鱼识别', value: 'e' },
  IllegalHouse: { label: '屋顶违建', value: 'f' },
  RiverPatrol: { label: '河道巡查', value: 'g' },
  GarbageDumping: { label: '垃圾倾倒', value: 'h' },
  SpoilDumping: { label: '渣土倾倒', value: 'i' },
  LowSmall: { label: '低小散', value: 'j' },
  NoLicense: { label: '无证运输', value: 'k' },
  Other: { label: '多种类事件', value: 'l' },
};

export const schema: ISchema<Decorator, Component> = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 3,
        maxColumns: 3,
      },
      properties: {
        reportEventNum: {
          type: 'string',
          title: '事件号',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入事件号',
          },
        },
        patrolExecutionNum: {
          type: 'string',
          title: '飞行编号',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入飞行执行编号',
          },
        },
        reportEvent: {
          type: 'string',
          title: '事件类型',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入飞行执行编号',
          },
        },
        '[startTime,endTime]': {
          type: 'string',
          title: '实际起降时刻',
          'x-decorator': 'FormItem',
          'x-component': 'BizDatePicker',
          'x-component-props': {
            range: true,
            suffixIcon: h(SmileOutlined),
          },
        },
        handleStates: {
          type: 'string',
          title: '事件状态',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: genSchemaEnums(CollectStatusEnum),
        },
      },
    },
  },
};

export const columns: InnerColumnsType<EventColumn> = [
  {
    title: '序号',
    valueType: 'index',
  },
  {
    title: '事件号',
    dataIndex: 'reportEventNum',
    key: 'reportEventNum',
    ellipsis: true,
  },
  {
    title: '飞行编号',
    dataIndex: 'patrolExecutionNum',
    key: 'patrolExecutionNum',
    ellipsis: true,
    sorter: true,
  },
  {
    title: '事件类型',
    dataIndex: 'reportEvent',
    key: 'reportEvent',
    ellipsis: true,
    valueEnum: genTableEnums(EventTypeEnum),
    sorter: {
      multiple: 2,
    },
  },
  {
    title: '创建时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    ellipsis: true,
    valueType: 'dateTime',
    sorter: {
      multiple: 1,
    },
  },
  {
    title: '事件状态',
    dataIndex: 'handleStates',
    key: 'handleStates',
    ellipsis: true,
    valueEnum: genTableEnums(CollectStatusEnum),
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    customRender: ({ record }) => {
      return h(
        'span',
        record.handleStates === CollectStatusEnum.UnReport.value
          ? '上报'
          : record.handleStates === CollectStatusEnum.UnReport.value
          ? '处理'
          : '查看',
      );
    },
  },
];

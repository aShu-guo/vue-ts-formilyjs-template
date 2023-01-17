import { ColumnsType } from 'ant-design-vue/es/table';
import { SorterResult } from 'ant-design-vue/es/table/interface';
import { FilterValue, TablePaginationConfig } from 'ant-design-vue/es/table/interface';

export type PageParams = {
  pageNo: number;
  pageSize: number;
};

export interface TableRenderData {
  dataSource: object[];
  loading: boolean;
}

export interface ExtraParams {
  pagination: TablePaginationConfig;
  filters: Record<string, FilterValue | null>;
  sorter: SorterResult[];
}

/**
 * 表单提交的API结构要求
 * 1. 分页参数
 * 2. 接口入参的结构中必须包含列表每行的数据结构
 * 3. 不仅支持table的搜索，而且支持表单的提交，所以会有void
 */
export type SearchApi<RecordType> = (
  params: Record<string, any> &
    PageParams & {
      tab?: number;
    } & RecordType,
  sorter?: SorterResult | SorterResult[],
) => Promise<{
  rows: Array<RecordType>;
  total: number;
}>;

export type InnerColumnsType<T extends object = any> = Array<
  ColumnsType<T>[number] & {
    /** 值的类型 */
    valueType?: 'money' | 'date' | 'dateTime' | 'text' | 'index' | 'percent';
    /** 当前列值的枚举 */
    valueEnum?: Record<string, string>;
  }
>;

export const noop: SearchApi<Record<string, unknown>> = async () => {
  return Promise.resolve({
    rows: [],
    total: 0,
  });
};

export enum Decorator {
  FormItem = 'FormItem',
  Form = 'Form',
}

export enum Component {
  FormLayout = 'FormLayout',
  Form = 'Form',
  Input = 'Input',
  FormGrid = 'FormGrid',
  Select = 'Select',
  Radio = 'Radio',
  Checkbox = 'Checkbox',
  Cascader = 'Cascader',
  TreeSelect = 'TreeSelect',
  Switch = 'Switch',
  DatePicker = 'DatePicker',
  TimePicker = 'TimePicker',
  BizDatePicker = 'BizDatePicker',
  Password = 'Password',
  FormButtonGroup = 'FormButtonGroup',
  Submit = 'Submit',
  Reset = 'Reset',
  Space = 'Space',
  Alert = 'Alert',
  Divider = 'Divider',
  InputNumber = 'InputNumber',
  Verification = 'Verification',
}

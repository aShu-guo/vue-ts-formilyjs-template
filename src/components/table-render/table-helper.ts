import { CellEllipsisType } from 'ant-design-vue/es/vc-table/interface';
import { ExtraParams, InnerColumnsType } from '/@/components/table-render/types';
import { Tooltip } from 'ant-design-vue';
import { InnerEnum } from '/@/common/types';
import dayjs from 'dayjs';
import { action } from '@formily/reactive';
import { Field } from '@formily/core';

export const TimeOut = 300;
export const defaultPageSize = 10;
/**
 * 构造schema支持的枚举值
 * @param innerEnum
 */
export const genSchemaEnums = function (innerEnum: InnerEnum) {
  const rawEnum: InnerEnum[keyof InnerEnum][] = [];
  for (const key in innerEnum) {
    rawEnum.push(innerEnum[key]);
  }
  return rawEnum;
};

/**
 * 格式化datetime格式的数据
 * @param time
 */
export const formatDateTime = (time: string) => {
  if (!time) return '';
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * 格式化date格式的数据
 * @param time
 */
export const formatDate = (time: string) => {
  if (!time) return '';
  return dayjs(time).format('YYYY-MM-DD');
};

/**
 * 格式化money格式的数据
 * @param num
 */
export const formatMoney = (num: number) => {
  if (!num) return '';
  return `¥${num}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const renderEllipsis = (text, ellipsis?: CellEllipsisType) => {
  if (ellipsis) {
    return h(
      Tooltip,
      {
        title: text,
        placement: 'top',
        arrowPointAtCenter: true,
      },
      () => text,
    );
  }
  return h('span', text);
};

/**
 * 排序以及筛选时注意
 * 1. columns 中定义了 filteredValue 和 sortOrder 属性即视为受控模式。
 * 2. 只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。
 * 3. 务必指定 column.key。
 * @param columns
 * @param extraParams
 */
export const useRawColumns = <T extends object>(columns: InnerColumnsType<T>, extraParams: ExtraParams) => {
  return computed<InnerColumnsType<T>>(() => {
    const rawColumns: InnerColumnsType<T> = [];

    const { sorter: sortedInfo } = extraParams;

    // const unWrappedFilter = unref(filteredInfo);
    columns.map((item) => {
      const rawItem = { ...item };
      // 以用户自定义的render为准
      if (rawItem.customRender) {
        rawColumns.push(rawItem);
        return;
      }
      switch (item.valueType) {
        case 'money':
          rawItem.customRender = ({ value }) => renderEllipsis(formatMoney(value), rawItem.ellipsis);
          break;
        case 'date':
          rawItem.customRender = ({ value }) => renderEllipsis(formatDate(value), rawItem.ellipsis);
          break;
        case 'dateTime':
          rawItem.customRender = ({ value }) => renderEllipsis(formatDateTime(value), rawItem.ellipsis);
          break;
        case 'index':
          rawItem.customRender = ({ renderIndex }) => renderEllipsis(renderIndex + 1, rawItem.ellipsis);
          break;
        case 'text':
        default:
          rawItem.customRender = ({ value }) => renderEllipsis(value, rawItem.ellipsis);
          break;
      }
      if (rawItem.valueEnum) {
        rawItem.customRender = ({ value }) =>
          renderEllipsis(rawItem.valueEnum && rawItem.valueEnum[value], rawItem.ellipsis);
      }

      if (item.sorter) {
        if (sortedInfo.length > 0 && sortedInfo.some((item) => item.columnKey === rawItem.key)) {
          rawItem.sortOrder = sortedInfo.filter((item) => item.columnKey === rawItem.key)[0].order;
        } else {
          rawItem.sortOrder = undefined;
        }
      }

      rawColumns.push(rawItem);
    });
    return rawColumns;
  });
};

/**
 * 构造标准table枚举结构，用于列表展示
 * @param innerEnum
 */
export const genTableEnums = function (innerEnum: InnerEnum) {
  const rawEnum = {};
  for (const key in innerEnum) {
    rawEnum[innerEnum[key].value] = innerEnum[key].label;
  }
  return rawEnum;
};

/**
 * 构造出带冒号的label标签
 * @param label
 * @param asterisk
 */
export const renderColon = function (label: string, asterisk = true) {
  return h(
    'div',
    {
      style: {
        marginRight: '-8px',
      },
    },
    [
      asterisk
        ? h(
            'span',
            {
              class: 'base-required',
            },
            '*',
          )
        : '',
      h('label', label),
      h('span', { class: 'formily-antdv-form-item-colon' }, ':'),
    ],
  );
};

/**
 * 表单异步解决方案
 * @param service
 */
export const useAsyncDataSource = (service) => (field: Field) => {
  // console.log('>>>>>service:', service);
  field.loading = true;
  service(field).then(
    action.bound &&
      action.bound((data) => {
        console.log('>>>>>data:', data);
        // console.log('>>>>>>field:', field);
        console.log('>>>>> field.dataSource old:', field.dataSource);
        field.setDataSource([{ label: 'airportsNo', value: data }]);
        console.log('>>>>> field.dataSource new :', field.dataSource);
        field.loading = false;
        // field.set
      }),
  );
};

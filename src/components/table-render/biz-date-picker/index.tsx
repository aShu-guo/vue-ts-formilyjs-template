import { observer } from '@formily/reactive-vue';
import { defineComponent, h } from 'vue';
import { DatePickerProps } from 'ant-design-vue';
import { DatePicker } from '@formily/antdv-x3';
import 'ant-design-vue/es/date-picker/style/index.less';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
export type BizDatePickerProps = {
  range?: boolean;
  showTimeFormat?: string;
  emitTimeFormat?: string;
} & DatePickerProps;

const BizDatePicker = observer(
  defineComponent({
    name: 'BizDatePicker',
    inheritAttrs: false,
    props: {
      range: { type: Boolean, default: false },
      showTimeFormat: { type: String, default: 'YYYY-MM-DD' },
      emitTimeFormat: { type: String, default: 'YYYY-MM-DD HH:mm:ss' },
    },
    emits: ['change'],
    setup(props: BizDatePickerProps, { attrs, slots, emit }) {
      return () =>
        h(
          props.range ? RangePicker : DatePicker,
          {
            ...attrs,
            format: props.showTimeFormat,
            onChange: (value) => {
              console.log('>>>>>>>value:', value);
              if (value) {
                if (Array.isArray(value)) {
                  const [start, end] = value;
                  emit('change', [
                    dayjs(start).startOf('month').format(props.emitTimeFormat),
                    dayjs(end).endOf('month').format(props.emitTimeFormat),
                  ]);
                } else {
                  emit('change', dayjs(value).startOf('month').format(props.emitTimeFormat));
                }
              } else {
                props.range ? emit('change', []) : emit('change', '');
              }
            },
          },
          slots,
        );
    },
  }),
);

export default BizDatePicker;

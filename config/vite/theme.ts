const modifyTheme = (): Record<string, string> => {
  return {
    'primary-color': '#00AFB5', // 全局主色
    'link-color': '#0ACED0', // 链接色
    'success-color': '#17CE89', // 成功色
    'warning-color': '#E9A112', // 警告色
    'error-color': '#E44848', // 错误色
    'font-size-base': '14px', // 主字号
    'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色 #FFFFFF
    'text-color': 'rgba(152, 160, 165, 0.65)', // 主文本色
    'text-color-secondary': 'rgba(152, 160, 165, 0.45)', // 次文本色
    'disabled-color': 'rgba(152, 160, 165, 0.25)', // 失效色
    'border-radius-base': '2px', // 组件/浮层圆角
    'border-color-base': '#010101', // 边框色
    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
    //  input
    'input-hover-border-color': '#00AFB5',
    'input-height-base': '38px',
    'input-color': '#FFFFFF',
    'input-placeholder-color': '#8D949A',
    // table
    'table-padding-vertical': '9px',
    'table-padding-horizontal': '9px',
    'table-header-bg': '#1E272D',
    'table-header-color': '#98A0A5',
    'table-row-hover-bg': '#203B45',
    // 'table-selected-row-color': inherit;
    'table-selected-row-bg': '#fafafa',
    //  tag
    'tag-default-bg': '#36393A',
    'tag-default-color': '#DDDEDE',
    'tag-font-size': '12px',
    // select
    'select-item-selected-color': '#0ACED0',
    //  timepicker
    'time-picker-selected-bg': '#00AFB5',

    // formily
    'height-base': '32px',
    'height-lg': '40px',
    'height-sm': '24px',
    'formily-prefix': 'formily-antdv',
    'ant-prefix': 'ant',
    // 'root-entry-name': 'variable',
    'border-color-split': 'hsv(0, 0, 94%)',
    'padding-lg': '24px',
  };
};
export default modifyTheme;

import { Component, Decorator } from '/@/components/table-render/types';
import { ISchema } from '@formily/json-schema/esm/types';
import { InnerEnum } from '/@/common/types';
import { genSchemaEnums, renderColon } from '/@/components/table-render/table-helper';

export const AirportTypeEnum: InnerEnum = {
  Logistics: { label: '物流', value: 1 },
  Inspection: { label: '巡检', value: 2 },
  Manned: { label: '载人', value: 3 },
};

export const WarEnum: InnerEnum = {
  Yes: { label: '是', value: 1 },
  No: { label: '否', value: 2 },
};

export const schema: ISchema<Decorator, Component> = {
  type: 'object',
  properties: {
    form: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 6,
        wrapperCol: 18,
      },
      properties: {
        airportsNo: {
          type: 'string',
          title: '起降场编号',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            style: 'width: 382px;',
          },
          default: '{{detail.airportsNo}}',
        },
        airportsName: {
          type: 'string',
          title: '起降场名称',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            style: 'width: 382px;',
          },
          default: '{{detail.airportsName}}',
        },
        airportsAddress: {
          type: 'object',
          default: '{{detail.airportsAddress}}',
          properties: {
            object: {
              type: 'void',
              title: '起降场地址',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                asterisk: true,
                feedbackLayout: 'none',
              },
              'x-component': 'Space',
              'x-component-props': {
                size: 11,
                align: 'start',
                style: 'flex-wrap:wrap;width: 400px;',
              },
              properties: {
                province: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    style: 'width: 120px;',
                  },
                  required: true,
                  enum: [
                    { label: '浙江省', value: 1 },
                    { label: '河南省', value: 2 },
                  ],
                },
                city: {
                  type: 'number',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  enum: [
                    { label: '杭州市', value: 11 },
                    { label: '宁波市', value: 22 },
                  ],
                  'x-component-props': {
                    style: 'width: 120px;',
                  },
                },
                area: {
                  type: 'number',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  enum: [
                    { label: '余杭区', value: 111 },
                    { label: '临安区', value: 2222 },
                  ],
                  'x-component-props': {
                    style: 'width: 120px;',
                  },
                },
                street: {
                  type: 'string',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    gridSpan: 3,
                  },
                  'x-component': 'Input.TextArea',
                  'x-component-props': {
                    allowClear: true,
                    style: 'width: 382px;',
                  },
                },
              },
            },
          },
        },
        altitudeAndArea: {
          type: 'void',
          title: '海拔高度',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: true,
            feedbackLayout: 'none',
          },
          'x-component': 'Space',
          'x-component-props': {
            size: 24,
          },
          properties: {
            altitude: {
              type: 'string',
              required: true,
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                addonAfter: 'm',
              },
              'x-component': 'Input',
              'x-component-props': {
                style: 'width: 138px;',
              },
              default: '{{detail.altitude}}',
            },
            measureArea: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                asterisk: true,
                addonBefore: renderColon('面积'),
                addonAfter: 'm²',
              },
              'x-component': 'Input',
              'x-component-props': {
                style: 'width: 138px;',
              },
              required: true,
              default: '{{detail.measureArea}}',
            },
          },
        },
        type: {
          type: 'number',
          title: '类型',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox.Group',
          enum: genSchemaEnums(AirportTypeEnum),
          default: '{{detail.type}}',
        },
        isWar: {
          type: 'number',
          title: '是否战备',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: genSchemaEnums(WarEnum),
          'x-component-props': {
            style: 'width: 382px;',
          },
          default: '{{detail.isWar}}',
        },
        startCircle: {
          type: 'object',
          default: '{{detail.startCircle}}',
          properties: {
            object: {
              type: 'void',
              title: '起始进近圈',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                asterisk: true,
                feedbackLayout: 'none',
              },
              'x-component': 'Space',
              'x-component-props': {
                size: 24,
              },
              properties: {
                radius: {
                  type: 'number',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    addonBefore: renderColon('半径', false),
                    addonAfter: 'm',
                  },
                  'x-component': 'InputNumber',
                  'x-component-props': {
                    style: 'width: 110px;',
                  },
                },
                minHeight: {
                  type: 'number',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    addonBefore: renderColon('最低海拔高度', false),
                    addonAfter: 'm',
                  },
                  'x-component': 'InputNumber',
                  'x-component-props': {
                    style: 'width: 110px;',
                  },
                },
                circleCenter: {
                  type: 'void',
                  title: '圆心点',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackLayout: 'none',
                  },
                  'x-component': 'Space',
                  'x-component-props': {
                    size: 16,
                  },
                  properties: {
                    longitude: {
                      type: 'number',
                      required: true,
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        addonBefore: 'E',
                      },
                      'x-component': 'Input',
                      'x-component-props': {
                        style: 'width: 110px;',
                      },
                    },
                    latitude: {
                      type: 'number',
                      required: true,
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        addonBefore: 'N',
                      },
                      'x-component': 'Input',
                      'x-component-props': {
                        style: 'width: 110px;',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        auditFile: {
          type: 'void',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackLayout: 'none',
            wrapperCol: '4',
          },
          'x-component': 'Space',
          'x-component-props': {
            size: 20,
          },
          default: '{{detail.auditFile}}',
          properties: {
            tips: {
              type: 'void',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackLayout: 'none',
              },
              'x-component': 'Alert',
              'x-component-props': {
                message: '123123',
                type: 'error',
              },
            },
          },
        },
        centerCircle: {
          type: 'object',
          default: '{{detail.centerCircle}}',
          properties: {
            object: {
              type: 'void',
              title: '中间进近圈',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                asterisk: true,
                feedbackLayout: 'none',
              },
              'x-component': 'Space',
              'x-component-props': {
                size: 24,
              },
              properties: {
                radius: {
                  type: 'number',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    addonBefore: renderColon('半径', false),
                    addonAfter: 'm',
                  },
                  'x-component': 'Input',
                  'x-component-props': {
                    style: 'width: 110px;',
                  },
                },
                minHeight: {
                  type: 'number',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    addonBefore: renderColon('最低海拔高度', false),
                    addonAfter: 'm',
                  },
                  'x-component': 'Input',
                  'x-component-props': {
                    style: 'width: 110px;',
                  },
                },
                circleCenter: {
                  type: 'void',
                  title: '圆心点',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackLayout: 'none',
                  },
                  'x-component': 'Space',
                  'x-component-props': {
                    size: 16,
                  },
                  properties: {
                    longitude: {
                      type: 'number',
                      required: true,
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        addonBefore: 'E',
                      },
                      'x-component': 'Input',
                      'x-component-props': {
                        style: 'width: 110px;',
                      },
                    },
                    latitude: {
                      type: 'number',
                      required: true,
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        addonBefore: 'N',
                      },
                      'x-component': 'Input',
                      'x-component-props': {
                        style: 'width: 110px;',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        pointsList: {
          type: 'array',
          title: '起降点',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: true,
          },
          'x-component': 'ArrayCards',
          'x-component-props': {
            title: '起始点',
            style: 'width: 890px;',
          },
          default: '{{detail.pointsList}}',
          items: {
            type: 'object',
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCards.Index',
              },
              info: {
                type: 'object',
                properties: {
                  object: {
                    type: 'void',
                    'x-component': 'Space',
                    'x-component-props': {
                      size: 32,
                      align: 'start',
                      style: 'flex-wrap:wrap;',
                    },
                    properties: {
                      pointNo: {
                        type: 'string',
                        title: '起降点编号',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                          style: 'width: 110px;',
                        },
                      },
                      baseLine: {
                        type: 'object',
                        properties: {
                          object: {
                            type: 'void',
                            title: '基准位置',
                            'x-decorator': 'FormItem',
                            'x-decorator-props': {
                              feedbackLayout: 'none',
                              labelWidth: 73,
                            },
                            'x-component': 'Space',
                            'x-component-props': {
                              size: 16,
                              align: 'start',
                            },
                            properties: {
                              longitude: {
                                type: 'number',
                                required: true,
                                'x-decorator': 'FormItem',
                                'x-decorator-props': {
                                  addonBefore: 'E',
                                },
                                'x-component': 'Input',
                                'x-component-props': {
                                  style: 'width: 110px;',
                                },
                              },
                              latitude: {
                                type: 'number',
                                required: true,
                                'x-decorator': 'FormItem',
                                'x-decorator-props': {
                                  addonBefore: 'N',
                                },
                                'x-component': 'Input',
                                'x-component-props': {
                                  style: 'width: 110px;',
                                },
                              },
                            },
                          },
                        },
                      },
                      altitude: {
                        title: '海拔高度',
                        type: 'number',
                        'x-decorator': 'FormItem',
                        'x-decorator-props': {
                          addonAfter: 'm',
                        },
                        'x-component': 'InputNumber',
                        'x-component-props': {
                          style: 'width: 110px;',
                        },
                      },
                      roadRadius: {
                        title: '通道半径',
                        type: 'number',
                        'x-decorator': 'FormItem',
                        'x-decorator-props': {
                          addonAfter: 'm',
                          labelWidth: 83,
                        },
                        'x-component': 'InputNumber',
                        'x-component-props': {
                          style: 'width: 110px;',
                        },
                      },
                      roadHeight: {
                        title: '通道高度',
                        type: 'number',
                        'x-decorator': 'FormItem',
                        'x-decorator-props': {
                          addonAfter: 'm',
                          labelWidth: 71,
                        },
                        'x-component': 'InputNumber',
                        'x-component-props': {
                          style: 'width: 110px;',
                        },
                      },
                    },
                  },
                },
              },
              gutter: {
                type: 'void',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Divider',
                'x-component-props': {
                  dashed: true,
                },
              },
              standList: {
                type: 'array',
                title: '停机位',
                'x-component': 'ArrayItems',
                'x-decorator': 'FormItem',
                items: {
                  type: 'object',
                  properties: {
                    object: {
                      type: 'void',
                      'x-component': 'Space',
                      'x-component-props': {
                        size: 32,
                        align: 'start',
                      },
                      properties: {
                        landNo: {
                          type: 'string',
                          title: '停机编号',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': {
                            style: 'width: 110px;',
                          },
                        },
                        latAndLng: {
                          type: 'object',
                          properties: {
                            object: {
                              type: 'void',
                              title: '经纬度',
                              'x-decorator': 'FormItem',
                              'x-decorator-props': {
                                feedbackLayout: 'none',
                              },
                              'x-component': 'Space',
                              'x-component-props': {
                                size: 16,
                                align: 'start',
                              },
                              properties: {
                                longitude: {
                                  type: 'number',
                                  required: true,
                                  'x-decorator': 'FormItem',
                                  'x-decorator-props': {
                                    addonBefore: 'E',
                                  },
                                  'x-component': 'Input',
                                  'x-component-props': {
                                    style: 'width: 110px;',
                                  },
                                },
                                latitude: {
                                  type: 'number',
                                  required: true,
                                  'x-decorator': 'FormItem',
                                  'x-decorator-props': {
                                    addonBefore: 'N',
                                  },
                                  'x-component': 'Input',
                                  'x-component-props': {
                                    style: 'width: 110px;',
                                  },
                                },
                              },
                            },
                          },
                        },
                        radius: {
                          type: 'string',
                          title: '半径',
                          'x-decorator': 'FormItem',
                          'x-decorator-props': {
                            addonAfter: 'm',
                          },
                          'x-component': 'Input',
                          'x-component-props': {
                            style: 'width: 110px;',
                          },
                        },
                        remove: {
                          type: 'void',
                          'x-decorator': 'FormItem',
                          'x-component': 'ArrayItems.Remove',
                          'x-component-props': {
                            shape: 'circle',
                          },
                        },
                      },
                    },
                  },
                },
                properties: {
                  add: {
                    type: 'void',
                    title: '添加停机位',
                    'x-component': 'ArrayItems.Addition',
                  },
                },
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCards.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCards.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCards.MoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加起降点',
              'x-component': 'ArrayCards.Addition',
              'x-component-props': {
                style: 'width: 890px;',
              },
            },
          },
        },
      },
    },
  },
};

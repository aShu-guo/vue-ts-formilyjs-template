import { ISchema } from '@formily/json-schema/esm/types';
import { Component, Decorator } from '/@/components/table-render/types';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export const schema: ISchema<Decorator, Component> = {
  type: 'object',
  properties: {
    form: {
      type: 'void',
      'x-component': 'Form',
      'x-component-props': {
        labelCol: 8,
        wrapperCol: 8,
      },
      properties: {
        username: {
          type: 'string',
          title: '用户名',
          required: true,
          default: 'cangqian-caiji2',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            prefix: h(UserOutlined),
          },
        },
        password: {
          type: 'string',
          title: '密码',
          required: true,
          default: 'a1234567',
          'x-decorator': 'FormItem',
          'x-component': 'Password',
          'x-component-props': {
            prefix: h(LockOutlined),
          },
        },
        /*layout: {
          type: 'void',
          title: '验证码',
          'x-decorator': 'FormItem',
          'x-component': 'Space',
          properties: {
            verifyCode: {
              type: 'string',
              required: true,
              default: '0000',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                prefix: h(LockOutlined),
                style: 'width:280px',
              },
            },
            uuid: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Verification',
            },
          },
        },*/
      },
    },
  },
};

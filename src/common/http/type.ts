import { BaseAny } from '/@/common/types';

export interface RequestOptions {
  // Whether to process the request result
  isTransformResponse?: boolean;
}

export type BaseFn = (data: BaseResponse<BaseAny>) => unknown;

// 返回res.data的interface
export interface BaseResponse<T> {
  code: number;
  data: T;
  message?: string;
  success: boolean;
}

/**用户登录 */
export interface ILogin {
  /** 账户名称 */
  username: string;
  /** 账户密码 */
  password: string;
}

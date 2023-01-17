import { message } from 'ant-design-vue/es';

/**
 * status非200异常处理
 * @param errStatus
 */
export const handleNetworkError = (errStatus: number) => {
  if (errStatus) {
    switch (errStatus) {
      case 302:
        message.error('接口重定向了！');
        break;
      case 400:
        message.error('参数不正确！');
        break;
      case 401:
        message.error('您未登录，或者登录已经超时，请先登录！');
        break;
      case 403:
        message.error('您没有权限操作！');
        break;
      case 404:
        message.error('请求地址出错');
        break; // 在正确域名下
      case 408:
        message.error('请求超时！');
        break;
      case 409:
        message.error('系统已存在相同数据！');
        break;
      case 500:
        message.error('服务器内部错误！');
        break;
      case 501:
        message.error('服务未实现！');
        break;
      case 502:
        message.error('网关错误！');
        break;
      case 503:
        message.error('服务不可用！');
        break;
      case 504:
        message.error('服务暂时无法访问，请稍后再试！');
        break;
      case 505:
        message.error('HTTP版本不受支持！');
        break;
      default:
        message.error('异常问题，请联系管理员！');
        break;
    }
  } else {
    message.error(`无法连接到服务器！`);
  }
};

/**
 *
 * @param code
 * @param msg
 */
export const handleGeneralError = (code: number, msg: string) => {
  // 接口失败的情况
  if (code != 200) {
    message.error(msg);
    return false;
  }
};

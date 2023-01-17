import { MockMethod } from 'vite-plugin-mock';
// import { successResult, errorResult, requestParams, getRequestToken } from '/@/common/result';
import UserAPI from '/@/api/user';
import { errorResult, getRequestToken, successResult } from './helper';

const TokenPrefix = '123123';

export function createFakeUserList() {
  return [
    {
      userId: '0000',
      userName: 'admin',
      realName: '管理员',
      desc: '管理员',
      password: '111111',
      token: 'P1DeqWBao0HTU47Q',
      roles: ['admin'],
      adcode: '330100',
      deptName: '杭州',
    },
    {
      userId: '0001',
      userName: 'staff',
      realName: '员工',
      desc: '员工',
      password: '111111',
      token: 'P1DeqWBao0HTU47Q',
      roles: ['staff'],
      adcode: '330110',
      deptName: '余杭区',
    },
  ];
}

export default [
  {
    url: UserAPI.doLogin,
    timeout: 200,
    method: 'post',
    response: (request) => {
      const { username, password } = request?.body;
      const checkUser = createFakeUserList().find((item) => item.userName === username && item.password === password);
      if (!checkUser) {
        return errorResult('不存在该用户');
      }
      return successResult(checkUser);
    },
  },
  {
    url: UserAPI.doLogout,
    timeout: 200,
    method: 'post',
    response: (request) => {
      console.dir(request);
      const token = getRequestToken(request);
      if (!token) return errorResult('token缺失!');
      const checkUser = createFakeUserList().find((item) => `${TokenPrefix}${item.token}` === token);
      if (!checkUser) {
        return errorResult('token缺失!');
      }
      return successResult('Token 已失效');
    },
  },
  {
    url: '/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];

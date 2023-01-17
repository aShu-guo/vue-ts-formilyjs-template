export const successResult = (data: unknown) => {
  return {
    success: true,
    data,
    code: 200,
    msg: '请求成功',
  };
};

export const errorResult = (data: unknown) => {
  return {
    success: false,
    data,
    code: 500,
    msg: '请求失败',
  };
};

export function getRequestToken({ headers }): string | undefined {
  return headers?.authorization;
}

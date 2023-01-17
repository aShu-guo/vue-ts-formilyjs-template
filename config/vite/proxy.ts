import { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

// serve
export const API_BASE_URL = '/api';
const API_TARGET_URL = 'http://localhost:4000';

// mock
export const MOCK_API_BASE_URL = '/mock/api';
const MOCK_API_TARGET_URL = 'http://localhost:4000';

const init: ProxyTargetList = {
  // test
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  },
};

export default init;

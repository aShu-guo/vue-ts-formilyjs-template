import { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

// serve
const API_BASE_URL = '/api';
const API_TARGET_URL = 'http://localhost:4000';

// mock
const MOCK_API_BASE_URL = '/mock/api';
const MOCK_API_TARGET_URL = 'http://localhost:4000';

// charts
const Echarts_API_BASE_URL = '/charts';
const Echarts_API_TARGET_URL = 'https://echarts.apache.org/examples';

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
  // echarts
  [Echarts_API_BASE_URL]: {
    target: Echarts_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${Echarts_API_BASE_URL}`), ''),
  },
};

export default init;

/**
 * @name ConfigConsoleDrop
 * @description 清除console
 */
import removeConsole from 'vite-plugin-remove-console';

export const ConfigConsoleDrop = (env: 'prod' | 'test') => {
  if (env === 'prod') {
    return removeConsole();
  }
  return [];
};

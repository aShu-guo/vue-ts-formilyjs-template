const { log: Log } = console;
export const log = function (value) {
  Log('>>>>>>>>>>>:', JSON.stringify(value));
};

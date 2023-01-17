/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_OSS_UPLOAD: string;
  readonly VITE_OSS_SHOW: string;
  readonly VITE_MAP_NAME: string;
  readonly VITE_OPEN_MOCK: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'virtual:*' {
  const result: any;
  export default result;
}

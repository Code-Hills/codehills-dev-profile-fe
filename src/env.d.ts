// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_DEFAULT_API: string;
  readonly VITE_APP_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

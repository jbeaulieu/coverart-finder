/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_ITUNES_API_URL: string;
  readonly VITE_DEEZER_API_URL: string;
  readonly VITE_PROXY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "vite" {
  interface ImportMetaEnv {
    readonly PROD: boolean;
    // 定义其他你需要的环境变量
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
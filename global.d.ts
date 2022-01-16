declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: "production" | "development"
    RIN_RPC: string
    PRIVATE_KEY: string
  }
}

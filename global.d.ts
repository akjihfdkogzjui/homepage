declare global {

  namespace NodeJS {

    interface ProcessEnv {
      readonly DEPLOY_DOMAIN: string;
      readonly DEPLOY_MODE: "private" | "public";
    }

  }

}

export {}

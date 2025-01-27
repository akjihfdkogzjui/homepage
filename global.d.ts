declare global {

  namespace NodeJS {

    interface ProcessEnv {
      readonly DEPLOY_DOMAIN: string;
      readonly DEPLOY_MODE: "private" | "public";
      readonly VERCEL_DEV?: undefined | `${boolean}`;
      NEXT_PUBLIC_VERCEL_TOOLBAR_SERVER?: string;
      NEXT_PUBLIC_VERCEL_TOOLBAR_OWNER_ID?: string;
      NEXT_PUBLIC_VERCEL_TOOLBAR_PROJECT_ID?: string;
    }

  }

}

export {}

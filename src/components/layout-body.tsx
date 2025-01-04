"use client";

import { createContext, type PropsWithChildren, type FC, useState, useMemo, useContext, useLayoutEffect, type Dispatch, type SetStateAction } from "react";


export interface IPageContext {
  title: string | null;
  update: Dispatch<SetStateAction<Omit<IPageContext, "update">>>;
}

const defaultPageCtx: IPageContext = {
  title: null,
  update() {},
};

export const PageContext = createContext<IPageContext>(defaultPageCtx);

const LayoutBody: FC<PropsWithChildren> = ({ children }) => {
  const [pageState, setPageState] = useState<Omit<IPageContext, "update">>(defaultPageCtx);

  const pageCtx = useMemo<IPageContext>(() => ({ ...pageState, update: setPageState }), [pageState]);

  const { title } = pageCtx;
  
  return (
    <PageContext.Provider value={pageCtx}>
      <article className="landscape:max-w-[840px] px-8 mb-64">
        {title ? (
          <>
            <h1 className="landscape:sr-only text-foreground font-bold text-4xl">{title}</h1>
            <hr className="landscape:hidden my-6" />
          </>
        ) : null}
        {children}
      </article>
    </PageContext.Provider>
  );
};

export const useTitle = (title: IPageContext['title']): void => {
  const { update } = useContext(PageContext);

  useLayoutEffect(() => {
    update(ctx => ({ ...ctx, title }));
    return () => update(ctx => ({ ...ctx, title: null }));
  }, [update, title]);
};

export const PageTitle: FC<{ children: string }> = ({ children: title }) => {
  useTitle(title);
  return null;
};


export default LayoutBody;

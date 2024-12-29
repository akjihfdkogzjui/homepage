import type { FC, PropsWithChildren } from "react";

import NavBar from "@cp/navBar";

import profileData from "@constant/profile.json";


const ArticlePage: () => FC<PropsWithChildren> = () => {
  const ArticlePageLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
      <NavBar homeLabel={`${profileData.fullName}, ${profileData.title}`} />
      <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll scroll-style-none" id="body">
        <main className="w-full overflow-x-hidden">
          <div className="grid grid3">
            <div className="hidden landscape:block" />
            <article className="landscape:max-w-[840px] px-8 py-16 mb-8">
              {children}
            </article>
            <div className="hidden landscape:block" />
          </div>
        </main>
      </div>
    </>
  );

  return ArticlePageLayout;
};


export default ArticlePage;

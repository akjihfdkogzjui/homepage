import type { FC, PropsWithChildren } from "react";

import NavBar from "@cp/navBar";
import { font } from "@/src/theme";

import profileData from "@constant/profile.json";


const ArticlePage: () => FC<PropsWithChildren<{ title: string }>> = () => {
  const ArticlePageLayout: FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => (
    <>
      <NavBar homeLabel={`${profileData.fullName}, ${profileData.title}`} />
      <div className="relative w-full h-full my-4 overflow-x-hidden overflow-y-scroll scroll-style-none py-16" id="body">
        <h1 className={`${font.serif.className} landscape:hidden mb-12 text-5xl font-bold text-center`}>{title}</h1>
        <main className="w-full overflow-x-hidden">
          <div className="grid grid3">
            <div className="hidden landscape:block" />
            <article className="landscape:max-w-[840px] px-8 mb-64">
              <hr className="landscape:hidden" />
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

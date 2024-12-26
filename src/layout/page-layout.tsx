import type { FC, PropsWithChildren } from "react";


const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* サイドバー */}
      <aside className="bg-gray-200 w-full lg:w-1/4 p-4">
        <nav>
          <ul className="space-y-2">
            <li><a href="/" className="text-blue-500">Home</a></li>
            <li><a href="/about" className="text-blue-500">About</a></li>
            <li><a href="/contact" className="text-blue-500">Contact</a></li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
};


export default PageLayout;

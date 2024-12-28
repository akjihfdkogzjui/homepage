import ArticlePage from "@/src/layout/articlePage.client";

import Content from "@articles/papers.md";


const Layout = ArticlePage();

export default function Papers() {

  return (
    <Layout>
      <Content />
    </Layout>
  );
}

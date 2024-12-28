import ArticlePage from "@/src/layout/articlePage.client";

import Content from "@articles/projects.md";


const Layout = ArticlePage();

export default function Projects() {

  return (
    <Layout>
      <Content />
    </Layout>
  );
}

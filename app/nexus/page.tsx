import ArticlePage from "@/src/layout/articlePage.client";

import Content from "@articles/nexus.md";


const Layout = ArticlePage();

export default function Nexus() {

  return (
    <Layout title="Nexus">
      <Content />
    </Layout>
  );
}

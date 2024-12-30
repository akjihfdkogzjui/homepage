import ArticlePage from "@/src/layout/articlePage.client";

import Content from "@articles/contact.md";


const Layout = ArticlePage();

export default function Contact() {

  return (
    <Layout title="Contact">
      <Content />
    </Layout>
  );
}

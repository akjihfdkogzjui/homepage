import ArticlePage from "@/src/layout/articlePage.client";
import { publications } from "@utils/publication";
import { mdxComponents as MDX } from "@cp/mdx";
import PublicationList from "@cp/publicationList";


const Layout = ArticlePage();

export default function Publications() {
  return (
    <Layout title="Publications">
      <MDX.h2>Journal Papers</MDX.h2>
      <PublicationList publications={publications.Journal_Papers} />
      <MDX.h2>Conference Papers</MDX.h2>
      <PublicationList publications={publications.Conference_Papers} />
    </Layout>
  );
}

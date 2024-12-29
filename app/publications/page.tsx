import ArticlePage from "@/src/layout/articlePage.client";
import MDX from "@cp/mdx";
import { font } from "@/src/theme";

import profileData from "@constant/profile.json";
import _publications from "@constant/publications.json";


type PublicationInfo<T extends "conference" | "journal"> = {
  title: string;
  authors: string;
  status?: string;
  note?: string;
} & (
  T extends "conference" ? { conference: string } : { journal: string }
) & (
  { year?: number } | { date?: string }
);

interface IPublicationData {
  Journal_Papers: PublicationInfo<'journal'>[];
  Conference_Papers: PublicationInfo<'conference'>[];
}

const publications = _publications as IPublicationData;

const Layout = ArticlePage();

const authorSelfPtn = new RegExp(`${profileData.aliases.map(alias => alias.replaceAll(/\./g, '\\.')).join("|")}`);

const highlightAuthor = (origin: string): string => {
  return origin.replace(authorSelfPtn, name => `<em className="${font.serif.className} font-bold" style={{ fontSize: "108%" }}>${name}</em>`);
};

const publicationsToMDXSource = <T extends "conference" | "journal">(type: T, data: PublicationInfo<T>[]): string => {
  return `${data.map(info => {
    const timeStr = 'date' in info ? info.date : 'year' in info ? `${info.year}` : '';
    return `+ ${
      highlightAuthor(info.authors)
    }, "${
      info.title
    }", ${
      info.status ? `${info.status} in ` : ''}_${type === 'journal' ? (info as PublicationInfo<'journal'>).journal : (info as PublicationInfo<'conference'>).conference
    }_${timeStr ? `, ${timeStr}` : ''}.${
      info.note ? ` <span className="inline-block rounded-full bg-gray-100 text-gray-900 mx-1.5 px-2 py-0.5 -translate-y-[0.1rem] text-xs cursor-default">${info.note}</span>` : ''
    }`;
  }).join('\n\n')}`;
};

export default function Publications() {
  const content = `
## Journal Papers

${publicationsToMDXSource('journal', publications.Journal_Papers)}

## Conference Papers

${publicationsToMDXSource('conference', publications.Conference_Papers)}

`;

  return (
    <Layout>
      <MDX>
        {content}
      </MDX>
    </Layout>
  );
}

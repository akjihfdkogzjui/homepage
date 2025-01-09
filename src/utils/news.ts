export type ZJUNews = {
  title: string;
  head: string;
  url: string;
};

export const getZJUNews = async (): Promise<ZJUNews[]> => {
  const list: ZJUNews[] = [];

  try {
    const res = await fetch("https://zjui.intl.zju.edu.cn/en/search/node?keys=Meng+Zhang");
    const body = await res.text();
    const seg = [...body.matchAll(/<h3>\s*<a href="(?<url>.*)">\s*(?<title>.*)\s*<\/a>\s*<\/h3>(\s*<p>.s*(?<head>.*)\s*<\/p>)?/g)].map(s => s.groups);
    for (const el of seg) {
      if (el?.url?.match(/^https:\/\/zjui.intl.zju.edu.cn\/en\/news\/.*/)) {
        list.push({
          title: el.title,
          head: el.head || '',
          url: el.url,
        });
      }
    }
  } catch (error) {
    console.error("Failed to get ZJU news", error);
  }

  return list;
};

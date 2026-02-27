import { NextRequest, NextResponse } from "next/server";

const RSS_FEEDS = [
  "https://www.lemondeinformatique.fr/flux-rss/thematique/cloud/rss.xml",
  "https://www.silicon.fr/feed",
  "https://www.zdnet.fr/feeds/rss/actualites/",
];

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
};

function parseXmlTag(xml: string, tag: string): string {
  const openTag = `<${tag}`;
  const closeTag = `</${tag}>`;
  const startIdx = xml.indexOf(openTag);
  if (startIdx === -1) return "";
  const contentStart = xml.indexOf(">", startIdx) + 1;
  const endIdx = xml.indexOf(closeTag, contentStart);
  if (endIdx === -1) return "";
  let content = xml.substring(contentStart, endIdx).trim();
  // Handle CDATA
  if (content.startsWith("<![CDATA[")) {
    content = content.replace("<![CDATA[", "").replace("]]>", "");
  }
  // Strip HTML tags
  content = content.replace(/<[^>]*>/g, "").trim();
  return content;
}

function parseRSS(xml: string, source: string): FeedItem[] {
  const items: FeedItem[] = [];
  let searchFrom = 0;

  while (true) {
    const itemStart = xml.indexOf("<item", searchFrom);
    if (itemStart === -1) break;
    const itemEnd = xml.indexOf("</item>", itemStart);
    if (itemEnd === -1) break;

    const itemXml = xml.substring(itemStart, itemEnd + 7);
    const title = parseXmlTag(itemXml, "title");
    const link = parseXmlTag(itemXml, "link");
    const description = parseXmlTag(itemXml, "description");
    const pubDate = parseXmlTag(itemXml, "pubDate");

    if (title) {
      items.push({ title, link, description: description.slice(0, 200), pubDate, source });
    }

    searchFrom = itemEnd + 7;
  }

  return items;
}

export async function GET(_req: NextRequest) {
  const allItems: FeedItem[] = [];

  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (url) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          next: { revalidate: 3600 },
        });
        clearTimeout(timeout);
        if (!res.ok) return [];
        const xml = await res.text();
        const source = new URL(url).hostname.replace("www.", "");
        return parseRSS(xml, source);
      } catch {
        clearTimeout(timeout);
        return [];
      }
    })
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Sort by date descending
  allItems.sort((a, b) => {
    try {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    } catch {
      return 0;
    }
  });

  return NextResponse.json(allItems.slice(0, 30));
}

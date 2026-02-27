import { NextRequest, NextResponse } from "next/server";

const RSS_FEEDS = [
  "https://www.lemagit.fr/rss/ContentSyndication.xml",
  "https://www.silicon.fr/feed",
  "https://www.zdnet.fr/feeds/rss/actualites/",
  "https://www.itforbusiness.fr/feed",
];

const RELEVANCE_KEYWORDS = [
  "cloud", "serveur", "datacenter", "data center", "infrastructure",
  "bms", "bare metal", "hpe", "vmware", "orange", "souverain",
  "ia", "intelligence artificielle", "gpu", "nvidia", "kubernetes",
  "virtualisation", "stockage", "réseau", "sécurité", "cybersécurité",
  "sauvegarde", "backup", "linux", "windows server", "conteneur",
  "docker", "openshift", "ansible", "terraform", "devops",
  "hébergement", "hosting", "colocation", "edge", "hybrid",
  "multicloud", "saas", "iaas", "paas", "secnumcloud",
  "rgpd", "conformité", "compliance", "migration", "sap",
  "oracle", "base de données", "database", "performance",
  "scalabilité", "haute disponibilité", "disaster recovery",
  "réseau", "firewall", "load balancer", "vpn", "nsx",
];

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  imageUrl: string;
  relevant: boolean;
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

function extractImage(xml: string): string {
  // Try media:content
  const mediaMatch = xml.match(/<media:content[^>]+url=["']([^"']+)["']/);
  if (mediaMatch) return mediaMatch[1];

  // Try media:thumbnail
  const thumbMatch = xml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/);
  if (thumbMatch) return thumbMatch[1];

  // Try enclosure with image type
  const encMatch = xml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/);
  if (encMatch) return encMatch[1];

  // Try enclosure url regardless of type
  const encMatch2 = xml.match(/<enclosure[^>]+url=["']([^"']+)["']/);
  if (encMatch2) return encMatch2[1];

  // Try image tag in content
  const imgMatch = xml.match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch) return imgMatch[1];

  return "";
}

function isRelevant(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return RELEVANCE_KEYWORDS.some((kw) => text.includes(kw));
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
    const imageUrl = extractImage(itemXml);

    if (title) {
      items.push({
        title,
        link,
        description: description.slice(0, 200),
        pubDate,
        source,
        imageUrl,
        relevant: isRelevant(title, description),
      });
    }

    searchFrom = itemEnd + 7;
  }

  return items;
}

function detectEncoding(buffer: ArrayBuffer, contentType: string): string {
  // Check Content-Type header for charset
  const charsetMatch = contentType.match(/charset=([^\s;]+)/i);
  if (charsetMatch) {
    return charsetMatch[1].toLowerCase().replace(/['"]/g, "");
  }

  // Check XML declaration for encoding
  const preview = new TextDecoder("ascii").decode(buffer.slice(0, 200));
  const encodingMatch = preview.match(/encoding=["']([^"']+)["']/i);
  if (encodingMatch) {
    return encodingMatch[1].toLowerCase();
  }

  return "utf-8";
}

function decodeBuffer(buffer: ArrayBuffer, encoding: string): string {
  // Map common encoding names to TextDecoder-compatible labels
  const encodingMap: Record<string, string> = {
    "iso-8859-15": "iso-8859-15",
    "iso-8859-1": "iso-8859-1",
    "latin1": "iso-8859-1",
    "latin-1": "iso-8859-1",
    "windows-1252": "windows-1252",
    "utf-8": "utf-8",
  };

  const decoderLabel = encodingMap[encoding] || encoding;

  try {
    return new TextDecoder(decoderLabel).decode(buffer);
  } catch {
    // Fallback to utf-8 if encoding is not supported
    return new TextDecoder("utf-8").decode(buffer);
  }
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

        // Use arrayBuffer to handle non-UTF-8 encodings
        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get("content-type") || "";
        const encoding = detectEncoding(buffer, contentType);
        const xml = decodeBuffer(buffer, encoding);

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

  // Sort: relevant items first, then by date descending
  allItems.sort((a, b) => {
    if (a.relevant !== b.relevant) return a.relevant ? -1 : 1;
    try {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    } catch {
      return 0;
    }
  });

  return NextResponse.json(allItems.slice(0, 40));
}

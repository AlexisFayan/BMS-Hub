"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Newspaper,
  ExternalLink,
  Rss,
  Search,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Tag,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { staticArticles } from "@/data/news";
import { relativeTimeFr } from "@/lib/utils";

type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  imageUrl: string;
  relevanceScore: number;
};

const SOURCE_FILTERS = [
  { label: "Toutes", value: "all" },
  { label: "LeMagIT", value: "lemagit.fr" },
  { label: "Silicon", value: "silicon.fr" },
  { label: "ZDNet", value: "zdnet.fr" },
  { label: "IT for Business", value: "itforbusiness.fr" },
];

const sentimentColors = {
  positif: "bg-green-50 text-green-700",
  neutre: "bg-gray-50 text-gray-700",
  technique: "bg-blue-50 text-blue-700",
};

function RelevanceDot({ score }: { score: number }) {
  const color =
    score > 70
      ? "bg-green-500"
      : score > 40
        ? "bg-orange-400"
        : "bg-gray-300";
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${color} shrink-0`}
      title={`Pertinence : ${score}%`}
    />
  );
}

export default function NewsPage() {
  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  const fetchRss = () => {
    setRefreshing(true);
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setRssItems(data))
      .catch(() => setRssItems([]))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchRss();
  }, []);

  const filteredRss = useMemo(() => {
    let items = rssItems;
    if (sourceFilter !== "all") {
      items = items.filter((item) => item.source.includes(sourceFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q)
      );
    }
    return items;
  }, [rssItems, searchQuery, sourceFilter]);

  const highRelevance = filteredRss.filter((item) => item.relevanceScore > 60);
  const otherArticles = filteredRss.filter(
    (item) => item.relevanceScore <= 60
  );

  const veilleTechArticles = staticArticles.filter((a) => !a.isReference);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            Actualités
          </h1>
          <p className="text-muted-foreground mt-1">
            Veille technologique et actualités cloud, infrastructure et BMS.
          </p>
        </div>
        <Link href="/reference">
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Consulter la référence BMS
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="rss">
        <TabsList>
          <TabsTrigger value="rss" className="gap-2">
            <Rss className="h-3.5 w-3.5" />
            Flux RSS
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="gap-2">
            <Tag className="h-3.5 w-3.5" /> Veille Tech
          </TabsTrigger>
        </TabsList>

        {/* RSS Tab */}
        <TabsContent value="rss" className="mt-6 space-y-4">
          {/* Search + Refresh */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les actualités..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRss}
              disabled={refreshing}
              className="gap-2 shrink-0"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />
              Actualiser
            </Button>
          </div>

          {/* Source filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {SOURCE_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setSourceFilter(f.value)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  sourceFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-sm text-muted-foreground">
              {filteredRss.length} résultat{filteredRss.length !== 1 ? "s" : ""}{" "}
              pour &quot;{searchQuery}&quot;
            </p>
          )}

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3 px-4 border-b"
                >
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          ) : filteredRss.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Rss className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">
                  {searchQuery
                    ? "Aucun résultat trouvé"
                    : "Aucun article disponible"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "Essayez avec d'autres mots-clés."
                    : "Les flux RSS sont temporairement indisponibles."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* High relevance section */}
              {highRelevance.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Haute pertinence
                  </h3>
                  <div className="border rounded-lg divide-y">
                    {highRelevance.map((item, i) => (
                      <RssRow key={`high-${i}`} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other articles section */}
              {otherArticles.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Autres actualités
                  </h3>
                  <div className="border rounded-lg divide-y">
                    {otherArticles.map((item, i) => (
                      <RssRow key={`other-${i}`} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Veille Tech Tab */}
        <TabsContent value="articles" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {veilleTechArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-md transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground mt-0.5">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="font-semibold line-clamp-2 text-sm leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={sentimentColors[article.sentiment]}>
                          {article.sentiment}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {relativeTimeFr(article.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RssRow({ item }: { item: RssItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 py-3 px-4 hover:bg-muted/50 transition-colors group"
    >
      <RelevanceDot score={item.relevanceScore} />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {item.description}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">
          {item.source}
        </Badge>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {relativeTimeFr(item.pubDate)}
        </span>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  );
}

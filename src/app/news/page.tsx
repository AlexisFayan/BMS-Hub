"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Newspaper,
  ExternalLink,
  Clock,
  Tag,
  Rss,
  Search,
  Server,
  RefreshCw,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { staticArticles } from "@/data/news";

type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  imageUrl: string;
  relevant: boolean;
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const sentimentColors = {
  positif: "bg-green-50 text-green-700",
  neutre: "bg-gray-50 text-gray-700",
  technique: "bg-blue-50 text-blue-700",
};

export default function NewsPage() {
  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

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
    if (!searchQuery.trim()) return rssItems;
    const q = searchQuery.toLowerCase();
    return rssItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
    );
  }, [rssItems, searchQuery]);

  const referenceArticles = staticArticles.filter((a) => a.isReference);
  const veilleTechArticles = staticArticles.filter((a) => !a.isReference);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Newspaper className="h-6 w-6 text-primary" />
          Actualités & Référence BMS
        </h1>
        <p className="text-muted-foreground mt-1">
          Veille tech, articles de référence et documentation BMS Cloud Avenue.
        </p>
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
          <TabsTrigger value="reference" className="gap-2">
            <Server className="h-3.5 w-3.5" /> Référence BMS
          </TabsTrigger>
          <TabsTrigger value="articles" className="gap-2">
            <Tag className="h-3.5 w-3.5" /> Veille Tech
          </TabsTrigger>
        </TabsList>

        {/* RSS Tab */}
        <TabsContent value="rss" className="mt-6 space-y-4">
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

          {searchQuery && (
            <p className="text-sm text-muted-foreground">
              {filteredRss.length} résultat{filteredRss.length !== 1 ? "s" : ""}{" "}
              pour &quot;{searchQuery}&quot;
            </p>
          )}

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <Skeleton className="w-32 h-24 rounded shrink-0 hidden sm:block" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            <div className="space-y-3">
              {filteredRss.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:shadow-md transition-all group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        {item.imageUrl ? (
                          <div className="w-36 h-28 shrink-0 bg-muted overflow-hidden hidden sm:block">
                            <img
                              src={item.imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-36 h-28 shrink-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent hidden sm:flex items-center justify-center">
                            <Newspaper className="h-8 w-8 text-primary/20" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2 text-sm">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {item.source}
                                </Badge>
                                {item.relevant && (
                                  <Badge className="text-xs bg-orange-50 text-orange-700 hover:bg-orange-100">
                                    Cloud / Infra
                                  </Badge>
                                )}
                                {item.pubDate && (
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />{" "}
                                    {formatDate(item.pubDate)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </TabsContent>

        {/* BMS Reference Tab */}
        <TabsContent value="reference" className="mt-6">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Articles de référence avec les données officielles BMS Cloud
              Avenue. Cliquez pour lire le contenu détaillé.
            </p>
          </div>
          <div className="space-y-4">
            {referenceArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-md transition-all"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() =>
                      setExpandedArticle(
                        expandedArticle === article.id ? null : article.id
                      )
                    }
                    className="w-full text-left p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge
                            className={sentimentColors[article.sentiment]}
                          >
                            {article.sentiment}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <Badge className="text-xs bg-orange-50 text-orange-700">
                            Référence BMS
                          </Badge>
                        </div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <Clock className="h-3 w-3" />{" "}
                          {formatDate(article.date)}
                        </div>
                      </div>
                      <div className="shrink-0 mt-1">
                        {expandedArticle === article.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>
                  {expandedArticle === article.id && (
                    <div className="px-5 pb-5 border-t">
                      <div className="pt-4 prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-table:text-sm">
                        {article.content.split("\n").map((line, i) => {
                          if (line.startsWith("## "))
                            return (
                              <h2
                                key={i}
                                className="text-lg font-semibold mt-6 mb-3 text-foreground"
                              >
                                {line.replace("## ", "")}
                              </h2>
                            );
                          if (line.startsWith("### "))
                            return (
                              <h3
                                key={i}
                                className="text-base font-semibold mt-4 mb-2 text-foreground"
                              >
                                {line.replace("### ", "")}
                              </h3>
                            );
                          if (line.startsWith("| "))
                            return (
                              <div
                                key={i}
                                className="font-mono text-xs text-muted-foreground"
                              >
                                {line}
                              </div>
                            );
                          if (line.startsWith("- ") || line.startsWith("* "))
                            return (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground ml-4"
                              >
                                {line.replace(/^[-*] /, "")}
                              </li>
                            );
                          if (line.trim() === "") return <br key={i} />;
                          return (
                            <p
                              key={i}
                              className="text-sm text-muted-foreground leading-relaxed"
                            >
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Veille Tech Tab */}
        <TabsContent value="articles" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {(veilleTechArticles.length > 0
              ? veilleTechArticles
              : referenceArticles.slice(0, 4)
            ).map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-md transition-all"
              >
                <div className="h-36 bg-gradient-to-br from-primary/10 via-primary/5 to-accent flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-primary/30" />
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={sentimentColors[article.sentiment]}>
                      {article.sentiment}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold line-clamp-2 text-sm">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {formatDate(article.date)}
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

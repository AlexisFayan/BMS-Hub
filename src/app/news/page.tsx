"use client";

import { useState, useEffect } from "react";
import { Newspaper, ExternalLink, Clock, Tag, Rss } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { staticArticles } from "@/data/news";

type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
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

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setRssItems(data))
      .catch(() => setRssItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Newspaper className="h-6 w-6 text-primary" />
          Actualités
        </h1>
        <p className="text-muted-foreground mt-1">Dernières nouvelles tech, cloud et infrastructure.</p>
      </div>

      <Tabs defaultValue="rss">
        <TabsList>
          <TabsTrigger value="rss" className="gap-2">
            <Rss className="h-3.5 w-3.5" /> Dernières actualités
          </TabsTrigger>
          <TabsTrigger value="articles" className="gap-2">
            <Tag className="h-3.5 w-3.5" /> Analyses & Dossiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rss" className="mt-6">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <Skeleton className="h-5 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : rssItems.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Rss className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Aucun article disponible</h3>
                <p className="text-sm text-muted-foreground">
                  Les flux RSS sont temporairement indisponibles. Consultez les analyses ci-dessous.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {rssItems.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="hover:shadow-md transition-all group">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">{item.source}</Badge>
                            {item.pubDate && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" /> {formatDate(item.pubDate)}
                              </span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {staticArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all">
                <div className="h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent flex items-center justify-center">
                  <Newspaper className="h-12 w-12 text-primary/30" />
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className={sentimentColors[article.sentiment]}>{article.sentiment}</Badge>
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                  </div>
                  <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
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

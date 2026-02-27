"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Server,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { staticArticles } from "@/data/news";

const categories = [
  "Toutes",
  "Configurations",
  "Stockage",
  "Réseau",
  "Sécurité",
  "Process",
  "GPU",
  "Comparatif",
  "Systèmes",
] as const;

const categoryMapping: Record<string, string> = {
  "Guide complet": "Configurations",
  Process: "Process",
  Stockage: "Stockage",
  Architecture: "Réseau",
  "Sécurité": "Sécurité",
  "GPU & IA": "GPU",
  Benchmark: "Comparatif",
  "Systèmes": "Systèmes",
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

export default function ReferencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const referenceArticles = useMemo(
    () => staticArticles.filter((a) => a.isReference),
    []
  );

  const filteredArticles = useMemo(() => {
    let articles = referenceArticles;

    if (activeCategory !== "Toutes") {
      articles = articles.filter(
        (a) => categoryMapping[a.category] === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      );
    }

    return articles;
  }, [referenceArticles, activeCategory, searchQuery]);

  const scrollToArticle = (id: string) => {
    setExpandedArticle(id);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Référence BMS
        </h1>
        <p className="text-muted-foreground mt-1">
          Documentation de référence Bare Metal Server Cloud Avenue. Configurations, stockage, réseau, sécurité et processus.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar TOC - desktop only */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Table des matières
            </h2>
            <nav className="space-y-1">
              {referenceArticles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => scrollToArticle(article.id)}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                    expandedArticle === article.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="line-clamp-2">{article.title.split(" : ")[0]}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans la documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Results count */}
          {(searchQuery || activeCategory !== "Toutes") && (
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} trouvé{filteredArticles.length !== 1 ? "s" : ""}
              {activeCategory !== "Toutes" && ` dans "${activeCategory}"`}
              {searchQuery && ` pour "${searchQuery}"`}
            </p>
          )}

          {/* Articles */}
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Aucun article trouvé</h3>
                <p className="text-sm text-muted-foreground">
                  Essayez avec d&apos;autres mots-clés ou une autre catégorie.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => {
                const isExpanded = expandedArticle === article.id;
                return (
                  <Card
                    key={article.id}
                    id={article.id}
                    className="overflow-hidden hover:shadow-md transition-all scroll-mt-8"
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() =>
                          setExpandedArticle(isExpanded ? null : article.id)
                        }
                        className="w-full text-left p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>
                      {isExpanded && (
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
                              if (
                                line.startsWith("- ") ||
                                line.startsWith("* ")
                              )
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

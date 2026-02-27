"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Server,
  BookMarked,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { staticArticles } from "@/data/news";
import {
  markdownComponents,
  estimateReadingTime,
} from "@/components/markdown-renderers";

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

const categoryColors: Record<string, string> = {
  Configurations: "bg-blue-50 text-blue-700 border-blue-200",
  Stockage: "bg-purple-50 text-purple-700 border-purple-200",
  "Réseau": "bg-teal-50 text-teal-700 border-teal-200",
  "Sécurité": "bg-red-50 text-red-700 border-red-200",
  Process: "bg-amber-50 text-amber-700 border-amber-200",
  GPU: "bg-green-50 text-green-700 border-green-200",
  Comparatif: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Systèmes": "bg-cyan-50 text-cyan-700 border-cyan-200",
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
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Référence BMS</h1>
            <p className="text-sm text-muted-foreground">
              {referenceArticles.length} articles de documentation
            </p>
          </div>
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Documentation de référence complète pour le Bare Metal Server Cloud
          Avenue. Configurations, stockage, réseau, sécurité et processus.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar TOC - desktop only */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookMarked className="h-3.5 w-3.5" />
              Table des matières
            </h2>
            <nav className="space-y-0.5">
              {referenceArticles.map((article, idx) => (
                <button
                  key={article.id}
                  onClick={() => scrollToArticle(article.id)}
                  className={`group block w-full text-left text-[13px] px-3 py-2 rounded-md transition-all ${
                    expandedArticle === article.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="flex items-start gap-2">
                    <span className="shrink-0 text-[11px] font-mono text-muted-foreground/60 mt-px">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="line-clamp-2 leading-snug">
                      {article.title.split(" : ")[0]}
                    </span>
                  </span>
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
              {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""} trouvé
              {filteredArticles.length !== 1 ? "s" : ""}
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
                const mappedCat = categoryMapping[article.category] || "";
                const catColor =
                  categoryColors[mappedCat] ||
                  "bg-gray-50 text-gray-700 border-gray-200";
                const readTime = estimateReadingTime(article.content);

                return (
                  <Card
                    key={article.id}
                    id={article.id}
                    className={`overflow-hidden transition-all scroll-mt-8 ${
                      isExpanded
                        ? "shadow-md ring-1 ring-primary/20"
                        : "hover:shadow-md"
                    }`}
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() =>
                          setExpandedArticle(isExpanded ? null : article.id)
                        }
                        className="w-full text-left p-5 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className={`text-xs ${catColor}`}
                              >
                                {article.category}
                              </Badge>
                              <Badge className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                Référence BMS
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-base">
                              {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {article.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(article.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {readTime} min de lecture
                              </span>
                            </div>
                          </div>
                          <div
                            className={`shrink-0 mt-1 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                              isExpanded
                                ? "bg-primary/10"
                                : "bg-muted"
                            }`}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-primary" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-5 pb-6 border-t">
                          {/* Top gradient fade */}
                          <div className="h-6 bg-gradient-to-b from-muted/30 to-transparent -mx-5 px-5" />
                          <div className="max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={markdownComponents}
                            >
                              {article.content}
                            </ReactMarkdown>
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

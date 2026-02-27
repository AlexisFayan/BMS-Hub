"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Server,
  MessageSquare,
  GraduationCap,
  Newspaper,
  BookOpen,
  Shield,
  HardDrive,
  Cpu,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { modules } from "@/data/modules";
import { relativeTimeFr } from "@/lib/utils";

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  relevanceScore: number;
};

const KEY_CONFIGS = [
  { name: "XSmall-A", cores: "8c", ram: "256 Go", price: "1 302 €" },
  { name: "Small-A", cores: "16c", ram: "256 Go", price: "1 244 €" },
  { name: "Medium-B", cores: "32c", ram: "1024 Go", price: "1 566 €" },
  { name: "XL-A", cores: "64c", ram: "1024 Go", price: "1 954 €" },
  { name: "XXL-C", cores: "64c", ram: "4096 Go", price: "2 903 €" },
];

const QUICK_ACTIONS = [
  {
    label: "Poser une question",
    href: "/chat",
    icon: MessageSquare,
    bg: "bg-blue-500",
  },
  {
    label: "Consulter la référence",
    href: "/reference",
    icon: BookOpen,
    bg: "bg-orange-500",
  },
  {
    label: "Explorer les configs",
    href: "/reference",
    icon: Server,
    bg: "bg-purple-500",
  },
  {
    label: "Voir les actualités",
    href: "/news",
    icon: Newspaper,
    bg: "bg-red-500",
  },
];

const RESOURCES = [
  {
    label: "Process de commande",
    detail: "14 étapes",
    href: "/reference",
    icon: ClipboardList,
  },
  {
    label: "Stockage & IOPS",
    detail: "Classes de performance",
    href: "/reference",
    icon: HardDrive,
  },
  {
    label: "Sécurité & Compliance",
    detail: "ISO 27001, SecNumCloud",
    href: "/reference",
    icon: Shield,
  },
  {
    label: "GPU & IA",
    detail: "H100, L40s, CRAY",
    href: "/reference",
    icon: Cpu,
  },
];

export default function DashboardPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [news, setNews] = useState<FeedItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bms-completed-modules");
      if (saved) setCompletedModules(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: FeedItem[]) => {
        const relevant = data
          .filter((item) => item.relevanceScore > 50)
          .slice(0, 4);
        setNews(relevant);
        setNewsLoading(false);
      })
      .catch(() => setNewsLoading(false));
  }, []);

  const progressPercent = Math.round(
    (completedModules.length / modules.length) * 100
  );

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Bienvenue sur BMS Hub</h1>
        <p className="text-muted-foreground mt-1">
          Votre plateforme de référence Bare Metal Server Cloud Avenue
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/reference">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-orange-200 bg-orange-50/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">
                    Configurations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/chat">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200 bg-blue-50/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold">Chat IA</p>
                  <p className="text-xs text-muted-foreground">Expert BMS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/education">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200 bg-green-50/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">
                    Modules Formation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/news">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-red-200 bg-red-50/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Newspaper className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold">Live</p>
                  <p className="text-xs text-muted-foreground">
                    Actualités
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main 2-col Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Accès Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_ACTIONS.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex flex-col items-center gap-2 rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer text-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.bg} text-white`}
                      >
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">
                        {action.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* BMS Configs Preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-4 w-4 text-orange-500" />
                Configurations BMS Gen11
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-left py-2 font-medium">Modèle</th>
                      <th className="text-left py-2 font-medium">Cœurs</th>
                      <th className="text-left py-2 font-medium">RAM</th>
                      <th className="text-right py-2 font-medium">Prix/mois</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KEY_CONFIGS.map((cfg) => (
                      <tr key={cfg.name} className="border-b last:border-0">
                        <td className="py-2.5 font-medium">{cfg.name}</td>
                        <td className="py-2.5">
                          <Badge variant="secondary" className="text-xs">
                            {cfg.cores}
                          </Badge>
                        </td>
                        <td className="py-2.5 text-muted-foreground">
                          {cfg.ram}
                        </td>
                        <td className="py-2.5 text-right font-medium text-orange-600">
                          {cfg.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link
                href="/reference"
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 mt-4 font-medium"
              >
                Voir toutes les configurations
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Latest News */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-red-500" />
                Dernières Actualités
              </CardTitle>
            </CardHeader>
            <CardContent>
              {newsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : news.length > 0 ? (
                <div className="divide-y">
                  {news.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-2.5 hover:bg-muted/50 transition-colors -mx-1 px-1 rounded"
                    >
                      <span
                        className={`inline-block h-2 w-2 rounded-full shrink-0 ${
                          item.relevanceScore > 70
                            ? "bg-green-500"
                            : "bg-orange-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1 leading-snug">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0"
                          >
                            {item.source}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">
                            {relativeTimeFr(item.pubDate)}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Pas d&apos;actualités pertinentes pour le moment.
                </p>
              )}
              <Link
                href="/news"
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 mt-4 font-medium"
              >
                Voir toutes les actualités
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Formation Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-green-500" />
                Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {completedModules.length} / {modules.length} modules
                    complétés
                  </span>
                  <span className="font-medium">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                {progressPercent === 100 ? (
                  <p className="text-sm text-green-600 font-medium">
                    Formation complétée !
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {modules.length - completedModules.length} modules restants
                  </p>
                )}
              </div>
              <Link
                href="/education"
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mt-4 font-medium"
              >
                Continuer la formation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Resources */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Ressources clés
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {RESOURCES.map((res) => (
            <Link key={res.label} href={res.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <res.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {res.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {res.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

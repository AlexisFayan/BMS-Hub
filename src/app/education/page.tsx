"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Clock, ArrowRight, CheckCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { modules } from "@/data/modules";

function getIcon(name: string) {
  const LucideIcons = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return LucideIcons[name] || Icons.BookOpen;
}

export default function EducationPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bms-completed-modules");
      if (saved) setCompletedModules(JSON.parse(saved));
    } catch {}
  }, []);

  const progressPercent = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Formation BMS
          </h1>
          <p className="text-muted-foreground mt-1">15 modules pour devenir expert Bare Metal Server.</p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-2">
          <div className="text-right">
            <p className="text-sm font-medium">{completedModules.length}/{modules.length} modules</p>
            <p className="text-xs text-muted-foreground">{progressPercent}% complété</p>
          </div>
          <Progress value={progressPercent} className="w-24 h-2" />
        </div>
      </div>

      <div className="grid gap-4">
        {modules.map((mod) => {
          const Icon = getIcon(mod.icon);
          const isCompleted = completedModules.includes(mod.id);

          return (
            <Link key={mod.id} href={`/education/${mod.id}`}>
              <Card className="hover:shadow-md transition-all group">
                <CardContent className="p-5 flex items-center gap-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isCompleted ? "bg-green-50 text-green-600" : "bg-primary/10 text-primary"}`}>
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold truncate">Module {mod.id} — {mod.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{mod.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="text-xs">{mod.level}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {mod.duration}
                      </span>
                      {isCompleted && <Badge variant="secondary" className="text-xs bg-green-50 text-green-600">Complété</Badge>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

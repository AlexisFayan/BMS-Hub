"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, GraduationCap, CheckCircle, Clock, Trophy, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { modules } from "@/data/modules";

export default function DashboardPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bms-completed-modules");
      if (saved) setCompletedModules(JSON.parse(saved));
    } catch {}
  }, []);

  const progressPercent = Math.round((completedModules.length / modules.length) * 100);
  const recentModules = modules.slice(0, 4);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Suivez votre progression et accédez rapidement à vos outils.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedModules.length}/{modules.length}</p>
                <p className="text-xs text-muted-foreground">Modules complétés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedModules.length * 3}</p>
                <p className="text-xs text-muted-foreground">Quiz réussis</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">—</p>
                <p className="text-xs text-muted-foreground">Conversations IA</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedModules.length * 20} min</p>
                <p className="text-xs text-muted-foreground">Temps de formation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Progression de formation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{completedModules.length} sur {modules.length} modules complétés</span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            {progressPercent === 100 && (
              <p className="text-sm text-green-600 font-medium">Félicitations ! Vous avez complété toute la formation.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions + Recent modules */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/chat" className="block">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageSquare className="h-4 w-4 text-primary" />
                Poser une question au Chat IA
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
            <Link href="/education" className="block">
              <Button variant="outline" className="w-full justify-start gap-3">
                <GraduationCap className="h-4 w-4 text-primary" />
                Continuer la formation
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modules récents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentModules.map((mod) => (
              <Link key={mod.id} href={`/education/${mod.id}`} className="flex items-center justify-between py-2 hover:bg-muted/50 rounded-lg px-3 -mx-3 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{mod.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {completedModules.includes(mod.id) ? (
                    <Badge variant="secondary" className="text-green-600 bg-green-50 text-xs">Complété</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">À faire</Badge>
                  )}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

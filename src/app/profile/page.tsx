"use client";

import { useState, useEffect } from "react";
import { User, Building2, Save, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { modules } from "@/data/modules";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [bmsLevel, setBmsLevel] = useState("debutant");
  const [notifications, setNotifications] = useState(true);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bms-completed-modules");
      if (saved) setCompletedModules(JSON.parse(saved));
      const profile = localStorage.getItem("bms-profile");
      if (profile) {
        const p = JSON.parse(profile);
        setFullName(p.fullName || "");
        setTeam(p.team || "");
        setRole(p.role || "");
        setBmsLevel(p.bmsLevel || "debutant");
        setNotifications(p.notifications ?? true);
      }
    } catch {}
  }, []);

  const handleSave = () => {
    const profile = { fullName, team, role, bmsLevel, notifications };
    localStorage.setItem("bms-profile", JSON.stringify(profile));
    toast({ title: "Profil sauvegardé", description: "Vos informations ont été mises à jour." });
  };

  const progressPercent = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Profil
        </h1>
        <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et préférences.</p>
      </div>

      {/* Avatar card */}
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{fullName || user?.email || "Utilisateur"}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{bmsLevel === "debutant" ? "Débutant" : bmsLevel === "intermediaire" ? "Intermédiaire" : "Expert"}</Badge>
              <Badge variant="secondary" className="text-xs">{progressPercent}% formation</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Informations personnelles
          </CardTitle>
          <CardDescription>Vos informations au sein d&apos;Orange Business.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Prénom Nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team">Équipe</Label>
              <Input id="team" value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Ex: Cloud Infra" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ex: Ingénieur Cloud" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMS Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Niveau BMS
          </CardTitle>
          <CardDescription>Évaluez votre familiarité avec les Bare Metal Servers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={bmsLevel} onValueChange={setBmsLevel}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="debutant">Débutant — Je découvre les BMS</SelectItem>
              <SelectItem value="intermediaire">Intermédiaire — Je connais les bases</SelectItem>
              <SelectItem value="expert">Expert — J&apos;ai une expérience approfondie</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Préférences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-xs text-muted-foreground">Recevoir des notifications sur les nouveaux modules et actualités.</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}

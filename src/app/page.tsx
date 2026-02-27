"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Server, MessageSquare, GraduationCap, Newspaper, ArrowRight, CheckCircle, Zap, Shield, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Chat IA Expert BMS",
    description: "Un assistant IA spécialisé pour répondre à toutes vos questions sur les Bare Metal Servers.",
  },
  {
    icon: GraduationCap,
    title: "Formation complète",
    description: "15 modules de formation couvrant tous les aspects des BMS, du débutant à l'expert.",
  },
  {
    icon: Newspaper,
    title: "Actualités tech",
    description: "Restez informé des dernières nouvelles cloud, infrastructure et BMS.",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Accédez à la documentation technique complète sur l'infrastructure BMS Cloud Avenue.",
  },
];

const steps = [
  { number: "1", title: "Créez votre compte", description: "Inscrivez-vous avec votre email Orange Business." },
  { number: "2", title: "Suivez les formations", description: "Progressez à travers les 15 modules sur les BMS." },
  { number: "3", title: "Posez vos questions", description: "Utilisez le chat IA pour approfondir vos connaissances." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Server className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">BMS Hub</span>
          </div>
          <Link href="/login">
            <Button>Connexion</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-8">
              <Zap className="h-3.5 w-3.5" />
              Orange Business — Cloud Avenue
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              BMS Hub — Votre plateforme de référence{" "}
              <span className="text-primary">Bare Metal Server</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Formation, documentation et assistant IA pour maîtriser les BMS chez Orange Business Cloud Avenue.
              La plateforme tout-en-un pour votre onboarding et montée en compétences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Commencer <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">En savoir plus</Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une plateforme complète pour former les nouveaux collaborateurs et servir de référence BMS.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-muted-foreground">En 3 étapes simples</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Rejoignez BMS Hub et devenez expert Bare Metal Server chez Orange Business.
            </p>
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Commencer maintenant <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Server className="h-4 w-4" />
            BMS Hub — Orange Business Cloud Avenue
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Orange Business. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

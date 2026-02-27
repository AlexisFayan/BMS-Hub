"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server, MessageSquare, BookOpen, GraduationCap, Newspaper,
  ArrowRight, Shield, Cpu, HardDrive, Globe, Lock, BarChart3,
  Zap, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const contextStats = [
  { value: "15", label: "Configurations Gen11" },
  { value: "2", label: "Datacenters France" },
  { value: "SecNumCloud", label: "en cours (ANSSI)" },
  { value: "HPE Synergy 480", label: "Gen11" },
];

const pillars = [
  {
    icon: BookOpen,
    title: "Référence Technique",
    description:
      "Documentation exhaustive : 15 configurations détaillées, process de commande, stockage IOPS, architecture réseau, sécurité et compliance.",
    accent: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: MessageSquare,
    title: "Assistant IA Expert",
    description:
      "Posez n'importe quelle question sur le BMS. Notre IA connaît toutes les configs, prix, procédures et spécifications techniques.",
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Newspaper,
    title: "Actualités Live",
    description:
      "Flux RSS en temps réel sur le cloud, l'infrastructure et le bare metal. Restez informé des dernières tendances et évolutions.",
    accent: "bg-red-500/10 text-red-600",
  },
  {
    icon: GraduationCap,
    title: "Formation Complète",
    description:
      "15 modules de formation avec quiz, couvrant de l'introduction au BMS jusqu'aux architectures avancées et GPU.",
    accent: "bg-green-500/10 text-green-600",
  },
];

const previewConfigs = [
  { name: "XSmall-A", cores: "8 cœurs", ram: "256 Go", price: "1 302" },
  { name: "Small-B", cores: "16 cœurs", ram: "512 Go", price: "1 303" },
  { name: "Medium-B", cores: "32 cœurs", ram: "1024 Go", price: "1 566" },
  { name: "XL-A", cores: "64 cœurs", ram: "1024 Go", price: "1 954" },
  { name: "XXL-C", cores: "64 cœurs", ram: "4096 Go", price: "2 903" },
];

const topics = [
  {
    icon: CheckCircle,
    title: "Process de commande",
    detail: "14 étapes détaillées",
    accent: "bg-orange-500/10 text-orange-600 group-hover:bg-orange-500/20",
  },
  {
    icon: HardDrive,
    title: "Stockage & classes IOPS",
    detail: "Gold, Platinum 2K/3K/7K",
    accent: "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20",
  },
  {
    icon: Globe,
    title: "Réseau & connectivité",
    detail: "NSX-T, VPN, BVPN",
    accent: "bg-purple-500/10 text-purple-600 group-hover:bg-purple-500/20",
  },
  {
    icon: Lock,
    title: "Sécurité & compliance",
    detail: "SecNumCloud, ISO 27001",
    accent: "bg-green-500/10 text-green-600 group-hover:bg-green-500/20",
  },
  {
    icon: Cpu,
    title: "GPU & Intelligence Artificielle",
    detail: "H100, L40s, CRAY",
    accent: "bg-red-500/10 text-red-600 group-hover:bg-red-500/20",
  },
  {
    icon: BarChart3,
    title: "Benchmark vs concurrence",
    detail: "OVH, AWS, Oracle",
    accent: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20",
  },
];

const faqs = [
  {
    question: "Qu'est-ce que BMS Hub ?",
    answer:
      "BMS Hub est la plateforme de référence interne d'Orange Business pour tout ce qui concerne le Bare Metal Server chez Cloud Avenue. Elle centralise la documentation technique complète, un assistant IA expert, les actualités en temps réel et 15 modules de formation avec quiz.",
  },
  {
    question: "Quelles informations puis-je trouver ?",
    answer:
      "Vous trouverez les 15 configurations Gen11 détaillées avec prix, les spécifications de stockage (classes IOPS), le process de commande en 14 étapes, l'architecture réseau (NSX-T, VPN, BVPN), la sécurité et compliance (SecNumCloud, ISO 27001), les benchmarks vs concurrence, les configs GPU pour l'IA, et bien plus.",
  },
  {
    question: "Le chatbot IA est-il fiable ?",
    answer:
      "Oui. L'assistant IA est alimenté avec l'intégralité des données officielles Cloud Avenue : les 15 configurations avec prix exacts, les classes de stockage IOPS, les OS supportés, le process de commande, l'architecture réseau et sécurité. Il fournit des réponses précises basées sur la documentation officielle.",
  },
  {
    question: "Comment commander un BMS ?",
    answer:
      "Le processus suit 14 étapes : sélection de la configuration sur Cloudstore, création du ticket SWAN par les L2 Ops, assignation du serveur, configuration YAML poussée sur Git, configuration réseau NSX par le LAN Team, provisioning Ansible par l'IAT, et distribution des credentials via CyberArk. Le module 7 de la formation détaille chaque étape.",
  },
  {
    question: "Quels OS sont supportés sur Gen11 ?",
    answer:
      "Windows Server 2019/2022 (2025 en cours), Red Hat Enterprise Linux 8.x/9.x, SUSE Linux Enterprise Server 15 SP5 (SP6 en cours), Oracle Linux 9.x, et Ubuntu Server 22.04/24.04 LTS. La politique BYOL (Bring Your Own License) s'applique pour les OS non listés.",
  },
  {
    question: "BMS Hub est-il réservé aux employés Orange ?",
    answer:
      "Oui, BMS Hub est une plateforme interne destinée aux employés d'Orange Business, notamment les équipes techniques, les commerciaux et tout collaborateur intervenant sur l'offre Cloud Avenue Bare Metal Server.",
  },
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
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-orange-500/3 blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-36 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              BMS Hub
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium mb-4">
              La plateforme de référence{" "}
              <span className="text-primary">Bare Metal Server</span>{" "}
              Cloud Avenue
            </p>
            <p className="text-base lg:text-lg text-muted-foreground mb-10 max-w-2xl">
              Documentation technique, assistant IA expert, actualités en temps réel
              et formation — tout ce dont vous avez besoin pour maîtriser le BMS.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2 text-base px-8">
                  Accéder au Hub <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Explorer les configurations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Context Bar */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>Plateforme interne Orange Business — Cloud Avenue</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {contextStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-lg font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tout le BMS en un seul endroit
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-all duration-200 border-border/60">
                  <CardContent className="p-6">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg mb-4 ${pillar.accent}`}
                    >
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurations Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Des configurations pour chaque besoin
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De 8 à 64 cœurs, de 256 Go à 4 To de RAM — HPE Synergy 480 Gen11,
              Intel Xeon 5ème génération.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-border/60">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left font-medium text-muted-foreground py-3 px-6">
                        Modèle
                      </th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-6">
                        CPU
                      </th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-6">
                        RAM
                      </th>
                      <th className="text-right font-medium text-muted-foreground py-3 px-6">
                        Prix/mois
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewConfigs.map((config, i) => (
                      <tr
                        key={config.name}
                        className={`border-b border-border/50 ${
                          i % 2 === 0 ? "" : "bg-muted/20"
                        }`}
                      >
                        <td className="py-3 px-6 font-medium">
                          bms.gen11.{config.name}
                        </td>
                        <td className="py-3 px-6 text-muted-foreground">
                          {config.cores}
                        </td>
                        <td className="py-3 px-6 text-muted-foreground">
                          {config.ram}
                        </td>
                        <td className="py-3 px-6 text-right font-semibold text-primary">
                          {config.price} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-border/50 bg-muted/20">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Voir les 15 configurations <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Topics */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explorez par thématique
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href="/login">
                  <Card className="group h-full hover:shadow-md transition-all duration-200 cursor-pointer border-border/60 hover:border-border">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${topic.accent}`}
                      >
                        <topic.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm">{topic.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {topic.detail}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/50 ml-auto shrink-0 group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Server className="h-4 w-4" />
            BMS Hub — Plateforme de référence Bare Metal Server
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>2 datacenters France</span>
            <span className="text-border">|</span>
            <span>ISO 27001</span>
            <span className="text-border">|</span>
            <span>SecNumCloud en cours</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Orange Business — Cloud Avenue
          </p>
        </div>
      </footer>
    </div>
  );
}

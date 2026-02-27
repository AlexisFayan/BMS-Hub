"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server, MessageSquare, GraduationCap, Newspaper, ArrowRight,
  CheckCircle, Zap, Shield, Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const stats = [
  { value: "15", label: "Configurations Gen11" },
  { value: "5", label: "Familles (XS→XXL)" },
  { value: "8→64", label: "Coeurs CPU" },
  { value: "4 To", label: "RAM max" },
];

const features = [
  {
    icon: MessageSquare,
    title: "Chat IA Expert",
    description: "Un assistant IA enrichi avec TOUTES les données BMS : configs, prix, stockage, réseau, process de commande.",
  },
  {
    icon: GraduationCap,
    title: "15+ Modules Formation",
    description: "Formation complète avec les vraies données Cloud Avenue : 15 modules, quiz interactifs, progression trackée.",
  },
  {
    icon: Newspaper,
    title: "Actualités Live",
    description: "Flux RSS en direct des meilleures sources tech françaises : LMI, Silicon, ZDNet.",
  },
  {
    icon: Cpu,
    title: "Configurations Complètes",
    description: "Les 15 configs Gen11 détaillées avec CPU, RAM, prix — plus les configs GPU H100/L40s et Gen10 legacy.",
  },
];

const steps = [
  { number: "1", title: "Créez votre compte", description: "Inscrivez-vous avec votre email Orange Business en quelques secondes." },
  { number: "2", title: "Suivez les formations", description: "Progressez à travers les 15 modules couvrant tous les aspects BMS Cloud Avenue." },
  { number: "3", title: "Posez vos questions", description: "Utilisez le chat IA expert pour obtenir des réponses précises et techniques." },
];

const faqs = [
  {
    question: "Qu'est-ce qu'un Bare Metal Server (BMS) ?",
    answer: "Un BMS est un serveur physique 100% dédié, mono-tenant, sans aucune couche de virtualisation. Chez Cloud Avenue, les BMS sont basés sur HPE Synergy 480 Gen11 avec des processeurs Intel Xeon 5ème génération.",
  },
  {
    question: "Combien de configurations BMS Gen11 sont disponibles ?",
    answer: "15 configurations réparties en 5 familles : XSmall (8 coeurs), Small (16 coeurs), Medium (32 coeurs), XL (64 coeurs) et XXL (64 coeurs, RAM étendue jusqu'à 4 To). Les prix vont de 1 244 €/mois à 2 903 €/mois.",
  },
  {
    question: "Quels sont les avantages de Cloud Avenue vs les concurrents ?",
    answer: "Cloud Avenue est le seul fournisseur offrant +1 To de RAM pour moins de 3 000 €/mois. Les Gen11 offrent +30% de performances vs Gen10, le meilleur prix/Go RAM du marché, et la configuration CRAY 8xH100 est unique en France.",
  },
  {
    question: "Les données sont-elles hébergées en France ?",
    answer: "Oui, exclusivement dans 2 datacenters en France (Val de Reuil et Chartres, à 100 km de distance). Certifications ISO 27001, RGPD, SecNumCloud en cours (ANSSI). Aucun transfert de données hors UE.",
  },
  {
    question: "Comment commander un BMS ?",
    answer: "Le process suit 14 étapes impliquant le client (sélection sur Cloudstore), les L2 Ops (ticket SWAN, config YAML), le LAN Team (réseau NSX), et l'IAT (provisioning Ansible). Les credentials sont distribués via CyberArk.",
  },
  {
    question: "Quels OS sont supportés sur Gen11 ?",
    answer: "Windows Server 2019/2022, RHEL 8.x/9.x, SUSE Linux Enterprise 15 SP5, Oracle Linux 9.x, Ubuntu Server 22.04/24.04. Windows Server 2025 et d'autres versions sont en cours de validation. Politique BYOL pour les OS non listés.",
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
              BMS Hub — La référence{" "}
              <span className="text-primary">Bare Metal Server</span>{" "}
              Cloud Avenue
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Formation, documentation et assistant IA pour maîtriser les serveurs dédiés chez Orange Business.
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

      {/* Stats */}
      <section className="py-12 border-y border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une plateforme complète pour former les nouveaux collaborateurs et servir de référence BMS Cloud Avenue.
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
      <section className="py-24 bg-muted/30">
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

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-muted-foreground">Les réponses aux questions les plus courantes sur les BMS Cloud Avenue.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
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
              Rejoignez BMS Hub et devenez expert Bare Metal Server chez Orange Business Cloud Avenue.
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
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>2 datacenters France</span>
            <span>ISO 27001</span>
            <span>SecNumCloud en cours</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Orange Business. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

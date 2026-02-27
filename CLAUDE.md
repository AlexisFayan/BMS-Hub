# BMS Hub - Plateforme Formation Bare Metal Server

## Mission
Créer un projet complet from scratch : plateforme de formation et onboarding pour les nouveaux employés sur le Bare Metal Server (BMS) chez Orange Business Cloud Avenue.

## Contexte métier
- **Orange Business** — division Cloud Avenue
- **BMS = Bare Metal Server** — serveurs physiques dédiés dans le cloud Orange
- **But** : Former les nouveaux employés, être la plateforme de référence pour toute question BMS
- **Public** : Nouveaux arrivants et employés existants chez Orange Business

## Stack
- **Frontend:** Next.js (dernière version stable) + TypeScript + shadcn/ui + Tailwind CSS
- **Backend/DB:** Supabase (PostgreSQL) + Auth Supabase (email/password)
- **IA Chatbot:** OpenRouter API
- **Déploiement:** Vercel-ready

## Config (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://bjtilfdftjmdgiipdhsz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_uz1fANtU8pMzxeFtppcI6w_ngr70KyM
OPENROUTER_API_KEY=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

## Design
- **Minimaliste clean light** — style Linear, Vercel
- Fond blanc/gris très clair
- Accent : orange subtil (rappel Orange Business) — utiliser orange-500/600 comme couleur d'accent
- Beaucoup de whitespace
- shadcn/ui thème par défaut avec accent orange
- Light mode uniquement
- Animations minimales (framer-motion)

## Pages à créer

### 1. Landing Page (/)
- Hero : "BMS Hub — Votre plateforme de référence Bare Metal Server"
- Sous-titre : "Formation, documentation et assistant IA pour maîtriser les BMS chez Orange Business Cloud Avenue"
- Features : Chat IA, Formation, Actualités, Documentation
- Comment ça marche en 3 étapes
- CTA "Commencer" → /login

### 2. Login (/login)
- Auth Supabase (email/password, inscription)
- Design Orange Business vibes

### 3. Chat IA (/chat)
- Interface style Claude (sidebar conversations, suggestions, markdown)
- System prompt : "Tu es un expert Bare Metal Server (BMS) chez Orange Business Cloud Avenue. Tu aides les employés à comprendre l'infrastructure BMS, les procédures, le provisioning, le monitoring, la maintenance, le réseau, le stockage, et toutes les questions techniques liées aux serveurs physiques dédiés. Sois pédagogue, précis et concret. Réponds en français."
- Suggestions rapides :
  - "C'est quoi un Bare Metal Server ?"
  - "Comment provisionner un nouveau BMS ?"
  - "Quelle est la différence entre BMS et VM ?"
  - "Comment monitorer un BMS ?"
  - "Les SLA et garanties BMS"
  - "Architecture réseau BMS"
- Historique sauvé en Supabase
- Streaming OpenRouter

### 4. Formation (/education)
- Modules d'apprentissage sur le BMS :
  1. Introduction au Bare Metal Server
  2. Architecture BMS chez Orange Business
  3. Cloud Avenue : l'écosystème
  4. Provisioning et déploiement BMS
  5. Réseau et connectivité BMS
  6. Stockage et volumes
  7. Monitoring et observabilité
  8. Sécurité et compliance
  9. Maintenance et mises à jour
  10. SLA, support et escalade
  11. BMS vs VM vs Container
  12. Cas d'usage clients
  13. Outils internes et dashboards
  14. Bonnes pratiques opérationnelles
  15. Onboarding checklist nouveau collaborateur
- Chaque module : contenu texte + quiz interactif
- Progression sauvée en Supabase
- Page détail module (/education/[id])

### 5. Actualités (/news)
- Section "Dernières actualités" avec RSS live (tech/cloud/infra)
- Sources RSS :
  - https://www.lemondeinformatique.fr/flux-rss/thematique/cloud/rss.xml
  - https://www.silicon.fr/feed
  - https://www.zdnet.fr/feeds/rss/actualites/
- Articles statiques "Analyses & Dossiers" sur le BMS
- Images + sentiment tags
- Fallback gradient si image cassée

### 6. Dashboard (/dashboard)
- Progression formation (modules complétés / total)
- Stats : conversations, quiz réussis, temps de formation
- Modules récents
- Quick actions

### 7. Profil (/profile)
- Infos personnelles
- Rôle / équipe chez Orange Business
- Préférences
- Questionnaire de familiarité BMS (débutant / intermédiaire / expert)

## Sidebar
- Logo "BMS Hub" avec icône Server
- Navigation : Dashboard, Chat IA, Formation, Actualités, Profil
- Accent orange
- User info en bas

## Contenu des modules de formation
Crée du contenu RÉALISTE et TECHNIQUE sur les Bare Metal Servers :
- Qu'est-ce qu'un BMS (vs VM, container)
- Avantages : performance, isolation, compliance, latence
- Cas d'usage : HPC, base de données, gaming, IA/ML
- Provisioning : IPMI/iLO, PXE boot, DHCP, TFTP
- Réseau : VLAN, bonding, BGP, load balancing
- Stockage : RAID, SAN, NAS, NVMe
- Monitoring : Prometheus, Grafana, SNMP, alerting
- Sécurité : firmware updates, secure boot, HSM, network segmentation
- SLA : 99.95% uptime, RTO/RPO, support 24/7
- Cloud Avenue spécifiques : portail, API, catalogue de services

## Exigences
- npm run build DOIT passer sans erreur
- Toutes les pages fonctionnelles
- Auth Supabase opérationnel
- Chatbot qui répond via OpenRouter
- Code propre, bien structuré
- Supabase client safe (pas de crash quand env vars absentes au build)
- tsconfig: noImplicitAny: false

When completely finished, run:
openclaw system event --text "Done: BMS Hub built - Next.js + shadcn + Supabase + OpenRouter. All pages created, build OK." --mode now

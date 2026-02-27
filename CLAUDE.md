# BMS Hub - Plateforme Formation & Référence Bare Metal Server Cloud Avenue

## 🎯 Mission
Refondre COMPLÈTEMENT le site BMS Hub en intégrant les VRAIES données issues de 8 documents officiels Orange Business Cloud Avenue. Le site doit être une plateforme de référence exhaustive, complète et professionnelle pour tout ce qui concerne le Bare Metal Server chez Cloud Avenue.

## Contexte métier
- **Orange Business** — division Cloud Avenue
- **BMS = Bare Metal Server** — serveurs physiques dédiés dans le cloud Orange
- **Cloud Avenue** = offre IaaS d'Orange Business, 2 datacenters en France (Val de Reuil & Chartres)
- **But** : Former les employés, être LA référence pour toute question BMS/Cloud Avenue
- **Public** : Employés Orange Business, équipes techniques, commerciaux

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
- **Minimaliste clean light** — style Linear, Vercel, Stripe
- Fond blanc/gris très clair
- Accent : orange subtil (rappel Orange Business) — utiliser orange-500/600 comme couleur d'accent
- Beaucoup de whitespace
- shadcn/ui thème par défaut avec accent orange
- Light mode uniquement
- Animations subtiles (framer-motion)
- Icônes Lucide React
- Responsive mobile-first

---

## 📋 DONNÉES OFFICIELLES À INTÉGRER

### ═══════════════════════════════════════════
### CONFIGURATIONS BMS Gen11 (15 configs HPE Synergy 480 Gen11)
### ═══════════════════════════════════════════

| Modèle | CPU | Cœurs | RAM | Prix/mois |
|--------|-----|-------|-----|-----------|
| bms.gen11.Xsmall-A | 1x Intel Xeon Gold 6534 3.9-4.2 GHz (8c/16T) | 8 | 256 Go | 1 302 € |
| bms.gen11.Xsmall-B | 1x Intel Xeon Gold 6534 3.9-4.2 GHz (8c/16T) | 8 | 512 Go | 1 362 € |
| bms.gen11.Xsmall-C | 1x Intel Xeon Gold 6534 3.9-4.2 GHz (8c/16T) | 8 | 768 Go | 1 421 € |
| bms.gen11.small-A | 1x Intel Xeon Gold 6526Y 2.8-3.9 GHz (16c/32T) | 16 | 256 Go | 1 244 € |
| bms.gen11.small-B | 1x Intel Xeon Gold 6526Y 2.8-3.9 GHz (16c/32T) | 16 | 512 Go | 1 303 € |
| bms.gen11.small-C | 1x Intel Xeon Gold 6526Y 2.8-3.9 GHz (16c/32T) | 16 | 768 Go | 1 362 € |
| bms.gen11.medium-A | 1x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (32c/64T) | 32 | 512 Go | 1 448 € |
| bms.gen11.medium-B | 1x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (32c/64T) | 32 | 1024 Go | 1 566 € |
| bms.gen11.medium-C | 1x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (32c/64T) | 32 | 1536 Go | 1 755 € |
| bms.gen11.xl-A | 2x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (64c/128T) | 64 | 1024 Go | 1 954 € |
| bms.gen11.xl-B | 2x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (64c/128T) | 64 | 1536 Go | 2 072 € |
| bms.gen11.xl-C | 2x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (64c/128T) | 64 | 2048 Go | 2 190 € |
| bms.gen11.xxl-A | 2x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (64c/128T) | 64 | 2048 Go | 2 336 € |
| bms.gen11.xxl-B | 2x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (64c/128T) | 64 | 3072 Go | 2 619 € |
| bms.gen11.xxl-C | 2x Intel Xeon Gold 6548Y+ 2.5-4.1 GHz (64c/128T) | 64 | 4096 Go | 2 903 € |

### Configs Gen10 (legacy, en fin de vie)
| Modèle | Génération | CPU | RAM + Disques | Upgrade RAM |
|--------|-----------|-----|---------------|-------------|
| bms.hc1.XLarge | HPE SY480 Gen10 | 2x Intel Gold 6248R 3.0GHz - 48c | 576 GB + 4 disks 1.92 TB | → 768 GB |
| bms.hp1.Medium | HPE SY480 Gen10 | 2x Intel Gold 5218 2.3GHz - 32c | 384 GB + 4 disks 1.92 TB | → 576/768 GB |
| bms.db1.Small | HPE SY480 Gen10 | 1x Intel Gold 5218 2.3GHz - 16c | 192 GB + 4 disks 1.92 TB | → 384 GB |
| bms.db1.XSmall | HPE SY480 Gen10 | 2x Intel Gold 5222 3.8GHz - 8c | 192 GB + NVMe Disks | - |

### Config GPU (IA/ML)
| Modèle | CPU | RAM | GPU | Prix/mois |
|--------|-----|-----|-----|-----------|
| bms.cray | 8xH100 | 72 cœurs | 4096 Go + 8x NVIDIA H100 NVL 94GB SXM | 20 397 € |
| BMS 4xH100 | - | - | 4x NVIDIA H100 NVL | Sur devis |
| BMS L40s | - | - | 2-4x NVIDIA L40s | Sur devis |

---

### ═══════════════════════════════════════════
### SYSTÈMES D'EXPLOITATION SUPPORTÉS (Gen11)
### ═══════════════════════════════════════════

**Processeur : 5th Gen Intel® Xeon® (HPE Synergy 480 Gen11)**

| OS | Versions supportées (✅) | Versions en cours (🟡) |
|----|--------------------------|------------------------|
| **Windows Server** | 2019, 2022 | 2025 |
| **Red Hat Enterprise Linux** | 9.2, 9.3, 8.8, 8.9, 8.10 | 9.4, 9.5, 9.1, 8.0 |
| **SUSE Linux Enterprise Server** | 15 SP5 | 15 SP6 |
| **Oracle Linux** | 9.3 (UEK7u2), 9.4 (UEK7u2) | 9.5 (UEK7u3) |
| **Ubuntu Server** | 22.04.3 LTS, 22.04.4 LTS, 22.04.5 LTS, 24.04 LTS | 24.04.1 LTS, 24.04.2 LTS |

**Note :** BYOL (Bring Your Own License) uniquement pour les OS non listés.

---

### ═══════════════════════════════════════════
### STOCKAGE
### ═══════════════════════════════════════════

#### Disque Système (System LUN)
| Classe | IOPS/To | Taille | IOPS Min–Max |
|--------|---------|--------|--------------|
| Gold | 800 | 500 Go – 10 To | 1 000 – 8 000 |
| Platinum 2K | 1 400 | 500 Go – 10 To | 1 000 – 14 000 |
| Platinum 3K | 3 400 | 500 Go – 10 To | 1 700 – 34 000 |

#### Disque de Données (Data LUN)
| Classe | IOPS/To | Taille | IOPS Min–Max |
|--------|---------|--------|--------------|
| Unformatted (Oracle RAC/ASM) | 480 | 1 TB – 10 To | 1 000 – 4 800 |
| Gold | 800 | 1 TB – 10 To | 1 000 – 8 000 |
| Platinum 2K | 2 400 | 1 TB – 10 To | 2 400 – 24 000 |
| Platinum 7K | 5 600 | 500 Go – 10 To | 5 600 – 56 000 |

**Minimum garanti : 1 000 IOPS** sur tous les disques.
**Stockage réseau** (NAS/NFS) également disponible via portail.
**Disques NVMe locaux** intégrés sur certains modèles pour cache applicatif haute performance.

#### Stockage Bloc (vDC)
| Classe | IOPS/To |
|--------|---------|
| Silver | 600 |
| Gold | 1 000 |
| Platinum 3K | 3 000 |
| Platinum 7K | 7 000 |

#### Stockage Objet (Scality)
- Compatible API S3
- Durabilité 99,999999999% (11 nines)
- Scalabilité pétaoctets
- Conformité RGPD

#### Stockage Réseau (NetApp)
- SVM dédiée par client
- Réplication bi-site (RPO 15 min)
- Gestion snapshots
- Portail self-service (NFS v3, SMB/CIFS)
- À partir de 500 Go
- Tarifs : Entrée 0,04€/Go, Milieu 0,0689€/Go, Haut 0,1184€/Go

---

### ═══════════════════════════════════════════
### RÉSEAU ET CONNECTIVITÉ
### ═══════════════════════════════════════════

- **NSX-T** pour virtualisation réseau (SDN)
- **Passerelle T0** spécifique par BMS → connexion organisation client
- **Firewall** : règles NAT, pare-feu, Load Balancer applicables au BMS
- **VLAN** privé créé lors de l'installation BMS
- **Connectivité** :
  - Serveur de rebond (VM) via SSH/RDP
  - VPN IPsec et L2VPN (sans frais)
  - VPN SSL
  - Cross Connect (lien L3 vers colocation)
  - BVPN Orange (réseau MPLS 220 pays)
  - Internet Tier One (AS5511 Orange)
- **AVI Load Balancer** VMware : L4/L7, WAF, analytics, à partir de 310€/mois (20 VIP)
- **Anti-DDoS** de plateforme inclus

#### Tarif Internet Sortant
| Volume | Prix/Go/mois |
|--------|-------------|
| 0-15 Go | Offert |
| 15 Go - 1 To | 0,08 € |
| 1-5 To | 0,07 € |
| 5-10 To | 0,06 € |
| 10-100 To | 0,055 € |
| > 100 To | 0,05 € |

---

### ═══════════════════════════════════════════
### PROCESS DE COMMANDE BMS (14 étapes)
### ═══════════════════════════════════════════

1. **VLAN ranges provisioning** (DNT/2IM) - uniquement premier BMS du tenant
2. **Customer** : Sélectionne config hardware sur Cloudstore/Changeweb
3. **L2 Ops** : Crée ticket SWAN (BSS-ID, DC, server type, BIOS config, OS, storage, IP scheme)
4. **L2 Ops** : Request for server(s) dans HPE/NGP referential
5. **L2 Ops** : Server(s) assigned to customer
6. **BSS Team** : Usage Collector activé
7. **L2 Ops** : Assign server in referential
8. **L2 Ops** : Create BMS config file (YAML)
9. **L2 Ops** : Push YAML to Git repository
10. **LAN Team** : Configure BMS connectivity to T1 (NSX) + Assign BMS VLAN (uniquement premier BMS)
11. **IAT** : Start BMS provisioning (Ansible) → Config LUN, Config BMS, OS & config, Register CMDB, Activate monitoring
12. **Greenlake Collector** : Detect BMS switched on
13. **BSS Team** : Usage Collector notifications
14. **L2 Ops** : BMS Welcome Mail → Customer
15. **Credentials** via CyberArk

#### Paramètres de provisioning
- BSS Contract ID, Tenant Type, Storage config
- System disk (min 500 GB), Service Class
- Data disks (1-6+), taille et classe chacun
- Network design, Customer Tenant T1 name
- BMS IP/prefix, Gateway IP, VLAN ID, Hostname
- BIOS config (workload profiles : GPC, GFC, GTC, VPE, VMX, LOW, CRI, TAP, HPC, DSN, GPU, IOT, CTM)
- OS choice + version, Flavour, Generation

---

### ═══════════════════════════════════════════
### SAUVEGARDE
### ═══════════════════════════════════════════

1. **Agent NetBackup** : déployé dans l'OS, connecté à l'infra de sauvegarde Cloud Avenue. Exclusion/inclusion fichiers. Zone de boot non sauvegardable.
2. **Backup local** : installé par le client (ex: RMAN pour Oracle). Espace stockage backup = 2x stockage principal.
- Technologie : Veritas NetBackup (leader Gartner)
- Snapshot VMware via vCenter (sans agent pour VMs)
- Récupération granulaire (fichiers individuels → systèmes entiers)
- Tarif compétitif, pas de coût de restauration (contrairement AWS/Azure)
- Prix : ~0,035€/Go

---

### ═══════════════════════════════════════════
### SÉCURITÉ ET COMPLIANCE
### ═══════════════════════════════════════════

- **Datacenters** : 2 sites en France (Val de Reuil + Chartres), 100km de distance
- **Certifications** : ISO 27001, RGPD, SecNumCloud **en cours** (ANSSI)
- **iLO** : administration distante sécurisée via proxy HTTPS, règles d'accès filtrées par sous-réseau
- **Zoning SAN** et VLAN pour isolation physique
- **Chiffrement** AES-256, option HSM
- **Micro-segmentation** via NSX-T (pare-feu distribué stateful)
- **Souveraineté** : données hébergées en France, droit français, conformité européenne
- **Anti-DDoS** de plateforme
- **CyberArk** pour gestion des credentials

---

### ═══════════════════════════════════════════
### SERVICES CLOUD AVENUE (vue d'ensemble)
### ═══════════════════════════════════════════

| Service | Description |
|---------|-------------|
| **Virtual Datacenter (vDC)** | Pool de ressources virtualisées (CPU, RAM, stockage), 4 classes : Eco, Standard, High Performance, VoIP |
| **Dedicated Cluster** | Serveurs physiques privatisés, VMware VCF, stockage dédié |
| **vCenter On Demand (VCoD)** | Cloud privé dédié par client, vCenter + vSAN + NSX dédiés, 81 combinaisons configs |
| **Bare Metal Server** | Serveur physique 100% dédié, 15 configs Gen11 |
| **BMS GPU** | Serveurs dédiés avec GPU NVIDIA H100/L40s pour IA/ML |
| **Stockage Bloc/Objet/Réseau** | Multiples classes de performance |
| **Sauvegarde** | Veritas NetBackup, recovery granulaire |
| **DRaaS** | Disaster Recovery avec VMware VCDA |
| **Cross Connect** | Lien L3 vers colocation datacenter |
| **Load Balancer** | AVI VMware, L4/L7, WAF inclus |
| **Kubernetes (KaaS)** | OpenShift as a Service, Tanzu |
| **Accès Internet** | Tier One Orange (AS5511) |
| **BVPN** | Réseau MPLS entreprise (220 pays) |

---

### ═══════════════════════════════════════════
### BENCHMARK CONCURRENTIEL BMS
### ═══════════════════════════════════════════

**Avantages CAV vs concurrents :**
- Seul fournisseur avec +1 To RAM pour < 3 000€/mois
- Gen11 = +30% perf vs Gen10 (CPU Intel Xeon 5ème gen vs 2ème gen chez OVH)
- Certifié SAP HANA (XXL)
- Meilleur prix/Go RAM du marché (vs OVH, AWS, Oracle, IBM)
- Prix/core CPU compétitif vs Oracle et AWS
- BMS GPU : 17% meilleures performances qu'OVH pour GenAI
- Configuration unique CRAY 8xH100 — seule plateforme dispo sur marché français
- Données hébergées en France, SecNumCloud en cours
- Pas de "noisy neighbor" — isolation physique totale

**Points faibles :**
- SLA 99,95% (vs certains concurrents)
- Supervision en cours de mise en place
- Customer journey à améliorer
- Pare-feu distribué ne s'applique pas au BMS

---

### ═══════════════════════════════════════════
### CAS D'USAGE
### ═══════════════════════════════════════════

1. **Bases de données in-memory** (SAP HANA) — BMS XXL certifié
2. **Applications critiques non virtualisables**
3. **Optimisation licences logicielles** (Oracle, SAP)
4. **IA / Machine Learning** (GPU H100, L40s)
5. **Analytics massives** et Big Data
6. **Conformité forte** (santé, secteur public, bancaire)
7. **HPC** (High Performance Computing)
8. **Migration SAP ECC → SAP HANA** (fin ancien système SAP 2027)

---

### ═══════════════════════════════════════════
### TARIFICATION ET FACTURATION
### ═══════════════════════════════════════════

- Facturation **mensuelle** par composant (serveur, stockage, réseau, licence)
- Premier mois au **prorata temporis**
- **Pas d'engagement** de durée (BMS standards)
- Réservation longue durée = tarif dégressif (sur devis)
- Try & Buy / credit voucher pour PoC
- Suivi consommation via portail Cloud Store
- API Usage Collector pour reporting billing

---

## 📄 PAGES À CRÉER / REFONDRE

### 1. Landing Page (/)
- Hero impactant : "BMS Hub — La référence Bare Metal Server Cloud Avenue"
- Sous-titre : "Formation, documentation et assistant IA pour maîtriser les serveurs dédiés chez Orange Business"
- Stats chiffrées : 15 configurations, 5 familles (XS→XXL), 8→64 cœurs, jusqu'à 4 To RAM
- Features cards avec icônes : Chat IA Expert, 15+ Modules Formation, Actualités Live, Configurations Complètes
- Section "Comment ça marche" en 3 étapes
- Section FAQ avec accordion
- Footer professionnel
- CTA "Commencer" → /login

### 2. Login (/login)
- Auth Supabase (email/password, inscription)
- Design Orange Business clean

### 3. Chat IA (/chat)
- Interface type Claude/ChatGPT (sidebar conversations, suggestions, markdown rendering)
- System prompt ENRICHI avec TOUTES les données ci-dessus (configs, prix, specs, process, storage, réseau)
- Le chatbot doit pouvoir répondre précisément sur :
  - Toutes les 15 configs Gen11 avec prix
  - Les specs stockage (classes IOPS, tailles)
  - Le process de commande (14 étapes)
  - Les OS supportés
  - La sécurité et compliance
  - Les benchmarks vs concurrence
  - Réseau et connectivité
- Suggestions rapides mises à jour :
  - "Quelles sont les 15 configurations BMS Gen11 ?"
  - "Comment commander un nouveau BMS ?"
  - "Quel stockage choisir pour mon BMS ?"
  - "BMS vs VM vs Container ?"
  - "Quels OS sont supportés Gen11 ?"
  - "Architecture réseau BMS"
  - "BMS GPU pour l'IA"
  - "Benchmarks BMS vs OVH/AWS"
- Streaming OpenRouter

### 4. Formation (/education)
REFONDRE COMPLÈTEMENT les modules avec les VRAIES données :

**Module 1 : Introduction au Bare Metal Server**
- Définition : serveur physique 100% dédié, mono-tenant, sans virtualisation
- Performance brute, zéro noisy neighbor
- Intégration native réseau Cloud Avenue
- Position dans l'offre Cloud Avenue (vs vDC, Dedicated Cluster, VCoD)

**Module 2 : L'écosystème Cloud Avenue**
- 2 datacenters France (Val de Reuil, Chartres)
- Services : vDC, Dedicated Cluster, VCoD, BMS, BMS GPU, Stockage, Sauvegarde, DRaaS, KaaS
- Technologie VMware (VCD 10.5, NSX-T, vSAN)
- SecNumCloud en cours, ISO 27001, RGPD
- PUE 1.3, éco-conception

**Module 3 : Catalogue des configurations BMS Gen11**
- Les 15 configs en détail (tableau complet avec CPU, cœurs, RAM, prix)
- 5 familles : XSmall, Small, Medium, XL, XXL
- Processeurs Intel Xeon 5ème génération
- HPE Synergy 480 Gen11
- Configs Gen10 (legacy) pour référence
- BMS GPU (H100, L40s, CRAY)

**Module 4 : Systèmes d'exploitation supportés**
- Matrice OS complète Gen11
- Windows Server 2019/2022 (2025 en cours)
- RHEL 8.x/9.x
- SUSE Linux Enterprise 15 SP5/SP6
- Oracle Linux 9.x
- Ubuntu Server 22.04/24.04
- Politique BYOL

**Module 5 : Stockage BMS en détail**
- System LUN vs Data LUN
- Classes de performance (Gold, Platinum 2K/3K/7K, Unformatted)
- IOPS garantis (tableaux complets)
- Stockage SAN dédié
- Disques NVMe locaux (cache)
- Stockage réseau (NAS/NFS)
- Stockage objet (Scality S3)

**Module 6 : Réseau et connectivité**
- Architecture NSX-T (Gateway T0/T1)
- VLAN BMS
- Firewall stateful distribué
- VPN (IPsec, L2VPN, SSL)
- Cross Connect
- BVPN (MPLS 220 pays)
- Internet Tier One Orange
- AVI Load Balancer (L4/L7, WAF)
- Anti-DDoS

**Module 7 : Processus de commande et provisioning**
- Les 14 étapes détaillées
- Acteurs impliqués (Customer, L2 Ops, LAN Team, IAT, BSS)
- Outils : Cloudstore, SWAN, HPE OneView, GitLab, Ansible, CyberArk
- Paramètres de provisioning (BSS-ID, BIOS config, OS, stockage, réseau)
- BIOS Workload Profiles (GPC, GFC, VPE, VMX, LOW, CRI, etc.)
- Template de demande de provisioning

**Module 8 : Sauvegarde et reprise d'activité**
- Agent NetBackup (Veritas)
- Backup local (RMAN pour Oracle)
- Dimensionnement (backup = 2x stockage principal)
- Recovery granulaire
- DRaaS avec VMware VCDA
- Snapshot VMware

**Module 9 : Sécurité et compliance**
- Datacenters France (Val de Reuil + Chartres)
- SecNumCloud (ANSSI en cours)
- ISO 27001, RGPD
- Isolation physique (zoning SAN, VLAN)
- iLO sécurisé via proxy HTTPS
- Chiffrement AES-256, HSM
- Micro-segmentation NSX-T
- CyberArk credentials
- Souveraineté données

**Module 10 : BMS GPU pour l'IA/ML**
- Configs GPU : CRAY 8xH100, 4xH100, L40s
- Use cases : inférence, RAG, fine-tuning
- Performances : 40 tokens/sec (CAV 4xH100) vs <30 (OVH)
- OS disponibles : Ubuntu, RedHat (drivers CUDA préinstallés)
- Cluster Infiniband possible
- Benchmark vs OVH/concurrence

**Module 11 : Cas d'usage et positionnement**
- SAP HANA (BMS XXL certifié, fin SAP ECC 2027)
- Oracle (BMS XSmall optimisé)
- IA/ML (GPU H100/L40s)
- HPC, analytics massives
- Conformité forte (santé, public, bancaire)
- Benchmark vs OVH, AWS, Oracle, IBM, Scaleway, Cloud Temple

**Module 12 : Tarification et facturation**
- Grille tarifaire complète (15 configs + GPU)
- Facturation mensuelle par composant
- Prorata premier mois
- Pas d'engagement (standards)
- Options : réservation longue durée, Try & Buy
- Stockage : tarifs par classe
- Internet sortant : paliers de prix
- API Usage Collector

**Module 13 : Architecture technique détaillée (HLD)**
- HPE Synergy 480 Gen11
- Racking plan
- Architecture SAN
- Architecture IP Storage
- Architecture réseau
- Automation (Ansible, GitLab, YAML)
- Monitoring (Shinken/Zabbix)
- Dual Site (Stretched VLAN)
- Disaster Recovery Plan

**Module 14 : Services managés et support**
- Support 24/7
- SLA 99,95%
- Services managés (OS, sécurité, backup, monitoring)
- Prestations d'accompagnement et d'expertise
- Escalade et résolution
- Portails : VCD, Espace Client Cloud, Cloud Store

**Module 15 : Onboarding checklist**
- Checklist nouveau collaborateur BMS
- Outils à connaître
- Contacts clés
- Documentation de référence
- Parcours de formation recommandé

Chaque module DOIT avoir :
- Contenu riche et détaillé (minimum 800-1000 mots par module)
- Tableaux de données quand pertinent
- Quiz interactif (5 questions par module, basées sur les VRAIES données)
- Icône et couleur distinctive

### 5. Actualités (/news)
- Section "Dernières actualités" avec **vrais RSS live** :
  - https://www.lemondeinformatique.fr/flux-rss/thematique/cloud/rss.xml
  - https://www.silicon.fr/feed
  - https://www.zdnet.fr/feeds/rss/actualites/
- Les articles DOIVENT avoir des images (extraire des RSS ou fallback gradient)
- Section "Analyses & Dossiers" avec articles statiques BMS/Cloud
- Refresh button
- Skeleton loading
- Tags de sentiment (positif/négatif/neutre)
- Design card-based avec images

### 6. Dashboard (/dashboard)
- Progression formation (modules complétés / 15)
- Stats : conversations chat, quiz réussis, score moyen
- Modules récents avec aperçu
- Quick actions cards
- Graphique de progression
- Barre de progression globale

### 7. Profil (/profile)
- Infos personnelles
- Rôle / équipe chez Orange Business
- Niveau BMS (débutant/intermédiaire/expert)
- Préférences
- Statistiques personnelles

## Sidebar
- Logo "BMS Hub" avec icône Server (orange)
- Navigation : Dashboard, Chat IA, Formation, Actualités, Profil
- Accent orange-500
- User info en bas + logout

## System Prompt du Chatbot (ENRICHI)
Le chatbot DOIT inclure dans son system prompt TOUTES les données de ce document :
- Les 15 configs Gen11 avec prix
- Les configs Gen10
- Les configs GPU
- Les classes de stockage avec IOPS
- Les OS supportés
- Le process de commande
- L'architecture réseau
- Les benchmarks concurrentiels
- Les cas d'usage
- La sécurité et compliance
- La tarification

Le prompt doit commencer par :
"Tu es l'expert BMS (Bare Metal Server) de Cloud Avenue, la plateforme cloud d'Orange Business. Tu connais PARFAITEMENT toutes les configurations, les prix, les procédures, le stockage, le réseau, la sécurité et l'architecture BMS. Tu réponds en français de manière précise, technique et pédagogue. Voici ta base de connaissances complète : [toutes les données]"

## Exigences techniques
- `npm run build` DOIT passer sans erreur
- Toutes les pages fonctionnelles et remplies de contenu réel
- Auth Supabase opérationnel
- Chatbot fonctionnel avec streaming OpenRouter
- RSS news fonctionnel avec vraies images
- Code propre, bien structuré, TypeScript
- Supabase client safe (pas de crash quand env vars absentes au build)
- tsconfig: noImplicitAny: false
- next.config : remotePatterns pour les domaines d'images RSS
- Responsive design
- Framer-motion animations subtiles

## Quand c'est terminé
Quand TOUT est fini (build OK, contenu complet, toutes les pages) :
```
openclaw system-event --text "Done: BMS Hub v2 COMPLET - 15 modules formation avec vraies données, chatbot expert enrichi, RSS news live, 15 configs Gen11, process commande, stockage, réseau, sécurité. Build OK." --mode now
```

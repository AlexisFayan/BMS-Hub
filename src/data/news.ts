export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  sentiment: "positif" | "neutre" | "technique";
  isReference?: boolean;
};

export const staticArticles: Article[] = [
  {
    id: "guide-configs-gen11",
    title: "Les 15 configurations BMS Gen11 Cloud Avenue : guide complet",
    description:
      "Toutes les configurations HPE Synergy 480 Gen11 avec CPU Intel Xeon 5ème génération, RAM et tarifs mensuels détaillés.",
    content: `Cloud Avenue propose 15 configurations Bare Metal Server Gen11, toutes basées sur la plateforme HPE Synergy 480 Gen11 équipée de processeurs Intel Xeon de 5ème génération. Voici le guide complet pour choisir la bonne configuration.

## Les 5 familles de configurations

Les BMS Gen11 se déclinent en 5 familles, de XSmall à XXL, chacune disponible en 3 variantes (A, B, C) qui diffèrent par la quantité de RAM.

### XSmall — 8 cœurs (mono-socket)
Processeur : 1x Intel Xeon Gold 6534 à 3.9-4.2 GHz (8 cœurs / 16 threads). Idéal pour les charges de travail nécessitant une fréquence élevée mais peu de cœurs, comme Oracle Database avec licensing par cœur.

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.Xsmall-A | 256 Go | 1 302 € |
| bms.gen11.Xsmall-B | 512 Go | 1 362 € |
| bms.gen11.Xsmall-C | 768 Go | 1 421 € |

### Small — 16 cœurs (mono-socket)
Processeur : 1x Intel Xeon Gold 6526Y à 2.8-3.9 GHz (16 cœurs / 32 threads). Bon compromis entre nombre de cœurs et coût pour les applications standards : serveurs web, middleware, bases de données de taille moyenne.

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.small-A | 256 Go | 1 244 € |
| bms.gen11.small-B | 512 Go | 1 303 € |
| bms.gen11.small-C | 768 Go | 1 362 € |

### Medium — 32 cœurs (mono-socket)
Processeur : 1x Intel Xeon Gold 6548Y+ à 2.5-4.1 GHz (32 cœurs / 64 threads). Pour les charges de travail exigeantes en parallélisme : applications Java multi-threadées, analyses Big Data, compilations massives.

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.medium-A | 512 Go | 1 448 € |
| bms.gen11.medium-B | 1 024 Go | 1 566 € |
| bms.gen11.medium-C | 1 536 Go | 1 755 € |

### XL — 64 cœurs (bi-socket)
Processeur : 2x Intel Xeon Gold 6548Y+ à 2.5-4.1 GHz (64 cœurs / 128 threads). Conçu pour les bases de données in-memory volumineuses et les applications critiques nécessitant beaucoup de RAM et de puissance CPU.

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.xl-A | 1 024 Go | 1 954 € |
| bms.gen11.xl-B | 1 536 Go | 2 072 € |
| bms.gen11.xl-C | 2 048 Go | 2 190 € |

### XXL — 64 cœurs, mémoire massive (bi-socket)
Processeur : 2x Intel Xeon Gold 6548Y+ (64 cœurs / 128 threads). La gamme premium pour SAP HANA et les bases in-memory géantes. Jusqu'à 4 To de RAM — certifié SAP HANA.

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.xxl-A | 2 048 Go | 2 336 € |
| bms.gen11.xxl-B | 3 072 Go | 2 619 € |
| bms.gen11.xxl-C | 4 096 Go | 2 903 € |

## Points clés

- **Meilleur prix/Go RAM du marché** : Cloud Avenue est le seul fournisseur proposant plus d'1 To de RAM pour moins de 3 000 €/mois
- **+30% de performances** par rapport à la Gen10 grâce aux processeurs Intel Xeon 5ème génération
- **Certifié SAP HANA** sur les configurations XXL
- **Pas d'engagement de durée** en standard — facturation mensuelle
- **Prorata temporis** sur le premier mois

## Configurations GPU (IA/ML)

En complément, Cloud Avenue propose des BMS GPU :
- **bms.cray** : 8x NVIDIA H100 NVL 94 Go SXM, 72 cœurs, 4 096 Go RAM — 20 397 €/mois (configuration unique en France)
- **BMS 4xH100** : 4x NVIDIA H100 NVL — sur devis
- **BMS L40s** : 2-4x NVIDIA L40s — sur devis

## Configurations Gen10 (legacy)

Toujours disponibles mais en fin de vie : bms.hc1.XLarge (48c, 576 Go), bms.hp1.Medium (32c, 384 Go), bms.db1.Small (16c, 192 Go), bms.db1.XSmall (8c, 192 Go + NVMe).`,
    date: "2025-03-01",
    category: "Guide complet",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "process-commande-14-etapes",
    title: "Process de commande BMS : les 14 étapes expliquées",
    description:
      "De la sélection de la configuration à la réception du Welcome Mail, chaque étape du provisioning BMS détaillée avec les acteurs impliqués.",
    content: `Commander un Bare Metal Server chez Cloud Avenue implique un processus structuré en 14 étapes, impliquant plusieurs équipes (Customer, L2 Ops, LAN Team, IAT, BSS Team). Voici le détail complet.

## Vue d'ensemble du process

Le provisioning d'un BMS prend en compte le hardware (HPE Synergy 480), le stockage (SAN), le réseau (NSX-T, VLAN), l'OS et le monitoring. L'automatisation repose sur Ansible, GitLab et des fichiers YAML de configuration.

## Les 14 étapes en détail

### Étape 1 — VLAN ranges provisioning (DNT/2IM)
Uniquement pour le premier BMS d'un tenant. L'équipe DNT/2IM provisionne les plages VLAN qui seront utilisées par les BMS du client dans le datacenter.

### Étape 2 — Sélection configuration (Customer)
Le client sélectionne la configuration hardware souhaitée sur le portail Cloudstore ou Changeweb : modèle de serveur, quantité de RAM, options de stockage, OS.

### Étape 3 — Création ticket SWAN (L2 Ops)
L'équipe L2 Ops crée un ticket SWAN contenant toutes les informations : BSS-ID, datacenter (Val de Reuil ou Chartres), type de serveur, configuration BIOS, OS choisi, stockage requis, schéma IP.

### Étape 4 — Demande de serveur (L2 Ops)
L2 Ops effectue une request for server dans le référentiel HPE/NGP pour réserver un serveur physique disponible correspondant à la configuration demandée.

### Étape 5 — Assignation serveur (L2 Ops)
Le serveur physique est assigné au client dans le référentiel. Le numéro de série, l'emplacement rack et les caractéristiques sont enregistrés.

### Étape 6 — Activation Usage Collector (BSS Team)
L'équipe BSS active le collecteur d'usage pour la facturation. Cela permet de tracker la consommation dès la mise en service du BMS.

### Étape 7 — Assignation dans le référentiel (L2 Ops)
L2 Ops assigne le serveur dans le référentiel interne, liant le serveur physique au contrat client et au tenant.

### Étape 8 — Création fichier config YAML (L2 Ops)
L2 Ops crée le fichier de configuration YAML contenant tous les paramètres de provisioning : stockage (system LUN + data LUNs), réseau (IP, gateway, VLAN), BIOS workload profile, OS et version.

### Étape 9 — Push YAML sur Git (L2 Ops)
Le fichier YAML est poussé sur le repository GitLab. C'est ce fichier qui sera lu par l'automatisation Ansible.

### Étape 10 — Configuration réseau (LAN Team)
L'équipe LAN configure la connectivité BMS vers le T1 (NSX) et assigne le VLAN BMS. Cette étape est requise uniquement pour le premier BMS du tenant.

### Étape 11 — Provisioning automatisé (IAT)
L'équipe IAT lance le provisioning Ansible qui exécute automatiquement : configuration des LUNs de stockage, configuration du BMS, installation et configuration de l'OS, enregistrement dans la CMDB, activation du monitoring.

### Étape 12 — Détection power-on (Greenlake Collector)
Le collecteur HPE Greenlake détecte que le BMS a été mis sous tension et enregistre l'événement.

### Étape 13 — Notifications Usage Collector (BSS Team)
L'équipe BSS vérifie que le Usage Collector envoie correctement les notifications de consommation pour la facturation.

### Étape 14 — Welcome Mail (L2 Ops → Customer)
L2 Ops envoie le Welcome Mail au client avec les informations de connexion. Les credentials sont transmis via CyberArk pour des raisons de sécurité.

## Paramètres de provisioning

Chaque BMS nécessite les paramètres suivants :
- **Identifiants** : BSS Contract ID, Tenant Type
- **Stockage** : System disk (min 500 Go) avec classe de service, Data disks (1 à 6+) avec taille et classe chacun
- **Réseau** : Customer Tenant T1 name, BMS IP/prefix, Gateway IP, VLAN ID, Hostname
- **BIOS** : Workload profiles disponibles — GPC (General Purpose Compute), GFC (General Flexible Compute), GTC, VPE, VMX, LOW, CRI, TAP, HPC, DSN, GPU, IOT, CTM
- **OS** : Choix du système d'exploitation + version, Flavour, Génération

## Outils utilisés

Cloudstore, Changeweb, SWAN (tickets), HPE OneView (hardware), GitLab (fichiers YAML), Ansible (automatisation), CyberArk (credentials), Shinken/Zabbix (monitoring).`,
    date: "2025-02-20",
    category: "Process",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "stockage-classes-performance",
    title:
      "Stockage BMS : choisir la bonne classe de performance (Gold, Platinum 2K/3K/7K)",
    description:
      "Comparaison détaillée des classes de stockage BMS : IOPS garantis, tailles, System LUN vs Data LUN, et tarification.",
    content: `Le stockage est un composant critique du BMS. Cloud Avenue propose plusieurs classes de performance pour les disques système et les disques de données, avec des IOPS garantis. Voici comment choisir.

## Architecture de stockage BMS

Chaque BMS est connecté à un SAN (Storage Area Network) dédié avec zoning pour l'isolation physique. Le stockage se divise en deux catégories :

- **System LUN** : disque système contenant l'OS et les applications
- **Data LUN** : disques de données pour les bases de données, fichiers applicatifs, etc.

## Classes de performance — System LUN

| Classe | IOPS/To | Taille | IOPS Min–Max |
|--------|---------|--------|--------------|
| Gold | 800 | 500 Go – 10 To | 1 000 – 8 000 |
| Platinum 2K | 1 400 | 500 Go – 10 To | 1 000 – 14 000 |
| Platinum 3K | 3 400 | 500 Go – 10 To | 1 700 – 34 000 |

## Classes de performance — Data LUN

| Classe | IOPS/To | Taille | IOPS Min–Max |
|--------|---------|--------|--------------|
| Unformatted (Oracle RAC/ASM) | 480 | 1 To – 10 To | 1 000 – 4 800 |
| Gold | 800 | 1 To – 10 To | 1 000 – 8 000 |
| Platinum 2K | 2 400 | 1 To – 10 To | 2 400 – 24 000 |
| Platinum 7K | 5 600 | 500 Go – 10 To | 5 600 – 56 000 |

**Minimum garanti : 1 000 IOPS sur tous les disques**, quel que soit la taille ou la classe.

## Comment choisir sa classe ?

### Gold (800 IOPS/To)
Pour les charges de travail standards avec des besoins I/O modérés : serveurs web, applications métier classiques, fichiers partagés. Bon rapport coût/performance.

### Platinum 2K (1 400 - 2 400 IOPS/To)
Pour les bases de données transactionnelles (PostgreSQL, MySQL, SQL Server) avec des patterns d'accès mixtes lecture/écriture. Recommandé pour la plupart des charges de production.

### Platinum 3K (3 400 IOPS/To, System LUN uniquement)
Pour les OS et applications nécessitant des temps de démarrage et d'accès rapides. Idéal pour les serveurs avec boot rapide critique.

### Platinum 7K (5 600 IOPS/To, Data LUN uniquement)
Pour les bases de données in-memory avec spillover disque, les caches applicatifs, et les workloads OLTP haute performance. SAP HANA, Oracle avec heavy I/O.

### Unformatted (Data LUN uniquement)
Spécifiquement conçu pour Oracle RAC/ASM qui gère lui-même le formatage et l'accès aux blocs. 480 IOPS/To avec un minimum de 1 000 IOPS.

## Autres options de stockage

### Disques NVMe locaux
Certains modèles BMS intègrent des disques NVMe locaux pour le cache applicatif haute performance. Latence ultra-faible (< 100 μs) mais pas de réplication SAN.

### Stockage réseau (NAS/NFS — NetApp)
- SVM dédiée par client
- Réplication bi-site avec RPO 15 minutes
- Gestion des snapshots
- Portail self-service (NFS v3, SMB/CIFS)
- À partir de 500 Go
- Tarifs : Entrée 0,04 €/Go, Milieu 0,0689 €/Go, Haut 0,1184 €/Go

### Stockage objet (Scality)
Compatible API S3, durabilité 99,999999999% (11 nines), scalabilité pétaoctets, conformité RGPD.

### Stockage Bloc (vDC)
Disponible en classes Silver (600 IOPS/To), Gold (1 000 IOPS/To), Platinum 3K (3 000 IOPS/To) et Platinum 7K (7 000 IOPS/To).

## Dimensionnement recommandé

Pour le backup, prévoir un espace de stockage backup = 2x le stockage principal. L'agent NetBackup (Veritas) est déployé dans l'OS pour la sauvegarde. La zone de boot n'est pas sauvegardable.`,
    date: "2025-02-15",
    category: "Stockage",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "bms-vs-vm-vs-container",
    title: "BMS vs VM vs Container : quel choix pour quel usage ?",
    description:
      "Guide de décision complet pour choisir entre Bare Metal Server, machine virtuelle (vDC) et container (KaaS) sur Cloud Avenue.",
    content: `Cloud Avenue propose trois modèles de compute : le Bare Metal Server (BMS), le Virtual Datacenter (vDC, VMs) et le Kubernetes as a Service (KaaS, containers). Chacun répond à des besoins différents.

## Comparaison rapide

| Critère | BMS | vDC (VM) | KaaS (Container) |
|---------|-----|----------|-------------------|
| Isolation | Physique (mono-tenant) | Logique (hyperviseur) | Namespace |
| Performance | Native, maximale | Overhead hyperviseur (~5-10%) | Overhead container (~1-3%) |
| Scaling | Manuel (commande nouveau BMS) | Rapide (minutes) | Automatique (secondes) |
| Licensing | Optimisé (cœurs physiques) | Standard | Par pod/node |
| Administration | Client (OS complet) | Partagée | Managé |
| Coût d'entrée | ~1 244 €/mois | Quelques dizaines €/mois | Variable |

## Quand choisir un BMS ?

### 1. Bases de données in-memory (SAP HANA)
SAP HANA nécessite un accès direct à la mémoire physique sans couche d'hyperviseur. Les BMS XXL (jusqu'à 4 To RAM) sont certifiés SAP HANA. Avec la fin de SAP ECC annoncée pour 2027, la migration vers SAP HANA sur BMS est un cas d'usage majeur.

### 2. Optimisation des licences logicielles
Oracle et SAP facturent par cœur physique. Sur un BMS, vous contrôlez exactement le nombre de cœurs et évitez le surcoût lié aux facteurs de licence des hyperviseurs. Un BMS XSmall avec 8 cœurs physiques peut réduire le coût de licence Oracle de 30% par rapport à une VM.

### 3. Applications critiques non virtualisables
Certaines applications legacy ou certifiées nécessitent un accès direct au hardware. Le BMS offre cette garantie avec zéro couche d'abstraction.

### 4. Conformité stricte
Secteur bancaire, santé, secteur public : l'isolation physique (zoning SAN, VLAN dédié) garantit qu'aucune autre organisation ne partage le même matériel. Pas de "noisy neighbor".

### 5. IA/ML avec GPU
Les BMS GPU (H100, L40s, CRAY 8xH100) offrent un accès direct aux GPU NVIDIA pour l'entraînement et l'inférence de modèles d'IA. Performance 40 tokens/sec sur CAV 4xH100 vs < 30 chez OVH.

## Quand choisir un vDC (VM) ?

- Applications web standards avec scaling horizontal
- Environnements de développement et de test
- Workloads avec besoin de scaling rapide (minutes)
- Budget limité (entrée de gamme accessible)
- 4 classes disponibles : Eco, Standard, High Performance, VoIP

## Quand choisir KaaS (Container) ?

- Applications cloud-native microservices
- CI/CD avec déploiements fréquents
- Auto-scaling basé sur la charge (HPA/VPA)
- Technologies : OpenShift as a Service, Tanzu

## Architecture hybride recommandée

La meilleure approche combine souvent les trois :
- **BMS** pour les bases de données critiques (Oracle, SAP HANA) et les workloads GPU
- **vDC** pour les applications métier et le middleware
- **KaaS** pour les microservices front-end et les APIs

Cette architecture tire parti de la performance native du BMS, de la flexibilité du vDC et de l'agilité des containers, le tout interconnecté via le réseau NSX-T de Cloud Avenue.`,
    date: "2025-02-10",
    category: "Architecture",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "securite-compliance-bms",
    title:
      "Sécurité BMS Cloud Avenue : SecNumCloud, ISO 27001 et conformité RGPD",
    description:
      "Vue complète de la sécurité des Bare Metal Servers : certifications, isolation physique, chiffrement, micro-segmentation et souveraineté.",
    content: `La sécurité est au cœur de l'offre BMS Cloud Avenue. De l'isolation physique au chiffrement en passant par les certifications, voici l'état des lieux complet.

## Infrastructure physique sécurisée

### Deux datacenters en France
- **Val de Reuil** (Normandie) et **Chartres** (Centre-Val de Loire)
- Distance de 100 km entre les deux sites (conformité réplication)
- PUE 1.3, éco-conception
- Accès biométrique, vidéosurveillance 24/7, gardes

### Isolation physique totale
Contrairement aux VMs qui partagent un hyperviseur, chaque BMS est un serveur physique 100% dédié au client :
- **Zoning SAN** : chaque BMS a son propre zoning sur le SAN, garantissant qu'aucun autre serveur ne peut accéder à ses données de stockage
- **VLAN dédié** : un VLAN privé est créé lors de l'installation du BMS
- **Pas de "noisy neighbor"** : les performances ne sont jamais impactées par d'autres clients

## Certifications et conformité

| Certification | Statut |
|--------------|--------|
| ISO 27001 | ✅ Certifié |
| RGPD | ✅ Conforme |
| SecNumCloud (ANSSI) | 🟡 En cours d'obtention |

**SecNumCloud** est le visa de sécurité délivré par l'ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information). Son obtention en cours positionne Cloud Avenue parmi les clouds souverains de confiance.

**Souveraineté** : toutes les données sont hébergées en France, soumises au droit français et conformes à la réglementation européenne. Aucun transfert de données hors UE.

## Sécurité réseau

### NSX-T — Virtualisation réseau et micro-segmentation
- Passerelle T0 spécifique par BMS, connectée à l'organisation client
- Pare-feu distribué stateful avec micro-segmentation
- Règles NAT, pare-feu et Load Balancer applicables au BMS
- **Note** : le pare-feu distribué ne s'applique pas directement au BMS (limitation connue), mais les règles de la passerelle T0/T1 protègent le trafic

### Anti-DDoS
Protection Anti-DDoS de plateforme incluse pour tous les BMS.

### Connectivité sécurisée
- VPN IPsec et L2VPN (sans frais supplémentaires)
- VPN SSL
- Cross Connect (lien L3 vers colocation)
- BVPN Orange (réseau MPLS privé, 220 pays)
- Serveur de rebond (VM) via SSH/RDP

## Gestion des accès et credentials

### iLO — Administration distante
L'interface iLO (Integrated Lights-Out) HPE permet l'administration distante sécurisée du BMS :
- Accès via proxy HTTPS
- Règles d'accès filtrées par sous-réseau
- Console distante, power management, diagnostic hardware

### CyberArk
Les credentials d'accès au BMS sont transmis via CyberArk, la solution de gestion des comptes à privilèges. Rotation automatique des mots de passe, traçabilité des accès.

## Chiffrement

- **AES-256** pour le chiffrement des données au repos
- **Option HSM** (Hardware Security Module) pour les clés de chiffrement matérielles
- TLS 1.3 pour toutes les communications en transit

## Sauvegarde sécurisée

- Agent NetBackup (Veritas) avec chiffrement des flux de sauvegarde
- Réplication bi-site possible (RPO 15 min via stockage réseau NetApp)
- DRaaS avec VMware VCDA pour le disaster recovery`,
    date: "2025-03-05",
    category: "Sécurité",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "bms-gpu-ia-guide",
    title:
      "BMS GPU pour l'IA : H100, L40s et le serveur CRAY unique en France",
    description:
      "Guide complet des configurations BMS GPU Cloud Avenue pour l'intelligence artificielle, le machine learning et l'inférence haute performance.",
    content: `Cloud Avenue propose des Bare Metal Servers équipés de GPU NVIDIA de dernière génération pour répondre aux besoins croissants en IA et Machine Learning. Voici le guide complet.

## Les configurations GPU disponibles

### bms.cray — La référence absolue
- **GPU** : 8x NVIDIA H100 NVL 94 Go SXM
- **CPU** : 72 cœurs
- **RAM** : 4 096 Go (4 To)
- **Prix** : 20 397 €/mois
- **Particularité** : **configuration unique sur le marché français** — aucun autre fournisseur cloud français ne propose 8x H100 SXM sur une seule machine

Le CRAY est conçu pour l'entraînement de grands modèles de langage (LLM), le fine-tuning intensif et les workloads HPC nécessitant une interconnexion GPU maximale via NVLink.

### BMS 4xH100
- **GPU** : 4x NVIDIA H100 NVL
- **Prix** : sur devis
- **Usage** : inférence haute performance, RAG (Retrieval Augmented Generation), fine-tuning de modèles de taille moyenne

### BMS L40s
- **GPU** : 2-4x NVIDIA L40s
- **Prix** : sur devis
- **Usage** : inférence, rendu graphique, workloads IA nécessitant un bon rapport performance/prix

## Performances benchmark

### Inférence LLM
- **Cloud Avenue 4xH100** : ~40 tokens/seconde
- **OVH équivalent** : < 30 tokens/seconde
- **Avantage CAV** : +17% de performances en GenAI

### Entraînement
Le CRAY 8xH100 avec interconnexion NVLink permet un scaling quasi-linéaire sur 8 GPU, critique pour l'entraînement distribué de modèles à plusieurs milliards de paramètres.

## Cas d'usage

### 1. Entraînement de modèles (CRAY 8xH100)
- LLM custom d'entreprise (fine-tuning de Llama, Mistral, etc.)
- Modèles de vision par ordinateur
- Modèles multimodaux

### 2. Inférence haute performance (4xH100, L40s)
- Chatbots IA d'entreprise
- RAG (Retrieval Augmented Generation) sur documents internes
- Classification et extraction d'information
- Traduction automatique

### 3. HPC scientifique (CRAY)
- Simulations numériques (CFD, éléments finis)
- Modélisation moléculaire
- Analyse génomique

## OS et drivers

Les BMS GPU sont livrés avec :
- **Ubuntu Server** ou **Red Hat Enterprise Linux**
- Drivers CUDA préinstallés
- NVIDIA Container Toolkit pour l'exécution de containers GPU
- Compatibilité PyTorch, TensorFlow, JAX

## Cluster Infiniband

Pour les workloads nécessitant une interconnexion réseau ultra-rapide entre plusieurs BMS GPU, un cluster Infiniband est possible sur demande, permettant un entraînement distribué multi-nœuds.

## Souveraineté IA

Héberger ses modèles d'IA sur des BMS GPU Cloud Avenue garantit que les données d'entraînement et les modèles restent en France, sous droit français, conformément au RGPD — un argument décisif pour les secteurs régulés (santé, défense, finance).`,
    date: "2025-02-25",
    category: "GPU & IA",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "benchmark-cav-vs-concurrence",
    title: "Benchmark BMS Cloud Avenue vs OVH, AWS, Oracle : qui gagne ?",
    description:
      "Analyse comparative détaillée des offres Bare Metal : performances, prix, RAM, certifications et souveraineté.",
    content: `Comment se positionne le BMS Cloud Avenue face à la concurrence ? Voici une analyse comparative objective basée sur les données publiques des principaux fournisseurs.

## Comparaison prix/performance

### Prix par Go de RAM
Cloud Avenue est le **seul fournisseur proposant plus d'1 To de RAM pour moins de 3 000 €/mois**. Le BMS XXL-C offre 4 To de RAM pour 2 903 €/mois, soit environ 0,71 €/Go/mois — imbattable sur le marché.

### Prix par cœur CPU
| Fournisseur | Configuration type | Prix/cœur/mois |
|-------------|-------------------|----------------|
| Cloud Avenue | Gen11 Medium-A (32c) | ~45 € |
| OVH | Advance-1 (équivalent) | ~35-50 € |
| AWS | i3.metal (72 vCPU) | > 100 € |
| Oracle | BM.Standard3.64 | ~60-80 € |

## Performances CPU

### Gen11 vs Gen10 : +30% de performances
Les BMS Gen11 utilisent des processeurs Intel Xeon de 5ème génération (Sapphire Rapids), offrant +30% de performances par rapport à la Gen10 (Ice Lake).

À titre de comparaison, **OVH propose encore des processeurs de 2ème génération** (Cascade Lake) sur certaines offres, soit deux générations de retard.

## Performances GPU

### GenAI Benchmark
- **Cloud Avenue 4xH100** : ~40 tokens/seconde
- **OVH GPU Cloud** : < 30 tokens/seconde
- **Avantage CAV** : **+17% de performances** en génération de texte IA

### Configuration unique CRAY 8xH100
Cloud Avenue est la **seule plateforme française** à proposer 8x H100 SXM sur une seule machine — une configuration introuvable chez OVH, Scaleway ou Cloud Temple.

## RAM maximale

| Fournisseur | RAM maximale | Prix/mois |
|-------------|-------------|-----------|
| Cloud Avenue | 4 096 Go (4 To) | 2 903 € |
| OVH | 2 048 Go | > 3 000 € |
| AWS | 24 576 Go (u-24tb1.metal) | > 100 000 $ |
| Oracle | 2 048 Go | > 4 000 € |
| IBM | 6 144 Go | Sur devis |

## Certifications et souveraineté

| Critère | Cloud Avenue | OVH | AWS | Oracle |
|---------|-------------|-----|-----|--------|
| Données en France | ✅ | ✅ | ✅ (Paris) | ✅ (Paris) |
| Droit français | ✅ | ✅ | ❌ (CLOUD Act) | ❌ (CLOUD Act) |
| ISO 27001 | ✅ | ✅ | ✅ | ✅ |
| SecNumCloud | 🟡 En cours | ✅ (partiel) | ❌ | ❌ |
| RGPD natif | ✅ | ✅ | Complexe | Complexe |
| Certifié SAP HANA | ✅ (XXL) | ❌ | ✅ | ✅ |

## Points forts Cloud Avenue

1. **Meilleur prix/Go RAM** du marché sur les configurations haute mémoire
2. **Gen11** (Intel Xeon 5ème gen) avec +30% perf vs Gen10
3. **CRAY 8xH100** unique en France
4. **Certifié SAP HANA** sur les configs XXL
5. **Souveraineté** : données en France, droit français, SecNumCloud en cours
6. **Pas de "noisy neighbor"** : isolation physique totale
7. **Réseau Orange Tier One** (AS5511) — backbone internet de référence

## Points d'attention

- **SLA 99,95%** (vs 99,99% chez certains concurrents)
- **Supervision** en cours de mise en place
- **Customer journey** à améliorer (process de commande en 14 étapes)
- **Pare-feu distribué** ne s'applique pas directement au BMS`,
    date: "2025-01-25",
    category: "Benchmark",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
  {
    id: "os-supportes-gen11-matrice",
    title:
      "OS supportés sur BMS Gen11 : matrice complète Windows, RHEL, SUSE, Oracle, Ubuntu",
    description:
      "Matrice de compatibilité complète des systèmes d'exploitation certifiés pour HPE Synergy 480 Gen11 avec Intel Xeon 5ème génération.",
    content: `Voici la matrice complète des systèmes d'exploitation supportés sur les BMS Gen11 Cloud Avenue (HPE Synergy 480 Gen11, processeur Intel Xeon 5ème génération).

## Matrice de compatibilité

### Windows Server
| Version | Statut |
|---------|--------|
| Windows Server 2019 | ✅ Supporté |
| Windows Server 2022 | ✅ Supporté |
| Windows Server 2025 | 🟡 En cours de validation |

### Red Hat Enterprise Linux (RHEL)
| Version | Statut |
|---------|--------|
| RHEL 9.2 | ✅ Supporté |
| RHEL 9.3 | ✅ Supporté |
| RHEL 9.4 | 🟡 En cours |
| RHEL 9.5 | 🟡 En cours |
| RHEL 9.1 | 🟡 En cours |
| RHEL 8.8 | ✅ Supporté |
| RHEL 8.9 | ✅ Supporté |
| RHEL 8.10 | ✅ Supporté |
| RHEL 8.0 | 🟡 En cours |

### SUSE Linux Enterprise Server
| Version | Statut |
|---------|--------|
| SLES 15 SP5 | ✅ Supporté |
| SLES 15 SP6 | 🟡 En cours |

### Oracle Linux
| Version | Statut |
|---------|--------|
| Oracle Linux 9.3 (UEK7u2) | ✅ Supporté |
| Oracle Linux 9.4 (UEK7u2) | ✅ Supporté |
| Oracle Linux 9.5 (UEK7u3) | 🟡 En cours |

### Ubuntu Server
| Version | Statut |
|---------|--------|
| Ubuntu 22.04.3 LTS | ✅ Supporté |
| Ubuntu 22.04.4 LTS | ✅ Supporté |
| Ubuntu 22.04.5 LTS | ✅ Supporté |
| Ubuntu 24.04 LTS | ✅ Supporté |
| Ubuntu 24.04.1 LTS | 🟡 En cours |
| Ubuntu 24.04.2 LTS | 🟡 En cours |

## Politique BYOL (Bring Your Own License)

Pour les systèmes d'exploitation non listés dans la matrice officielle, Cloud Avenue applique une politique BYOL : le client peut apporter sa propre licence et installer l'OS de son choix, sous réserve de compatibilité matérielle avec le HPE Synergy 480 Gen11.

**Important** : les OS non listés ne bénéficient pas du support Cloud Avenue. Le client est responsable de l'installation, de la configuration et du maintien de l'OS.

## Recommandations par usage

### Bases de données Oracle
**Oracle Linux 9.4 (UEK7u2)** — noyau UEK optimisé pour Oracle Database, support natif ASM et RAC. Ou **RHEL 8.10** pour une compatibilité maximale avec les anciennes versions d'Oracle.

### SAP HANA
**SUSE Linux Enterprise Server 15 SP5** — certifié SAP HANA, support long terme. RHEL 8.x/9.x également supporté par SAP.

### Workloads conteneurisés
**Ubuntu 24.04 LTS** — large écosystème container (Docker, Kubernetes), support Canonical étendu.

### Environnements Microsoft
**Windows Server 2022** — support complet des fonctionnalités Windows, Active Directory, SQL Server. Windows Server 2025 sera disponible dès validation.

### IA/ML (BMS GPU)
**Ubuntu Server** ou **RHEL** — drivers CUDA préinstallés, compatibilité PyTorch/TensorFlow. Ubuntu 22.04 LTS est le plus utilisé pour les workloads IA.

## Installation et configuration

L'OS est installé automatiquement lors du provisioning (étape 11 du process de commande) via Ansible. Le choix de l'OS, de la version et du flavour est spécifié dans le fichier YAML de configuration du BMS.

## Mises à jour

Les mises à jour de l'OS sont de la responsabilité du client. Cloud Avenue met régulièrement à jour la matrice de compatibilité pour ajouter les nouvelles versions validées sur le hardware Gen11.`,
    date: "2025-01-15",
    category: "Systèmes",
    imageUrl: "",
    sentiment: "technique",
    isReference: true,
  },
];

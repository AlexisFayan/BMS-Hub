export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Module = {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  content: string;
  quiz: QuizQuestion[];
};

export const modules: Module[] = [
  {
    id: 1,
    title: "Introduction au Bare Metal Server",
    description: "Découvrez les fondamentaux des serveurs physiques dédiés BMS chez Cloud Avenue et leur positionnement dans l'offre Orange Business.",
    icon: "Server",
    duration: "25 min",
    level: "Débutant",
    content: `# Introduction au Bare Metal Server

## Qu'est-ce qu'un Bare Metal Server ?

Un **Bare Metal Server** (BMS) est un serveur physique **100% dédié** à un seul client, sans aucune couche de virtualisation entre le système d'exploitation et le matériel. C'est un serveur **mono-tenant** : vous êtes le seul utilisateur de la machine, avec un accès direct et exclusif à l'ensemble des ressources matérielles (CPU, RAM, stockage, réseau).

Chez **Orange Business Cloud Avenue**, les BMS sont proposés via un catalogue de **15 configurations standardisées Gen11** basées sur la plateforme **HPE Synergy 480 Gen11** avec des processeurs **Intel Xeon de 5ème génération**.

## Caractéristiques principales

- **Performance native** : accès direct au matériel sans overhead de virtualisation — 100% des ressources CPU et RAM disponibles
- **Isolation complète** : aucun partage de ressources avec d'autres clients — zéro "noisy neighbor"
- **Mono-tenant** : chaque serveur est physiquement dédié à un seul client
- **Intégration réseau native** : connecté au réseau Cloud Avenue via NSX-T avec passerelle T0 dédiée
- **Personnalisation** : choix du système d'exploitation, configuration BIOS, profils de workload

## Positionnement dans l'offre Cloud Avenue

Cloud Avenue propose 4 modèles de compute principaux :

| Service | Description | Isolation |
|---------|-------------|-----------|
| **Virtual Datacenter (vDC)** | Pool de ressources virtualisées partagées | Logique |
| **Dedicated Cluster** | Serveurs physiques privatisés avec VMware VCF | Physique (cluster) |
| **vCenter On Demand (VCoD)** | Cloud privé dédié avec vCenter + vSAN + NSX dédiés | Physique (infrastructure) |
| **Bare Metal Server** | Serveur physique 100% dédié, sans virtualisation | Physique (serveur) |

Le BMS se différencie par l'**absence totale de couche de virtualisation**, offrant les meilleures performances brutes possibles. C'est le choix idéal pour les workloads nécessitant :

- Des **performances maximales** (HPC, bases de données in-memory)
- Une **isolation stricte** (conformité, sécurité)
- Un **contrôle total** sur l'infrastructure
- Une **optimisation des licences** logicielles (Oracle, SAP)

## Familles de configurations

Les 15 configurations BMS Gen11 sont organisées en **5 familles** :

| Famille | Cœurs | RAM | Usage typique |
|---------|-------|-----|---------------|
| **XSmall** | 8 cœurs | 256 – 768 Go | Bases de données légères, Oracle |
| **Small** | 16 cœurs | 256 – 768 Go | Applications métier, middleware |
| **Medium** | 32 cœurs | 512 – 1 536 Go | Bases de données, analytics |
| **XL** | 64 cœurs | 1 024 – 2 048 Go | SAP HANA, workloads intensifs |
| **XXL** | 64 cœurs | 2 048 – 4 096 Go | SAP HANA certifié, in-memory massif |

Les prix vont de **1 244 €/mois** (Small-A) à **2 903 €/mois** (XXL-C), avec une offre GPU **CRAY 8xH100** à 20 397 €/mois pour l'IA/ML.

## Infrastructure et datacenters

Les BMS Cloud Avenue sont hébergés dans **2 datacenters en France** :
- **Val de Reuil** (Normandie)
- **Chartres** (Centre-Val de Loire)

Ces sites sont distants de **100 km** l'un de l'autre, permettant des architectures de **disaster recovery** bi-site. Les datacenters sont certifiés **ISO 27001** et en cours de certification **SecNumCloud** (ANSSI).

## Pourquoi choisir un BMS Cloud Avenue ?

1. **Souveraineté** : données hébergées en France, droit français
2. **Performance** : processeurs Intel Xeon 5ème génération, jusqu'à 4 To de RAM
3. **Prix compétitif** : meilleur prix/Go RAM du marché français
4. **Intégration** : réseau NSX-T, stockage SAN, sauvegarde NetBackup
5. **Pas d'engagement** : facturation mensuelle sans durée minimum`,
    quiz: [
      { question: "Qu'est-ce qui distingue fondamentalement un BMS d'une VM ?", options: ["Le prix est plus élevé", "L'absence totale de couche de virtualisation", "La taille du disque est plus grande", "Le système d'exploitation est différent"], correctIndex: 1 },
      { question: "Combien de configurations BMS Gen11 sont disponibles chez Cloud Avenue ?", options: ["8 configurations", "10 configurations", "15 configurations", "20 configurations"], correctIndex: 2 },
      { question: "Dans combien de datacenters en France sont hébergés les BMS Cloud Avenue ?", options: ["1 datacenter", "2 datacenters", "3 datacenters", "4 datacenters"], correctIndex: 1 },
      { question: "Quelle est la RAM maximale disponible sur un BMS Gen11 ?", options: ["1 024 Go", "2 048 Go", "3 072 Go", "4 096 Go"], correctIndex: 3 },
      { question: "Quel type de processeur équipe les BMS Gen11 ?", options: ["AMD EPYC 4ème gen", "Intel Xeon 5ème gen", "ARM Ampere Altra", "Intel Xeon 3ème gen"], correctIndex: 1 },
    ],
  },
  {
    id: 2,
    title: "L'écosystème Cloud Avenue",
    description: "Tour d'horizon complet de la plateforme Cloud Avenue d'Orange Business : services, technologies, certifications et datacenters.",
    icon: "Cloud",
    duration: "25 min",
    level: "Débutant",
    content: `# L'écosystème Cloud Avenue

## Présentation de Cloud Avenue

**Cloud Avenue** est la plateforme cloud **IaaS (Infrastructure as a Service)** d'**Orange Business**, hébergée intégralement en France. Elle offre une gamme complète de services d'infrastructure pour les entreprises, avec un focus sur la **souveraineté des données** et la **conformité réglementaire**.

## Datacenters

Cloud Avenue s'appuie sur **2 datacenters en France** :

| Site | Localisation | Caractéristiques |
|------|-------------|------------------|
| **Val de Reuil** | Normandie | Datacenter principal, certifié ISO 27001 |
| **Chartres** | Centre-Val de Loire | Site de réplication, 100 km du premier site |

- **PUE 1.3** (Power Usage Effectiveness) — performance énergétique optimisée
- Conception **éco-responsable** avec refroidissement optimisé
- Connectivité réseau **redondante** entre les deux sites

## Catalogue des services

### Compute

| Service | Description | Caractéristiques |
|---------|-------------|------------------|
| **Virtual Datacenter (vDC)** | Pool de ressources virtualisées | 4 classes : Eco, Standard, High Performance, VoIP |
| **Dedicated Cluster** | Serveurs physiques privatisés | VMware VCF, stockage dédié |
| **vCenter On Demand (VCoD)** | Cloud privé dédié par client | vCenter + vSAN + NSX dédiés, 81 combinaisons |
| **Bare Metal Server** | Serveur physique 100% dédié | 15 configs Gen11, HPE Synergy 480 |
| **BMS GPU** | Serveurs dédiés avec GPU | NVIDIA H100 NVL, L40s pour IA/ML |

### Stockage

| Type | Technologie | Caractéristiques |
|------|------------|------------------|
| **Stockage Bloc** | SAN | 4 classes : Silver, Gold, Platinum 3K/7K |
| **Stockage Objet** | Scality (API S3) | 11 nines de durabilité, pétaoctets |
| **Stockage Réseau** | NetApp NAS | NFS v3, SMB/CIFS, réplication bi-site |

### Réseau et sécurité

| Service | Description |
|---------|-------------|
| **NSX-T** | Virtualisation réseau SDN |
| **VPN** | IPsec, L2VPN (gratuit), VPN SSL |
| **Cross Connect** | Lien L3 vers colocation |
| **BVPN** | Réseau MPLS Orange (220 pays) |
| **Internet** | Tier One Orange (AS5511) |
| **Load Balancer** | AVI VMware, L4/L7, WAF inclus |
| **Anti-DDoS** | Protection de plateforme incluse |

### Services additionnels

| Service | Description |
|---------|-------------|
| **Sauvegarde** | Veritas NetBackup, recovery granulaire |
| **DRaaS** | Disaster Recovery avec VMware VCDA |
| **Kubernetes (KaaS)** | OpenShift as a Service, Tanzu |

## Technologies sous-jacentes

La plateforme Cloud Avenue repose sur un stack technologique éprouvé :

- **VMware VCD 10.5** pour la virtualisation
- **VMware NSX-T** pour le réseau software-defined
- **VMware vSAN** pour le stockage hyper-convergé
- **HPE Synergy** pour les serveurs physiques (BMS Gen11)
- **Veritas NetBackup** pour la sauvegarde
- **VMware VCDA** pour le disaster recovery

## Certifications et compliance

| Certification | Statut | Périmètre |
|--------------|--------|-----------|
| **ISO 27001** | Obtenue | Sécurité de l'information |
| **RGPD** | Conforme | Protection des données personnelles |
| **SecNumCloud** | En cours (ANSSI) | Cloud de confiance français |

- Toutes les données sont hébergées **en France**
- Soumises au **droit français** et à la **conformité européenne**
- Aucun transfert de données hors UE

## Portails de gestion

- **VCD Portal** : gestion des ressources virtualisées
- **Espace Client Cloud** : vue d'ensemble et facturation
- **Cloud Store** : catalogue de services et commandes
- **API REST** : automatisation et intégration`,
    quiz: [
      { question: "Combien de datacenters Cloud Avenue existent en France ?", options: ["1", "2", "3", "5"], correctIndex: 1 },
      { question: "Quel est le PUE des datacenters Cloud Avenue ?", options: ["1.1", "1.3", "1.5", "2.0"], correctIndex: 1 },
      { question: "Quelle technologie de virtualisation réseau utilise Cloud Avenue ?", options: ["Cisco ACI", "VMware NSX-T", "OpenStack Neutron", "AWS VPC"], correctIndex: 1 },
      { question: "Quel est le statut de la certification SecNumCloud ?", options: ["Obtenue", "En cours auprès de l'ANSSI", "Non prévue", "Refusée"], correctIndex: 1 },
      { question: "Combien de combinaisons de configs sont possibles pour le VCoD ?", options: ["15", "32", "81", "100"], correctIndex: 2 },
    ],
  },
  {
    id: 3,
    title: "Catalogue des configurations BMS Gen11",
    description: "Les 15 configurations BMS Gen11 en détail : CPU, cœurs, RAM, prix, ainsi que les configs Gen10 legacy et GPU.",
    icon: "Cpu",
    duration: "30 min",
    level: "Intermédiaire",
    content: `# Catalogue des configurations BMS Gen11

## Plateforme matérielle

Tous les BMS Gen11 sont basés sur la plateforme **HPE Synergy 480 Gen11** équipée de processeurs **Intel Xeon de 5ème génération** (Sapphire Rapids). Cette génération offre environ **+30% de performances** par rapport à la Gen10.

## Les 15 configurations Gen11

### Famille XSmall (8 cœurs)

Processeur : **1x Intel Xeon Gold 6534** — 3.9-4.2 GHz (8 cœurs / 16 threads)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| **bms.gen11.Xsmall-A** | 256 Go | 1 302 € |
| **bms.gen11.Xsmall-B** | 512 Go | 1 362 € |
| **bms.gen11.Xsmall-C** | 768 Go | 1 421 € |

Usage : bases de données légères, Oracle avec optimisation de licences (peu de cœurs, beaucoup de RAM).

### Famille Small (16 cœurs)

Processeur : **1x Intel Xeon Gold 6526Y** — 2.8-3.9 GHz (16 cœurs / 32 threads)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| **bms.gen11.small-A** | 256 Go | 1 244 € |
| **bms.gen11.small-B** | 512 Go | 1 303 € |
| **bms.gen11.small-C** | 768 Go | 1 362 € |

Usage : applications métier, middleware, bases de données de taille moyenne.

### Famille Medium (32 cœurs)

Processeur : **1x Intel Xeon Gold 6548Y+** — 2.5-4.1 GHz (32 cœurs / 64 threads)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| **bms.gen11.medium-A** | 512 Go | 1 448 € |
| **bms.gen11.medium-B** | 1 024 Go | 1 566 € |
| **bms.gen11.medium-C** | 1 536 Go | 1 755 € |

Usage : bases de données importantes, analytics, workloads multi-threads.

### Famille XL (64 cœurs)

Processeur : **2x Intel Xeon Gold 6548Y+** — 2.5-4.1 GHz (64 cœurs / 128 threads)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| **bms.gen11.xl-A** | 1 024 Go | 1 954 € |
| **bms.gen11.xl-B** | 1 536 Go | 2 072 € |
| **bms.gen11.xl-C** | 2 048 Go | 2 190 € |

Usage : SAP HANA, workloads intensifs, bases de données in-memory.

### Famille XXL (64 cœurs, RAM étendue)

Processeur : **2x Intel Xeon Gold 6548Y+** — 2.5-4.1 GHz (64 cœurs / 128 threads)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| **bms.gen11.xxl-A** | 2 048 Go | 2 336 € |
| **bms.gen11.xxl-B** | 3 072 Go | 2 619 € |
| **bms.gen11.xxl-C** | 4 096 Go | 2 903 € |

Usage : SAP HANA certifié, bases de données in-memory massives, analytics temps réel. Cloud Avenue est le **seul fournisseur** offrant plus de 1 To de RAM pour moins de 3 000 €/mois.

## Configurations Gen10 (legacy, fin de vie)

Ces configurations sont en cours de retrait et remplacées par les Gen11 :

| Modèle | CPU | Cœurs | RAM | Disques |
|--------|-----|-------|-----|---------|
| **bms.hc1.XLarge** | 2x Intel Gold 6248R 3.0GHz | 48 | 576 Go (→768) | 4x 1.92 TB |
| **bms.hp1.Medium** | 2x Intel Gold 5218 2.3GHz | 32 | 384 Go (→768) | 4x 1.92 TB |
| **bms.db1.Small** | 1x Intel Gold 5218 2.3GHz | 16 | 192 Go (→384) | 4x 1.92 TB |
| **bms.db1.XSmall** | 2x Intel Gold 5222 3.8GHz | 8 | 192 Go | NVMe |

## Configurations GPU (IA/ML)

| Modèle | Détails | Prix/mois |
|--------|---------|-----------|
| **bms.cray** | 72 cœurs, 4 096 Go RAM, 8x NVIDIA H100 NVL 94GB SXM | 20 397 € |
| **BMS 4xH100** | 4x NVIDIA H100 NVL | Sur devis |
| **BMS L40s** | 2-4x NVIDIA L40s | Sur devis |

Le **bms.cray** avec 8x H100 est une **configuration unique** sur le marché français — seule Cloud Avenue la propose.

## Points clés à retenir

- **5 familles** : XSmall, Small, Medium, XL, XXL
- De **8 à 64 cœurs**, de **256 Go à 4 096 Go** de RAM
- Prix de **1 244 € à 2 903 €/mois** (configs standard)
- Plateforme **HPE Synergy 480 Gen11**
- Processeurs **Intel Xeon 5ème génération**
- **+30% de perf** vs Gen10`,
    quiz: [
      { question: "Combien de familles de BMS Gen11 existent ?", options: ["3 familles", "4 familles", "5 familles", "6 familles"], correctIndex: 2 },
      { question: "Quel est le prix mensuel du bms.gen11.xxl-C (4 To RAM) ?", options: ["1 955 €", "2 336 €", "2 619 €", "2 903 €"], correctIndex: 3 },
      { question: "Quel processeur équipe la famille XSmall ?", options: ["Intel Xeon Gold 6526Y", "Intel Xeon Gold 6534", "Intel Xeon Gold 6548Y+", "Intel Xeon Gold 6248R"], correctIndex: 1 },
      { question: "Combien de GPU H100 contient la configuration bms.cray ?", options: ["2", "4", "6", "8"], correctIndex: 3 },
      { question: "Quelle est la configuration Gen11 la moins chère ?", options: ["bms.gen11.Xsmall-A à 1 302 €", "bms.gen11.small-A à 1 244 €", "bms.gen11.medium-A à 1 448 €", "bms.gen11.small-B à 1 303 €"], correctIndex: 1 },
    ],
  },
  {
    id: 4,
    title: "Systèmes d'exploitation supportés",
    description: "Matrice complète des OS supportés sur les BMS Gen11 : Windows Server, RHEL, SUSE, Oracle Linux, Ubuntu et politique BYOL.",
    icon: "Monitor",
    duration: "20 min",
    level: "Intermédiaire",
    content: `# Systèmes d'exploitation supportés

## Plateforme cible

Les OS listés ci-dessous sont validés pour le processeur **5th Gen Intel Xeon** sur la plateforme **HPE Synergy 480 Gen11**.

## Matrice de compatibilité Gen11

### Windows Server

| Version | Statut |
|---------|--------|
| **Windows Server 2019** | ✅ Supporté |
| **Windows Server 2022** | ✅ Supporté |
| **Windows Server 2025** | 🟡 En cours de validation |

### Red Hat Enterprise Linux (RHEL)

| Version | Statut |
|---------|--------|
| **RHEL 8.8** | ✅ Supporté |
| **RHEL 8.9** | ✅ Supporté |
| **RHEL 8.10** | ✅ Supporté |
| **RHEL 9.2** | ✅ Supporté |
| **RHEL 9.3** | ✅ Supporté |
| **RHEL 8.0** | 🟡 En cours |
| **RHEL 9.1** | 🟡 En cours |
| **RHEL 9.4** | 🟡 En cours |
| **RHEL 9.5** | 🟡 En cours |

### SUSE Linux Enterprise Server (SLES)

| Version | Statut |
|---------|--------|
| **SLES 15 SP5** | ✅ Supporté |
| **SLES 15 SP6** | 🟡 En cours |

### Oracle Linux

| Version | Statut |
|---------|--------|
| **Oracle Linux 9.3 (UEK7u2)** | ✅ Supporté |
| **Oracle Linux 9.4 (UEK7u2)** | ✅ Supporté |
| **Oracle Linux 9.5 (UEK7u3)** | 🟡 En cours |

### Ubuntu Server

| Version | Statut |
|---------|--------|
| **Ubuntu 22.04.3 LTS** | ✅ Supporté |
| **Ubuntu 22.04.4 LTS** | ✅ Supporté |
| **Ubuntu 22.04.5 LTS** | ✅ Supporté |
| **Ubuntu 24.04 LTS** | ✅ Supporté |
| **Ubuntu 24.04.1 LTS** | 🟡 En cours |
| **Ubuntu 24.04.2 LTS** | 🟡 En cours |

## Politique BYOL (Bring Your Own License)

Pour les systèmes d'exploitation **non listés** dans la matrice de compatibilité officielle, Cloud Avenue applique une politique **BYOL** :

- Le client fournit sa propre licence OS
- Le client est responsable de la compatibilité matérielle
- Le support Cloud Avenue se limite à l'infrastructure (réseau, stockage, matériel)
- Le client assure lui-même le support OS

## Provisioning OS

Lors de la commande d'un BMS, le choix de l'OS fait partie des **paramètres de provisioning** :

- **OS choice** : sélection dans la liste supportée
- **Version** : version spécifique de l'OS
- **Flavour** : variante (Server, Datacenter, etc.)
- **Generation** : Gen10 ou Gen11

L'installation est automatisée via **Ansible** dans le cadre du processus de provisioning IAT. Les drivers matériels HPE sont pré-installés et les mises à jour de sécurité initiales sont appliquées.

## OS pour BMS GPU

Pour les configurations GPU (H100, L40s), les OS disponibles sont :
- **Ubuntu Server** (recommandé pour IA/ML)
- **Red Hat Enterprise Linux**

Les **drivers CUDA NVIDIA** sont préinstallés sur les images GPU, facilitant le déploiement immédiat de workloads IA/ML.

## Recommandations par usage

| Usage | OS recommandé |
|-------|---------------|
| SAP HANA | SUSE Linux Enterprise Server 15 SP5 |
| Oracle Database | Oracle Linux 9.4, RHEL 8.10 |
| Applications Windows | Windows Server 2022 |
| IA/ML avec GPU | Ubuntu 24.04 LTS |
| Usage général Linux | RHEL 9.3, Ubuntu 22.04.5 LTS |`,
    quiz: [
      { question: "Quel OS est recommandé pour SAP HANA sur BMS ?", options: ["Ubuntu 24.04", "Windows Server 2022", "SUSE Linux Enterprise 15 SP5", "Oracle Linux 9.4"], correctIndex: 2 },
      { question: "Quel est le statut de Windows Server 2025 sur Gen11 ?", options: ["Supporté", "En cours de validation", "Non supporté", "Abandonné"], correctIndex: 1 },
      { question: "Que signifie BYOL ?", options: ["Build Your Own Linux", "Bring Your Own License", "Buy Your Own Lease", "Bare Your Own Layer"], correctIndex: 1 },
      { question: "Quels drivers sont préinstallés sur les images GPU ?", options: ["AMD ROCm", "NVIDIA CUDA", "Intel oneAPI", "OpenCL générique"], correctIndex: 1 },
      { question: "Combien de versions RHEL sont officiellement supportées (✅) sur Gen11 ?", options: ["3", "4", "5", "7"], correctIndex: 2 },
    ],
  },
  {
    id: 5,
    title: "Stockage BMS en détail",
    description: "System LUN, Data LUN, classes de performance IOPS, stockage SAN, NVMe, réseau (NetApp) et objet (Scality S3).",
    icon: "HardDrive",
    duration: "30 min",
    level: "Intermédiaire",
    content: `# Stockage BMS en détail

## Architecture de stockage

Le stockage BMS chez Cloud Avenue repose sur une architecture **SAN (Storage Area Network)** dédiée avec un **zoning SAN** par client pour l'isolation physique. Chaque BMS dispose de deux types de disques logiques : le **System LUN** (disque système) et les **Data LUN** (disques de données).

## Disque Système (System LUN)

Le System LUN héberge le système d'exploitation et les applications de base. Taille minimum : **500 Go**.

| Classe | IOPS/To | Taille | IOPS Min–Max |
|--------|---------|--------|--------------|
| **Gold** | 800 | 500 Go – 10 To | 1 000 – 8 000 |
| **Platinum 2K** | 1 400 | 500 Go – 10 To | 1 000 – 14 000 |
| **Platinum 3K** | 3 400 | 500 Go – 10 To | 1 700 – 34 000 |

## Disque de Données (Data LUN)

Les Data LUN sont dédiés aux données applicatives. Chaque BMS peut avoir de **1 à 6+ disques de données**, chacun avec sa propre taille et classe de performance.

| Classe | IOPS/To | Taille | IOPS Min–Max |
|--------|---------|--------|--------------|
| **Unformatted** (Oracle RAC/ASM) | 480 | 1 To – 10 To | 1 000 – 4 800 |
| **Gold** | 800 | 1 To – 10 To | 1 000 – 8 000 |
| **Platinum 2K** | 2 400 | 1 To – 10 To | 2 400 – 24 000 |
| **Platinum 7K** | 5 600 | 500 Go – 10 To | 5 600 – 56 000 |

**Important** : un minimum de **1 000 IOPS est garanti** sur tous les disques, quelle que soit la classe choisie.

### Classe Unformatted

La classe **Unformatted** est spécialement conçue pour **Oracle RAC/ASM** : le disque est présenté brut au serveur, sans formatage préalable, permettant à Oracle ASM de gérer directement le stockage.

## Stockage Bloc (vDC)

Pour les environnements vDC associés aux BMS, les classes de stockage bloc disponibles sont :

| Classe | IOPS/To |
|--------|---------|
| **Silver** | 600 |
| **Gold** | 1 000 |
| **Platinum 3K** | 3 000 |
| **Platinum 7K** | 7 000 |

## Disques NVMe locaux

Certains modèles de BMS intègrent des **disques NVMe locaux** directement dans le serveur. Ces disques offrent :

- **Latence ultra-faible** (< 100 µs)
- **IOPS très élevés** (centaines de milliers)
- Idéaux pour le **cache applicatif** haute performance
- Non répliqués — à utiliser pour les données temporaires ou cache

## Stockage Réseau (NetApp NAS)

Cloud Avenue propose du stockage réseau via **NetApp** pour les besoins de partage de fichiers :

| Caractéristique | Détail |
|-----------------|--------|
| **SVM** | Dédiée par client |
| **Protocoles** | NFS v3, SMB/CIFS |
| **Réplication** | Bi-site (RPO 15 min) |
| **Snapshots** | Gestion intégrée |
| **Portail** | Self-service |
| **Taille minimum** | 500 Go |

### Tarifs stockage réseau

| Gamme | Prix/Go/mois |
|-------|-------------|
| **Entrée** | 0,04 € |
| **Milieu** | 0,0689 € |
| **Haut** | 0,1184 € |

## Stockage Objet (Scality)

Pour le stockage massif de données non structurées, Cloud Avenue propose du **stockage objet** basé sur **Scality** :

- **Compatible API S3** — intégration transparente avec les outils S3
- **Durabilité 99,999999999%** (11 nines)
- **Scalabilité** jusqu'à l'échelle du **pétaoctet**
- **Conformité RGPD** — données hébergées en France

## Bonnes pratiques de dimensionnement

| Usage | Classe recommandée |
|-------|-------------------|
| Système d'exploitation | System LUN Gold |
| Base de données transactionnelle | Data LUN Platinum 7K |
| Oracle RAC/ASM | Data LUN Unformatted |
| Stockage de fichiers partagés | NetApp NAS |
| Archivage/backup | Stockage Objet Scality |
| Cache applicatif | NVMe local |`,
    quiz: [
      { question: "Quel est le minimum d'IOPS garanti sur tous les disques BMS ?", options: ["500 IOPS", "800 IOPS", "1 000 IOPS", "2 000 IOPS"], correctIndex: 2 },
      { question: "Quelle classe de Data LUN est conçue pour Oracle RAC/ASM ?", options: ["Gold", "Platinum 2K", "Unformatted", "Platinum 7K"], correctIndex: 2 },
      { question: "Quelle est la durabilité du stockage objet Scality ?", options: ["99,99%", "99,999%", "99,9999999%", "99,999999999% (11 nines)"], correctIndex: 3 },
      { question: "Quel est le RPO de la réplication NetApp bi-site ?", options: ["5 min", "15 min", "30 min", "1 heure"], correctIndex: 1 },
      { question: "Quelle est la taille minimum d'un System LUN ?", options: ["100 Go", "250 Go", "500 Go", "1 To"], correctIndex: 2 },
    ],
  },
  {
    id: 6,
    title: "Réseau et connectivité",
    description: "Architecture réseau NSX-T, VLAN BMS, VPN, Cross Connect, BVPN MPLS, Load Balancer AVI et tarification Internet sortant.",
    icon: "Network",
    duration: "30 min",
    level: "Intermédiaire",
    content: `# Réseau et connectivité

## Architecture réseau BMS

Le réseau BMS chez Cloud Avenue repose sur **VMware NSX-T**, une solution de **Software-Defined Networking (SDN)** qui offre virtualisation, segmentation et sécurité du réseau.

### Passerelles NSX-T

- **Gateway T0 (Tier-0)** : passerelle spécifique par BMS, connectée à l'organisation client. Chaque BMS dispose de sa propre passerelle T0 pour l'isolation.
- **Gateway T1 (Tier-1)** : routage interne au tenant du client

### VLAN BMS

Un **VLAN privé** est automatiquement créé lors de l'installation du premier BMS dans un tenant. Ce VLAN assure l'isolation du trafic réseau du client. Les paramètres incluent :

- **BMS IP/prefix** : adresse IP du serveur
- **Gateway IP** : passerelle par défaut
- **VLAN ID** : identifiant unique du VLAN

## Firewall et sécurité réseau

Les règles de sécurité applicables aux BMS incluent :

- **Règles NAT** : translation d'adresses pour l'accès Internet
- **Pare-feu** : filtrage du trafic entrant/sortant
- **Load Balancer** : répartition de charge applicative
- **Micro-segmentation** via NSX-T (pare-feu distribué stateful)

**Note** : le pare-feu distribué NSX-T ne s'applique pas directement au BMS — les règles de sécurité sont gérées au niveau de la passerelle T0.

## Modes de connectivité

### 1. Serveur de rebond

Accès au BMS via une **VM de rebond** (jumpbox) :
- Connexion **SSH** (Linux) ou **RDP** (Windows)
- La VM de rebond est dans le même réseau que le BMS
- Solution simple pour l'administration quotidienne

### 2. VPN IPsec et L2VPN

- **VPN IPsec** : tunnel chiffré site-à-site, **sans frais supplémentaires**
- **L2VPN** : extension de réseau Layer 2, **sans frais supplémentaires**
- Idéal pour connecter le réseau d'entreprise au réseau BMS

### 3. VPN SSL

- Accès distant individuel via navigateur ou client VPN
- Authentification par certificat ou credentials

### 4. Cross Connect

- **Lien L3** direct vers une colocation dans le même datacenter
- Latence ultra-faible (< 1 ms)
- Pour les clients ayant des équipements en colocation

### 5. BVPN Orange

- Réseau **MPLS** d'Orange Business
- Couverture dans **220 pays**
- Qualité de service garantie (QoS)
- Pour les entreprises avec des sites multiples

### 6. Internet Tier One

- Accès Internet via le backbone **Orange AS5511**
- Peering direct avec les principaux opérateurs
- Performance et fiabilité de niveau opérateur

## AVI Load Balancer (VMware)

| Caractéristique | Détail |
|-----------------|--------|
| **Niveau** | L4 (transport) et L7 (applicatif) |
| **WAF** | Web Application Firewall inclus |
| **Analytics** | Tableau de bord de performance intégré |
| **Prix** | À partir de 310 €/mois (20 VIP) |

## Anti-DDoS

La protection **Anti-DDoS de plateforme** est **incluse** dans tous les services Cloud Avenue. Elle protège automatiquement contre les attaques volumétriques.

## Tarification Internet sortant

| Volume mensuel | Prix/Go |
|---------------|---------|
| **0 – 15 Go** | **Offert** |
| **15 Go – 1 To** | 0,08 € |
| **1 – 5 To** | 0,07 € |
| **5 – 10 To** | 0,06 € |
| **10 – 100 To** | 0,055 € |
| **> 100 To** | 0,05 € |

## Schéma d'architecture réseau

\`\`\`
Internet (Orange AS5511)
       │
   Anti-DDoS
       │
   Gateway T0 (par BMS)
       │
   VLAN BMS (privé)
       │
   ┌───┴───┐
   │  BMS  │──── Stockage SAN (zoning dédié)
   └───────┘
       │
   Connectivité:
   ├── VPN IPsec/L2VPN
   ├── Cross Connect
   ├── BVPN (MPLS)
   └── VPN SSL
\`\`\``,
    quiz: [
      { question: "Quelle technologie SDN est utilisée pour le réseau BMS ?", options: ["Cisco ACI", "VMware NSX-T", "OpenStack Neutron", "Calico"], correctIndex: 1 },
      { question: "Combien coûte le VPN IPsec chez Cloud Avenue ?", options: ["100 €/mois", "310 €/mois", "Gratuit (sans frais)", "50 €/mois"], correctIndex: 2 },
      { question: "À partir de quel prix est disponible le Load Balancer AVI ?", options: ["150 €/mois", "200 €/mois", "310 €/mois", "500 €/mois"], correctIndex: 2 },
      { question: "Quel est le volume Internet sortant offert gratuitement ?", options: ["5 Go", "10 Go", "15 Go", "50 Go"], correctIndex: 2 },
      { question: "Quel est le numéro AS du backbone Internet Orange ?", options: ["AS3356", "AS5511", "AS15169", "AS8075"], correctIndex: 1 },
    ],
  },
  {
    id: 7,
    title: "Processus de commande et provisioning",
    description: "Les 14 étapes détaillées de commande d'un BMS, les acteurs impliqués, les outils et les paramètres de provisioning.",
    icon: "Rocket",
    duration: "35 min",
    level: "Intermédiaire",
    content: `# Processus de commande et provisioning

## Vue d'ensemble

La commande et le provisioning d'un BMS chez Cloud Avenue suivent un processus structuré en **14 étapes** impliquant plusieurs équipes : le client, les L2 Ops, le LAN Team, l'IAT (Infrastructure Automation Team) et l'équipe BSS (Business Support Systems).

## Les 14 étapes du provisioning

### Étape 1 — VLAN Ranges Provisioning
- **Acteur** : DNT/2IM
- **Action** : Provisioning des plages VLAN
- **Note** : Uniquement pour le **premier BMS** du tenant

### Étape 2 — Sélection de la configuration
- **Acteur** : Customer (client)
- **Action** : Le client sélectionne la configuration hardware souhaitée
- **Outils** : **Cloudstore** ou **Changeweb**

### Étape 3 — Création du ticket SWAN
- **Acteur** : L2 Ops
- **Action** : Création du ticket SWAN avec toutes les informations requises
- **Données** : BSS-ID, datacenter, type de serveur, config BIOS, OS, stockage, schéma IP

### Étape 4 — Demande de serveur
- **Acteur** : L2 Ops
- **Action** : Request for server(s) dans le référentiel HPE/NGP

### Étape 5 — Assignation au client
- **Acteur** : L2 Ops
- **Action** : Le(s) serveur(s) sont assignés au client dans le référentiel

### Étape 6 — Activation Usage Collector
- **Acteur** : BSS Team
- **Action** : Activation du collecteur d'usage pour la facturation

### Étape 7 — Assignation dans le référentiel
- **Acteur** : L2 Ops
- **Action** : Assignation définitive du serveur dans le référentiel de gestion

### Étape 8 — Création du fichier de configuration
- **Acteur** : L2 Ops
- **Action** : Création du fichier de configuration BMS au format **YAML**

### Étape 9 — Push vers Git
- **Acteur** : L2 Ops
- **Action** : Push du fichier YAML vers le **repository Git** (GitLab)
- **Note** : Cela déclenche le pipeline d'automatisation

### Étape 10 — Configuration réseau
- **Acteur** : LAN Team
- **Action** : Configuration de la connectivité BMS vers T1 (NSX) + assignation du VLAN BMS
- **Note** : Uniquement pour le **premier BMS** du tenant

### Étape 11 — Provisioning automatisé
- **Acteur** : IAT (Infrastructure Automation Team)
- **Action** : Démarrage du provisioning via **Ansible**
- **Sous-étapes** :
  1. Configuration des LUN (stockage)
  2. Configuration du BMS (matériel)
  3. Installation OS et configuration
  4. Enregistrement dans la CMDB
  5. Activation du monitoring

### Étape 12 — Détection Greenlake
- **Acteur** : Greenlake Collector
- **Action** : Détection automatique que le BMS est allumé

### Étape 13 — Notifications BSS
- **Acteur** : BSS Team
- **Action** : Le Usage Collector envoie les notifications de facturation

### Étape 14 — Welcome Mail
- **Acteur** : L2 Ops
- **Action** : Envoi du **BMS Welcome Mail** au client
- **Contenu** : Informations de connexion, documentation

### Étape 15 — Credentials
- **Distribution** des credentials via **CyberArk** (coffre-fort de mots de passe sécurisé)

## Outils du processus

| Outil | Rôle |
|-------|------|
| **Cloudstore/Changeweb** | Portail de commande client |
| **SWAN** | Système de ticketing |
| **HPE OneView/NGP** | Référentiel serveurs HPE |
| **GitLab** | Repository des fichiers YAML de config |
| **Ansible** | Automatisation du provisioning |
| **CyberArk** | Gestion sécurisée des credentials |
| **CMDB** | Base de données de gestion de configuration |

## Paramètres de provisioning

Lors de la commande, les paramètres suivants sont spécifiés :

### Identifiant et contrat
- **BSS Contract ID** : identifiant du contrat
- **Tenant Type** : type de tenant

### Stockage
- **System disk** : taille minimum 500 Go, classe de service
- **Data disks** : 1 à 6+, taille et classe pour chacun

### Réseau
- **Network design** : architecture réseau
- **Customer Tenant T1 name** : nom du tenant T1
- **BMS IP/prefix** : adresse IP du BMS
- **Gateway IP** : passerelle
- **VLAN ID** : identifiant VLAN
- **Hostname** : nom du serveur

### Configuration BIOS (Workload Profiles)

| Code | Profil |
|------|--------|
| **GPC** | General Purpose Computing |
| **GFC** | General Frontline Computing |
| **GTC** | General Throughput Computing |
| **VPE** | Virtualization Performance Enhanced |
| **VMX** | Virtualization Max Performance |
| **LOW** | Low Latency |
| **CRI** | Critical |
| **TAP** | Transactional Application Processing |
| **HPC** | High Performance Computing |
| **DSN** | Decision Support Nodes |
| **GPU** | GPU Computing |
| **IOT** | Internet of Things |
| **CTM** | Custom |

### Système d'exploitation
- **OS choice** : choix de l'OS
- **Version** : version spécifique
- **Flavour** : variante
- **Generation** : Gen10 ou Gen11`,
    quiz: [
      { question: "Combien d'étapes comporte le processus de commande BMS ?", options: ["10 étapes", "12 étapes", "14 étapes", "16 étapes"], correctIndex: 2 },
      { question: "Quel outil est utilisé pour l'automatisation du provisioning ?", options: ["Terraform", "Puppet", "Ansible", "Chef"], correctIndex: 2 },
      { question: "Dans quel format est le fichier de configuration BMS ?", options: ["JSON", "XML", "YAML", "TOML"], correctIndex: 2 },
      { question: "Quel outil sécurise la distribution des credentials ?", options: ["Vault", "CyberArk", "1Password", "Bitwarden"], correctIndex: 1 },
      { question: "Que signifie le profil BIOS 'HPC' ?", options: ["High Power Computing", "High Performance Computing", "Hybrid Private Cloud", "Hardware Performance Config"], correctIndex: 1 },
    ],
  },
  {
    id: 8,
    title: "Sauvegarde et reprise d'activité",
    description: "Agent NetBackup, backup local RMAN, dimensionnement, DRaaS avec VMware VCDA et stratégies de recovery.",
    icon: "DatabaseBackup",
    duration: "25 min",
    level: "Intermédiaire",
    content: `# Sauvegarde et reprise d'activité

## Stratégies de sauvegarde BMS

Cloud Avenue propose deux approches complémentaires pour la sauvegarde des BMS :

### 1. Agent NetBackup (Veritas)

La solution principale de sauvegarde repose sur l'agent **Veritas NetBackup**, le leader du marché selon Gartner :

- **Agent déployé dans l'OS** du BMS
- Connecté à l'**infrastructure de sauvegarde Cloud Avenue**
- **Inclusion/exclusion** de fichiers et répertoires configurables
- **Zone de boot non sauvegardable** — seules les données applicatives sont couvertes
- **Recovery granulaire** : restauration de fichiers individuels jusqu'à des systèmes entiers

#### Caractéristiques NetBackup

| Fonctionnalité | Détail |
|----------------|--------|
| **Technologie** | Veritas NetBackup (leader Gartner) |
| **Granularité** | Fichier individuel → système entier |
| **Coût restauration** | **Aucun** (contrairement à AWS/Azure) |
| **Prix** | ~0,035 €/Go |
| **Snapshot VMware** | Via vCenter (sans agent pour VMs associées) |

**Avantage compétitif** : chez AWS et Azure, chaque restauration génère des frais de transfer de données. Chez Cloud Avenue, **la restauration est gratuite**.

### 2. Backup local (client)

Le client peut installer sa propre solution de backup local :

- **RMAN** pour Oracle Database (recommandé)
- Solutions tierces selon les besoins
- Stockage de backup sur des LUN dédiées

#### Dimensionnement du backup local

La règle de dimensionnement est : **espace de stockage backup = 2x le stockage principal**

Exemple : pour un BMS avec 2 To de données, prévoir 4 To de stockage backup.

## Disaster Recovery (DRaaS)

Cloud Avenue propose un service de **Disaster Recovery as a Service (DRaaS)** basé sur **VMware VCDA (VMware Cloud Director Availability)** :

- **Réplication** des workloads entre les deux sites (Val de Reuil ↔ Chartres)
- **RPO** configurable selon les besoins
- **RTO** réduit grâce à la réplication continue
- **Failover automatique** ou manuel selon la configuration
- **Test de DR** possible sans impact sur la production

### Architecture bi-site

\`\`\`
Site 1 (Val de Reuil)          Site 2 (Chartres)
┌────────────────┐              ┌────────────────┐
│   BMS Prod     │──réplique──→│   BMS DR       │
│   Stockage SAN │              │   Stockage SAN │
│   Backup NB    │              │   Backup NB    │
└────────────────┘              └────────────────┘
       ↕ 100 km de distance ↕
\`\`\`

## Snapshot VMware

Pour les VMs associées aux environnements BMS (serveurs de rebond, etc.) :

- **Snapshot via vCenter** sans agent
- Capture instantanée de l'état de la VM
- Restauration rapide à un point dans le temps

## Bonnes pratiques

1. **Stratégie 3-2-1** : 3 copies des données, sur 2 médias différents, dont 1 hors site
2. **Tester régulièrement** les restaurations (au moins 1 fois par trimestre)
3. **Documenter** le plan de reprise d'activité (PRA)
4. **Dimensionner** correctement l'espace de backup (2x le stockage principal)
5. **Exclure** les fichiers temporaires et caches de la sauvegarde
6. **Chiffrer** les sauvegardes sensibles

## Comparaison coûts backup

| Fournisseur | Coût stockage | Coût restauration |
|-------------|--------------|-------------------|
| **Cloud Avenue** | ~0,035 €/Go | **Gratuit** |
| AWS (S3) | ~0,023 €/Go | 0,09 €/Go (egress) |
| Azure (Blob) | ~0,018 €/Go | 0,08 €/Go (egress) |`,
    quiz: [
      { question: "Quelle technologie de sauvegarde principale est utilisée chez Cloud Avenue ?", options: ["Veeam", "Commvault", "Veritas NetBackup", "Acronis"], correctIndex: 2 },
      { question: "Quel est le prix approximatif du stockage de backup chez Cloud Avenue ?", options: ["~0,01 €/Go", "~0,035 €/Go", "~0,10 €/Go", "~0,50 €/Go"], correctIndex: 1 },
      { question: "Quel est le ratio de dimensionnement backup recommandé ?", options: ["1x le stockage principal", "1,5x le stockage principal", "2x le stockage principal", "3x le stockage principal"], correctIndex: 2 },
      { question: "La restauration des données chez Cloud Avenue est-elle facturée ?", options: ["Oui, 0,09 €/Go", "Oui, 0,05 €/Go", "Non, elle est gratuite", "Selon le volume"], correctIndex: 2 },
      { question: "Quelle solution de backup local est recommandée pour Oracle ?", options: ["pg_dump", "mysqldump", "RMAN", "Data Pump uniquement"], correctIndex: 2 },
    ],
  },
  {
    id: 9,
    title: "Sécurité et compliance",
    description: "Datacenters France, SecNumCloud, ISO 27001, RGPD, isolation physique, iLO sécurisé, chiffrement AES-256 et souveraineté.",
    icon: "Shield",
    duration: "30 min",
    level: "Avancé",
    content: `# Sécurité et compliance

## Datacenters souverains

Les BMS Cloud Avenue sont hébergés dans **2 datacenters en France** :

| Site | Localisation | Distance |
|------|-------------|----------|
| **Val de Reuil** | Normandie | — |
| **Chartres** | Centre-Val de Loire | 100 km du site 1 |

Cette distance de **100 km** entre les deux sites garantit la survie des données en cas de sinistre majeur affectant l'un des sites, tout en maintenant une latence réseau suffisamment faible pour la réplication synchrone.

## Certifications et conformité

| Certification | Statut | Description |
|--------------|--------|-------------|
| **ISO 27001** | ✅ Obtenue | Système de management de la sécurité de l'information |
| **RGPD** | ✅ Conforme | Protection des données personnelles européennes |
| **SecNumCloud** | 🟡 En cours (ANSSI) | Qualification cloud de confiance de l'ANSSI |

### SecNumCloud

La certification **SecNumCloud** est délivrée par l'**ANSSI** (Agence Nationale de la Sécurité des Systèmes d'Information). Elle garantit que le fournisseur cloud respecte les plus hauts standards de sécurité français. Cloud Avenue est **en cours de certification**.

## Isolation physique

### Zoning SAN

Chaque client dispose d'un **zoning SAN dédié** : les LUN de stockage sont physiquement isolées au niveau du fabric SAN. Il est impossible pour un autre client d'accéder aux données d'un autre.

### VLAN dédié

Un **VLAN privé** est créé pour chaque BMS, assurant l'isolation du trafic réseau. Le trafic d'un client ne traverse jamais le réseau d'un autre client.

### Isolation serveur

Le BMS étant un serveur **physique dédié**, il n'y a aucun partage de ressources matérielles. L'isolation est totale : CPU, RAM, firmware, BIOS — tout est exclusif au client.

## Administration distante sécurisée (iLO)

L'accès à l'interface d'administration **HPE iLO** (Integrated Lights-Out) est sécurisé par :

- **Proxy HTTPS** : tout accès iLO passe par un proxy sécurisé
- **Filtrage par sous-réseau** : règles d'accès limitant les IP autorisées
- **Chiffrement TLS** pour toutes les communications
- **Authentification forte** requise

L'iLO permet :
- Allumage/extinction à distance
- Console KVM virtuelle
- Montage de média virtuel
- Monitoring matériel (températures, ventilateurs, alimentations)
- Mise à jour firmware

## Chiffrement

| Type | Algorithme | Usage |
|------|-----------|-------|
| **Données au repos** | AES-256 | Stockage SAN |
| **Données en transit** | TLS 1.2+ | Communications réseau |
| **HSM** | Option disponible | Gestion de clés cryptographiques matérielles |

L'option **HSM (Hardware Security Module)** est disponible pour les clients nécessitant une gestion de clés cryptographiques certifiée (FIPS 140-2, eIDAS).

## Micro-segmentation NSX-T

VMware NSX-T offre un **pare-feu distribué stateful** pour la micro-segmentation réseau :

- Règles de sécurité **par workload** (pas seulement par réseau)
- Filtrage **stateful** avec suivi des connexions
- Politiques de sécurité **granulaires** (application, utilisateur, groupe)
- **Logs** et audit trail de toutes les décisions de sécurité

**Note importante** : le pare-feu distribué NSX-T ne s'applique pas directement au trafic du BMS. Les règles de sécurité BMS sont gérées au niveau de la passerelle T0.

## Gestion des credentials

**CyberArk** est utilisé pour la gestion sécurisée des credentials :

- **Coffre-fort numérique** pour les mots de passe
- **Rotation automatique** des credentials
- **Audit trail** de tous les accès
- **Distribution sécurisée** des identifiants aux clients

## Souveraineté des données

- Données hébergées **exclusivement en France**
- Soumises au **droit français**
- Conformité avec la **réglementation européenne**
- **Aucun transfert** de données hors Union Européenne
- Pas de soumission aux lois extraterritoriales (CLOUD Act, FISA)

## Anti-DDoS

La protection **Anti-DDoS de plateforme** est incluse dans tous les services :
- Détection automatique des attaques volumétriques
- Mitigation en temps réel
- Pas de surcoût`,
    quiz: [
      { question: "Quelle est la distance entre les deux datacenters Cloud Avenue ?", options: ["50 km", "100 km", "200 km", "500 km"], correctIndex: 1 },
      { question: "Quel organisme délivre la certification SecNumCloud ?", options: ["CNIL", "ANSSI", "ISO", "ENISA"], correctIndex: 1 },
      { question: "Quel algorithme de chiffrement est utilisé pour les données au repos ?", options: ["AES-128", "AES-256", "RSA-2048", "3DES"], correctIndex: 1 },
      { question: "Quel outil gère les credentials de manière sécurisée chez Cloud Avenue ?", options: ["HashiCorp Vault", "AWS Secrets Manager", "CyberArk", "1Password"], correctIndex: 2 },
      { question: "Le pare-feu distribué NSX-T s'applique-t-il directement au BMS ?", options: ["Oui, directement", "Non, les règles sont au niveau T0", "Uniquement pour les BMS GPU", "Selon la configuration"], correctIndex: 1 },
    ],
  },
  {
    id: 10,
    title: "BMS GPU pour l'IA/ML",
    description: "Configurations GPU NVIDIA H100 et L40s, cas d'usage IA, performances, benchmarks vs concurrence et architecture.",
    icon: "Gpu",
    duration: "25 min",
    level: "Avancé",
    content: `# BMS GPU pour l'IA/ML

## Configurations GPU disponibles

Cloud Avenue propose des BMS équipés de GPU NVIDIA pour les workloads d'intelligence artificielle et de machine learning :

### bms.cray — La référence IA

| Caractéristique | Détail |
|-----------------|--------|
| **CPU** | 72 cœurs |
| **RAM** | 4 096 Go (4 To) |
| **GPU** | 8x NVIDIA H100 NVL 94 Go SXM |
| **Prix** | 20 397 €/mois |
| **Particularité** | **Configuration unique sur le marché français** |

Le bms.cray avec **8x H100** est la configuration IA la plus puissante disponible en France. **Seule Cloud Avenue la propose** sur le marché français.

### BMS 4xH100

| Caractéristique | Détail |
|-----------------|--------|
| **GPU** | 4x NVIDIA H100 NVL |
| **Prix** | Sur devis |
| **Usage** | Inférence, fine-tuning, RAG |

### BMS L40s

| Caractéristique | Détail |
|-----------------|--------|
| **GPU** | 2 à 4x NVIDIA L40s |
| **Prix** | Sur devis |
| **Usage** | Inférence, visualisation, workloads mixtes |

## GPU NVIDIA H100 — Spécifications

Le NVIDIA H100 NVL est le GPU de référence pour l'IA :

- **Architecture** : Hopper
- **Mémoire** : 94 Go HBM3
- **Bande passante mémoire** : 3,35 To/s
- **Interconnexion** : NVLink 4.0 (900 Go/s)
- **Performances FP16** : 1 979 TFLOPS (avec sparsity)
- **Performances INT8** : 3 958 TOPS (avec sparsity)

## Cas d'usage

### 1. Inférence IA

Déploiement de modèles de langage (LLM), modèles de vision, etc. :
- Serving de modèles GPT, LLaMA, Mistral
- API d'inférence temps réel
- Batch processing de grandes quantités de données

### 2. RAG (Retrieval-Augmented Generation)

Systèmes de question-réponse enrichis par des documents :
- Embedding de documents
- Recherche sémantique
- Génération augmentée par le contexte

### 3. Fine-tuning

Adaptation de modèles pré-entraînés à des données spécifiques :
- Fine-tuning de LLM sur des données métier
- Transfer learning pour la vision
- LoRA / QLoRA pour l'optimisation mémoire

### 4. Entraînement de modèles

Entraînement complet de modèles personnalisés :
- Cluster multi-GPU (8x H100)
- Entraînement distribué
- Connexion **Infiniband** possible entre serveurs

## Performances et benchmarks

### Cloud Avenue vs OVH (GenAI)

| Métrique | Cloud Avenue (4xH100) | OVH |
|----------|----------------------|-----|
| **Tokens/sec (inférence)** | ~40 tokens/sec | < 30 tokens/sec |
| **Performance relative** | **+17%** | Référence |

Cloud Avenue offre **17% de performances en plus qu'OVH** pour les workloads GenAI, grâce aux GPU H100 NVL de dernière génération et à l'interconnexion NVLink optimisée.

## OS supportés pour GPU

| OS | Drivers |
|----|---------|
| **Ubuntu Server** | CUDA préinstallé (recommandé) |
| **Red Hat Enterprise Linux** | CUDA préinstallé |

Les **drivers CUDA NVIDIA** sont préinstallés sur les images OS, permettant un déploiement immédiat sans configuration manuelle des drivers.

## Architecture cluster GPU

Pour les workloads nécessitant plusieurs serveurs GPU :

\`\`\`
BMS GPU #1 (8xH100)
       │
   Infiniband ──── BMS GPU #2 (8xH100)
       │                    │
   Infiniband ──── BMS GPU #3 (8xH100)
\`\`\`

- **Interconnexion Infiniband** possible entre les serveurs
- Bande passante de **400 Gb/s** par lien
- Idéal pour l'entraînement distribué de grands modèles

## Comparaison tarifs GPU

| Fournisseur | Config | Prix estimé/mois |
|-------------|--------|-----------------|
| **Cloud Avenue** | 8xH100 (bms.cray) | 20 397 € |
| **OVH** | 4xH100 | ~15 000 € |
| **AWS** | p5.48xlarge (8xH100) | ~80 000 € |

Cloud Avenue offre un rapport performance/prix très compétitif par rapport aux hyperscalers.`,
    quiz: [
      { question: "Combien de GPU H100 contient la configuration bms.cray ?", options: ["2", "4", "6", "8"], correctIndex: 3 },
      { question: "Quel est le prix mensuel du bms.cray ?", options: ["10 000 €", "15 000 €", "20 397 €", "30 000 €"], correctIndex: 2 },
      { question: "De combien de % Cloud Avenue surpasse-t-il OVH en performances GenAI ?", options: ["5%", "10%", "17%", "25%"], correctIndex: 2 },
      { question: "Quelle interconnexion est possible entre les serveurs GPU ?", options: ["Ethernet 10G", "Fibre Channel", "Infiniband", "Thunderbolt"], correctIndex: 2 },
      { question: "Quel OS est recommandé pour les workloads IA/ML sur BMS GPU ?", options: ["Windows Server", "SUSE Linux", "Ubuntu Server", "Oracle Linux"], correctIndex: 2 },
    ],
  },
  {
    id: 11,
    title: "Cas d'usage et positionnement",
    description: "SAP HANA, Oracle, IA/ML, HPC, conformité réglementaire et benchmarks concurrentiels détaillés vs OVH, AWS, Oracle Cloud.",
    icon: "Target",
    duration: "25 min",
    level: "Débutant",
    content: `# Cas d'usage et positionnement

## Cas d'usage principaux

### 1. Bases de données in-memory — SAP HANA

Le BMS Cloud Avenue est **certifié SAP HANA** dans sa configuration XXL :

- **bms.gen11.xxl-C** : 64 cœurs, 4 096 Go RAM → certifié SAP HANA
- Idéal pour la **migration SAP ECC vers SAP HANA** (fin de support SAP ECC prévue en 2027)
- Performances in-memory optimales grâce à la RAM massive

### 2. Optimisation licences Oracle

Les configurations XSmall sont particulièrement intéressantes pour Oracle :
- **8 cœurs** seulement → réduction significative du coût des licences Oracle
- Jusqu'à **768 Go de RAM** pour les bases de données volumineuses
- Data LUN **Unformatted** pour Oracle RAC/ASM
- Meilleur ratio RAM/cœurs du marché pour Oracle

### 3. IA / Machine Learning

Avec les BMS GPU :
- **CRAY 8xH100** : entraînement de grands modèles, unique en France
- **4xH100** : inférence et fine-tuning
- **L40s** : workloads mixtes IA + visualisation
- **40 tokens/sec** en inférence (4xH100), +17% vs OVH

### 4. Applications critiques non virtualisables

Certaines applications nécessitent un accès direct au matériel :
- Applications legacy avec drivers spécifiques
- Logiciels avec protection hardware (dongles)
- Workloads temps réel strict

### 5. HPC (High Performance Computing)

- Calcul scientifique intensif
- Simulations numériques
- Modélisation et rendu 3D
- Profil BIOS **HPC** dédié

### 6. Analytics massives et Big Data

- Traitement de gros volumes de données
- Data warehousing
- ETL haute performance
- Configurations XL/XXL avec RAM massive

### 7. Conformité forte

Pour les secteurs réglementés :
- **Santé** : isolation physique, données en France
- **Secteur public** : souveraineté, SecNumCloud en cours
- **Bancaire** : conformité, audit trail, chiffrement AES-256

### 8. Migration SAP ECC → SAP HANA

La fin du support SAP ECC est prévue pour **2027**. Les entreprises doivent migrer vers SAP HANA :
- BMS XXL certifié SAP HANA
- RAM massive (jusqu'à 4 To) pour les grosses bases SAP
- Support Cloud Avenue pour l'accompagnement migration

## Benchmark concurrentiel

### Avantages Cloud Avenue vs concurrents

| Critère | Cloud Avenue | OVH | AWS | Oracle Cloud |
|---------|-------------|-----|-----|-------------|
| **RAM max** | 4 096 Go | 2 048 Go | 24 576 Go | 3 072 Go |
| **+1 To RAM < 3 000 €** | ✅ Oui | ❌ Non | ❌ Non | ❌ Non |
| **Gen CPU** | 5ème gen Intel | 2ème gen Intel | Mixte | 3ème gen |
| **Certifié SAP** | ✅ XXL | ❌ | ✅ | ✅ |
| **GPU 8xH100** | ✅ Unique FR | ❌ | ✅ | ❌ |
| **SecNumCloud** | En cours | ✅ | ❌ | ❌ |
| **Données France** | ✅ | ✅ | ❌ | ❌ |

### Points forts Cloud Avenue

1. **Seul fournisseur** avec plus de 1 To de RAM pour moins de 3 000 €/mois
2. **Gen11** = +30% de performance vs Gen10 (CPU Intel Xeon 5ème gen vs 2ème gen chez OVH)
3. **Meilleur prix/Go RAM** du marché français
4. **Prix/core CPU** compétitif vs Oracle et AWS
5. **BMS GPU** : 17% meilleures performances qu'OVH pour GenAI
6. **Configuration CRAY 8xH100** unique sur le marché français
7. **Pas de "noisy neighbor"** — isolation physique totale

### Points d'amélioration

- **SLA 99,95%** (certains concurrents offrent 99,99%)
- Supervision en cours de mise en place
- Customer journey à améliorer
- Pare-feu distribué ne s'applique pas directement au BMS`,
    quiz: [
      { question: "Quelle configuration BMS est certifiée SAP HANA ?", options: ["Medium-C", "XL-A", "XXL (famille)", "Small-C"], correctIndex: 2 },
      { question: "En quelle année est prévue la fin de support SAP ECC ?", options: ["2025", "2026", "2027", "2030"], correctIndex: 2 },
      { question: "Quel est le SLA de disponibilité des BMS Cloud Avenue ?", options: ["99,9%", "99,95%", "99,99%", "99,999%"], correctIndex: 1 },
      { question: "Quel avantage unique Cloud Avenue a-t-il avec le bms.cray ?", options: ["Prix le plus bas", "Seule config 8xH100 en France", "100% renouvelable", "SLA 99,99%"], correctIndex: 1 },
      { question: "De combien le Gen11 est-il plus performant que le Gen10 ?", options: ["+10%", "+20%", "+30%", "+50%"], correctIndex: 2 },
    ],
  },
  {
    id: 12,
    title: "Tarification et facturation",
    description: "Grille tarifaire complète des 15 configs Gen11 + GPU, facturation mensuelle, prorata, options et API Usage Collector.",
    icon: "Receipt",
    duration: "20 min",
    level: "Débutant",
    content: `# Tarification et facturation

## Modèle de facturation

La facturation Cloud Avenue pour les BMS suit un modèle simple et transparent :

- **Facturation mensuelle** par composant (serveur, stockage, réseau, licence)
- **Premier mois au prorata temporis** — vous ne payez que les jours utilisés
- **Pas d'engagement** de durée pour les BMS standards
- **Réservation longue durée** = tarif dégressif (sur devis)
- **Try & Buy** / credit voucher disponible pour les PoC

## Grille tarifaire BMS Gen11

### Famille XSmall (8 cœurs, Intel Xeon Gold 6534)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.Xsmall-A | 256 Go | **1 302 €** |
| bms.gen11.Xsmall-B | 512 Go | **1 362 €** |
| bms.gen11.Xsmall-C | 768 Go | **1 421 €** |

### Famille Small (16 cœurs, Intel Xeon Gold 6526Y)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.small-A | 256 Go | **1 244 €** |
| bms.gen11.small-B | 512 Go | **1 303 €** |
| bms.gen11.small-C | 768 Go | **1 362 €** |

### Famille Medium (32 cœurs, Intel Xeon Gold 6548Y+)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.medium-A | 512 Go | **1 448 €** |
| bms.gen11.medium-B | 1 024 Go | **1 566 €** |
| bms.gen11.medium-C | 1 536 Go | **1 755 €** |

### Famille XL (64 cœurs, 2x Intel Xeon Gold 6548Y+)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.xl-A | 1 024 Go | **1 954 €** |
| bms.gen11.xl-B | 1 536 Go | **2 072 €** |
| bms.gen11.xl-C | 2 048 Go | **2 190 €** |

### Famille XXL (64 cœurs, 2x Intel Xeon Gold 6548Y+, RAM étendue)

| Modèle | RAM | Prix/mois |
|--------|-----|-----------|
| bms.gen11.xxl-A | 2 048 Go | **2 336 €** |
| bms.gen11.xxl-B | 3 072 Go | **2 619 €** |
| bms.gen11.xxl-C | 4 096 Go | **2 903 €** |

## Tarifs BMS GPU

| Modèle | GPU | Prix/mois |
|--------|-----|-----------|
| bms.cray | 8x NVIDIA H100 NVL 94GB | **20 397 €** |
| BMS 4xH100 | 4x NVIDIA H100 NVL | Sur devis |
| BMS L40s | 2-4x NVIDIA L40s | Sur devis |

## Tarifs stockage

### Stockage SAN (System & Data LUN)

Le stockage est facturé en complément du serveur, selon la classe et la taille choisies.

### Stockage réseau (NetApp NAS)

| Gamme | Prix/Go/mois |
|-------|-------------|
| Entrée | 0,04 € |
| Milieu | 0,0689 € |
| Haut | 0,1184 € |

### Sauvegarde (NetBackup)

- Prix : **~0,035 €/Go**
- Restauration : **gratuite** (pas de frais d'egress)

## Tarifs Internet sortant

| Volume mensuel | Prix/Go |
|---------------|---------|
| 0 – 15 Go | **Offert** |
| 15 Go – 1 To | 0,08 € |
| 1 – 5 To | 0,07 € |
| 5 – 10 To | 0,06 € |
| 10 – 100 To | 0,055 € |
| > 100 To | 0,05 € |

## Tarif Load Balancer

- **AVI Load Balancer** VMware : à partir de **310 €/mois** (20 VIP)
- Inclut : L4/L7, WAF, analytics

## Options commerciales

### Try & Buy

Programme permettant de tester les BMS avant engagement :
- **Credit voucher** pour un Proof of Concept (PoC)
- Durée définie selon le projet
- Conversion en contrat si le PoC est validé

### Réservation longue durée

Pour les projets à long terme :
- **Tarif dégressif** selon la durée d'engagement
- **Sur devis** — contacter l'équipe commerciale
- Réductions significatives pour engagements 12/24/36 mois

## Suivi de consommation

- **Portail Cloud Store** : tableau de bord de consommation en temps réel
- **API Usage Collector** : pour le reporting et le billing automatisé
- **Facture détaillée** par composant chaque mois`,
    quiz: [
      { question: "Quel est le prix du BMS Gen11 le moins cher ?", options: ["1 244 €/mois (small-A)", "1 302 €/mois (Xsmall-A)", "1 362 €/mois (small-C)", "1 448 €/mois (medium-A)"], correctIndex: 0 },
      { question: "Comment est facturé le premier mois d'un BMS ?", options: ["Mois complet", "Au prorata temporis", "Gratuit", "50% du prix"], correctIndex: 1 },
      { question: "Y a-t-il un engagement de durée pour les BMS standards ?", options: ["12 mois minimum", "6 mois minimum", "3 mois minimum", "Pas d'engagement"], correctIndex: 3 },
      { question: "Quel est le prix du bms.cray (8xH100) ?", options: ["10 000 €/mois", "15 000 €/mois", "20 397 €/mois", "25 000 €/mois"], correctIndex: 2 },
      { question: "Quel volume d'Internet sortant est offert gratuitement ?", options: ["5 Go", "10 Go", "15 Go", "50 Go"], correctIndex: 2 },
    ],
  },
  {
    id: 13,
    title: "Architecture technique détaillée (HLD)",
    description: "HPE Synergy 480 Gen11, architecture SAN, IP Storage, réseau, automation Ansible/GitLab, monitoring et dual site.",
    icon: "Building2",
    duration: "35 min",
    level: "Avancé",
    content: `# Architecture technique détaillée (HLD)

## Plateforme matérielle : HPE Synergy 480 Gen11

### Caractéristiques du châssis HPE Synergy

Le BMS Cloud Avenue repose sur la plateforme **HPE Synergy**, un système composable :

- **Châssis modulaire** : héberge plusieurs lames de calcul
- **HPE Synergy 480 Gen11** : lame de calcul utilisée pour les BMS
- **Interconnect modules** : modules réseau intégrés au châssis
- **Management** : HPE OneView pour la gestion centralisée

### Processeurs

| Famille | Processeur | Cœurs/Threads | Fréquence |
|---------|-----------|---------------|-----------|
| XSmall | Intel Xeon Gold 6534 | 8c/16T | 3.9-4.2 GHz |
| Small | Intel Xeon Gold 6526Y | 16c/32T | 2.8-3.9 GHz |
| Medium/XL/XXL | Intel Xeon Gold 6548Y+ | 32c/64T (×1 ou ×2) | 2.5-4.1 GHz |

## Architecture SAN

### Zoning et fabric

\`\`\`
BMS Server
    │
    ├── HBA Port A ──→ SAN Fabric A ──→ Storage Array
    │
    └── HBA Port B ──→ SAN Fabric B ──→ Storage Array
\`\`\`

- **Dual-fabric SAN** : deux chemins indépendants pour la redondance
- **Zoning par client** : isolation physique au niveau du fabric
- **Multipath I/O** : basculement automatique entre les deux chemins
- **LUN masking** : chaque serveur ne voit que ses propres LUN

### Classes de stockage SAN

Le stockage SAN offre différentes classes de performance (IOPS/To) :
- System LUN : Gold (800), Platinum 2K (1 400), Platinum 3K (3 400)
- Data LUN : Unformatted (480), Gold (800), Platinum 2K (2 400), Platinum 7K (5 600)

## Architecture IP Storage

Pour les workloads nécessitant du stockage IP :
- **iSCSI** : protocole de stockage bloc sur réseau IP
- **NFS v3** : stockage fichier via NetApp
- **Réseau dédié** : VLAN séparé pour le trafic stockage
- **Jumbo Frames** (MTU 9000) pour optimiser les performances

## Architecture réseau

### Couches réseau

\`\`\`
Internet (Orange AS5511 - Tier One)
           │
    ┌──────┴──────┐
    │  Anti-DDoS  │
    └──────┬──────┘
           │
    ┌──────┴──────┐
    │  Gateway T0 │ (par BMS - NSX-T)
    └──────┬──────┘
           │
    ┌──────┴──────┐
    │  VLAN BMS   │ (privé par client)
    └──────┬──────┘
           │
    ┌──────┴──────┐
    │  HPE Synergy│
    │  Interconnect│
    └──────┬──────┘
           │
    ┌──────┴──────┐
    │  BMS Server │
    └─────────────┘
\`\`\`

### Connectivité externe

- **VPN IPsec/L2VPN** : tunnel chiffré (gratuit)
- **Cross Connect** : lien L3 vers colocation
- **BVPN** : MPLS Orange (220 pays)
- **Internet** : Tier One Orange AS5511

## Automation

### Pipeline de provisioning

\`\`\`
CloudStore (commande)
    │
    ▼
SWAN (ticket)
    │
    ▼
L2 Ops (config YAML)
    │
    ▼
GitLab (push YAML)
    │
    ▼
Ansible (provisioning automatisé)
    │
    ├── Config LUN (stockage)
    ├── Config BMS (matériel)
    ├── Installation OS
    ├── Register CMDB
    └── Activate monitoring
\`\`\`

### Outils d'automation

| Outil | Rôle |
|-------|------|
| **Ansible** | Provisioning et configuration automatisés |
| **GitLab** | Repository des fichiers YAML, CI/CD |
| **HPE OneView** | Gestion du matériel HPE Synergy |
| **CMDB** | Inventaire des assets |

## Monitoring

| Outil | Rôle |
|-------|------|
| **Shinken** | Monitoring infrastructure (legacy) |
| **Zabbix** | Monitoring infrastructure (nouveau) |
| **SNMP** | Collecte de métriques matérielles |

## Architecture dual site

### Stretched VLAN

Les deux datacenters (Val de Reuil et Chartres) sont connectés via un **Stretched VLAN** permettant :

- **Extension L2** entre les deux sites
- **Mobilité des workloads** entre sites
- **Disaster Recovery** avec basculement rapide
- Latence inter-site maîtrisée (~2 ms)

### Plan de reprise d'activité (DRP)

| Composant | RPO | RTO |
|-----------|-----|-----|
| Stockage SAN | Selon réplication | 4h |
| NetApp NAS | 15 min (réplication bi-site) | 2h |
| BMS compute | N/A (reprovisionning) | 4-8h |

Le DRP repose sur la combinaison de :
- **Réplication stockage** entre les deux sites
- **VMware VCDA** pour le disaster recovery managé
- **Backup NetBackup** comme dernier recours`,
    quiz: [
      { question: "Quel type de lame de calcul est utilisé pour les BMS Gen11 ?", options: ["Dell PowerEdge", "HPE ProLiant DL", "HPE Synergy 480", "Lenovo ThinkSystem"], correctIndex: 2 },
      { question: "Combien de fabrics SAN sont configurés pour la redondance ?", options: ["1 (simple)", "2 (dual-fabric)", "3 (triple)", "4 (quad)"], correctIndex: 1 },
      { question: "Quel outil gère le repository des fichiers YAML de configuration ?", options: ["GitHub", "GitLab", "Bitbucket", "SVN"], correctIndex: 1 },
      { question: "Quelle est la latence approximative entre les deux datacenters ?", options: ["< 1 ms", "~2 ms", "~10 ms", "~50 ms"], correctIndex: 1 },
      { question: "Quel outil de monitoring remplace progressivement Shinken ?", options: ["Prometheus", "Nagios", "Zabbix", "Datadog"], correctIndex: 2 },
    ],
  },
  {
    id: 14,
    title: "Services managés et support",
    description: "Support 24/7, SLA 99,95%, services managés OS/sécurité/backup/monitoring, portails de gestion et escalade.",
    icon: "Headphones",
    duration: "20 min",
    level: "Débutant",
    content: `# Services managés et support

## Support 24/7

Cloud Avenue propose un support **24 heures sur 24, 7 jours sur 7** pour les incidents infrastructure :

- **Téléphone** : ligne directe support technique
- **Portail de ticketing** : création et suivi des incidents en ligne
- **Email** : pour les demandes non urgentes
- **Chat** : support en ligne

## SLA (Service Level Agreement)

| Métrique | Valeur |
|----------|--------|
| **Disponibilité** | **99,95%** |
| **Temps de réponse (P1)** | < 15 minutes |
| **Pénalités** | Crédits de service en cas de non-respect |

Le SLA de 99,95% correspond à un temps d'indisponibilité maximum de **~4,4 heures par an**.

### Classification des incidents

| Priorité | Description | Temps de réponse |
|----------|-------------|-----------------|
| **P1 — Critique** | Service down, impact majeur | < 15 min |
| **P2 — Haute** | Dégradation importante | < 30 min |
| **P3 — Moyenne** | Impact limité | < 2h |
| **P4 — Basse** | Demande d'information | < 8h |

## Services managés

Cloud Avenue propose des services managés optionnels pour les BMS :

### 1. Gestion OS
- Mises à jour et patchs de sécurité
- Monitoring de la santé OS
- Configuration et tuning
- Support OS de niveau 2

### 2. Sécurité managée
- Hardening OS selon les best practices
- Monitoring des vulnérabilités (CVE)
- Gestion des certificats
- Audit de sécurité régulier

### 3. Backup managé
- Configuration et gestion de NetBackup
- Monitoring des jobs de sauvegarde
- Tests de restauration planifiés
- Alerting en cas d'échec

### 4. Monitoring managé
- Configuration des sondes et alertes
- Dashboard personnalisé
- Alerting proactif
- Rapports de disponibilité

## Prestations d'accompagnement

Au-delà des services managés, Cloud Avenue propose des prestations d'expertise :

| Prestation | Description |
|-----------|-------------|
| **Architecture** | Conseil et design d'architecture BMS |
| **Migration** | Accompagnement migration vers BMS |
| **Optimisation** | Audit et optimisation des performances |
| **Formation** | Formation technique sur mesure |

## Processus d'escalade

### Niveaux de support

1. **N1 — Support de premier niveau** : incidents simples, FAQ, triage
2. **N2 — Support technique** : diagnostic avancé, configuration, résolution
3. **N3 — Ingénierie** : problèmes complexes, bugs, Root Cause Analysis (RCA)

### Flux d'escalade

\`\`\`
Client → Ticket (portail/téléphone)
    │
    ▼
N1 — Triage et résolution simple
    │ (si non résolu)
    ▼
N2 — Diagnostic et résolution avancée
    │ (si non résolu)
    ▼
N3 — Ingénierie et RCA
    │ (si vendor)
    ▼
Constructeur (HPE, VMware, etc.)
\`\`\`

## Portails de gestion

| Portail | Usage |
|---------|-------|
| **VCD Portal** | Gestion des ressources virtualisées (VMs, réseaux, stockage) |
| **Espace Client Cloud** | Vue d'ensemble, facturation, contrats |
| **Cloud Store** | Catalogue de services, commandes, suivi consommation |

## Reporting

- **Rapports de disponibilité** mensuels
- **Rapports de performance** sur demande
- **Rapports de sécurité** trimestriels
- **Comité de pilotage** régulier avec le client`,
    quiz: [
      { question: "Quel est le SLA de disponibilité des BMS Cloud Avenue ?", options: ["99,9%", "99,95%", "99,99%", "99,999%"], correctIndex: 1 },
      { question: "Quel est le temps de réponse pour un incident P1 (critique) ?", options: ["< 5 min", "< 15 min", "< 30 min", "< 1h"], correctIndex: 1 },
      { question: "Combien de niveaux de support technique existent ?", options: ["2 (N1, N2)", "3 (N1, N2, N3)", "4 (N1 à N4)", "5 (N1 à N5)"], correctIndex: 1 },
      { question: "Quel portail permet de suivre la consommation et passer des commandes ?", options: ["VCD Portal", "Espace Client Cloud", "Cloud Store", "Azure Portal"], correctIndex: 2 },
      { question: "À combien d'heures d'indisponibilité par an correspond un SLA de 99,95% ?", options: ["~1h", "~4,4h", "~8,8h", "~24h"], correctIndex: 1 },
    ],
  },
  {
    id: 15,
    title: "Onboarding checklist",
    description: "Checklist complète pour un nouveau collaborateur BMS : outils, accès, contacts clés, parcours de formation recommandé.",
    icon: "ClipboardCheck",
    duration: "15 min",
    level: "Débutant",
    content: `# Onboarding checklist nouveau collaborateur BMS

## Bienvenue dans l'équipe BMS Cloud Avenue !

Ce module est votre guide d'intégration. Suivez chaque étape pour être opérationnel rapidement.

## Semaine 1 : Accès et découverte

### Accès à obtenir

- [ ] **Compte Active Directory / SSO** Orange Business
- [ ] **Accès portail Cloud Avenue** (VCD Portal, Cloud Store)
- [ ] **Accès VPN** entreprise
- [ ] **Accès monitoring** (Zabbix/Shinken)
- [ ] **Accès ITSM** (système de ticketing)
- [ ] **Accès GitLab** interne (repository YAML BMS)
- [ ] **Accès Slack / Teams** — canaux BMS
- [ ] **Accès CyberArk** pour les credentials client

### Formations obligatoires semaine 1

| Module | Titre | Durée |
|--------|-------|-------|
| 1 | Introduction au Bare Metal Server | 25 min |
| 2 | L'écosystème Cloud Avenue | 25 min |
| 3 | Catalogue des configurations BMS Gen11 | 30 min |

## Semaine 2 : Approfondissement technique

### Formations techniques

| Module | Titre | Durée |
|--------|-------|-------|
| 4 | Systèmes d'exploitation supportés | 20 min |
| 5 | Stockage BMS en détail | 30 min |
| 6 | Réseau et connectivité | 30 min |
| 7 | Processus de commande et provisioning | 35 min |

### Hands-on pratiques

- [ ] **Observer** un provisioning BMS en environnement de test
- [ ] **Lire** un fichier YAML de configuration BMS
- [ ] **Explorer** le portail VCD et Cloud Store
- [ ] **Créer** un ticket de test dans l'ITSM

## Semaine 3 : Sécurité et opérations

### Formations

| Module | Titre | Durée |
|--------|-------|-------|
| 8 | Sauvegarde et reprise d'activité | 25 min |
| 9 | Sécurité et compliance | 30 min |
| 14 | Services managés et support | 20 min |

### Pratique

- [ ] **Shadow** d'un ingénieur senior pendant une intervention
- [ ] **Participer** à un comité de pilotage client (en observation)
- [ ] **Lire** les runbooks opérationnels principaux

## Semaine 4 : Spécialisations et validation

### Formations restantes

| Module | Titre | Durée |
|--------|-------|-------|
| 10 | BMS GPU pour l'IA/ML | 25 min |
| 11 | Cas d'usage et positionnement | 25 min |
| 12 | Tarification et facturation | 20 min |
| 13 | Architecture technique détaillée | 35 min |

### Validation

- [ ] **Compléter** les 15 modules de formation (100%)
- [ ] **Réussir** tous les quiz avec un score ≥ 60%
- [ ] **Prise en charge** d'un premier ticket N1 supervisé
- [ ] **Participation** à un on-call supervisé

## Outils à connaître

| Outil | Usage | Accès |
|-------|-------|-------|
| **Cloud Store** | Commandes et suivi consommation | Portail web |
| **VCD Portal** | Gestion des ressources | Portail web |
| **SWAN** | Ticketing interne | Application interne |
| **GitLab** | Repository configs YAML | git.orange-business.com |
| **Ansible** | Automation provisioning | Ansible Tower |
| **CyberArk** | Gestion credentials | Portail sécurisé |
| **HPE OneView** | Gestion matériel HPE | Console HPE |
| **Zabbix** | Monitoring infrastructure | Dashboard web |
| **Espace Client Cloud** | Vue client, facturation | Portail web |

## Contacts clés

| Rôle | Description |
|------|-------------|
| **Votre Manager** | Responsable direct, objectifs, congés |
| **Buddy** | Collaborateur référent pour les questions du quotidien |
| **L2 Ops Lead** | Responsable équipe opérations niveau 2 |
| **LAN Team** | Équipe réseau pour les questions de connectivité |
| **IAT** | Infrastructure Automation Team — provisioning |
| **BSS Team** | Business Support Systems — facturation |
| **Support N3** | Équipe ingénierie pour escalade technique |

## Documentation de référence

1. **CLAUDE.md** (ce site) — Référence complète BMS Hub
2. **Wiki interne** Cloud Avenue — Documentation technique détaillée
3. **Runbooks** — Procédures opérationnelles pas à pas
4. **Architecture Decision Records (ADR)** — Décisions d'architecture
5. **Base de connaissances ITSM** — Solutions aux incidents courants

## Parcours de formation recommandé

\`\`\`
Semaine 1: Modules 1 → 2 → 3 (Fondamentaux)
Semaine 2: Modules 4 → 5 → 6 → 7 (Technique)
Semaine 3: Modules 8 → 9 → 14 (Opérations)
Semaine 4: Modules 10 → 11 → 12 → 13 → 15 (Spécialisations)
\`\`\`

**Objectif** : être autonome sur les tâches N1/N2 après 4 semaines d'intégration.`,
    quiz: [
      { question: "En combien de semaines est structuré l'onboarding BMS ?", options: ["2 semaines", "3 semaines", "4 semaines", "6 semaines"], correctIndex: 2 },
      { question: "Quel outil est utilisé pour stocker les fichiers YAML de configuration BMS ?", options: ["GitHub", "GitLab", "Bitbucket", "SVN"], correctIndex: 1 },
      { question: "Quel score minimum est requis aux quiz pour valider un module ?", options: ["≥ 50%", "≥ 60%", "≥ 80%", "≥ 90%"], correctIndex: 1 },
      { question: "Quels modules sont recommandés en semaine 1 ?", options: ["Modules 1, 2, 3", "Modules 4, 5, 6", "Modules 8, 9, 14", "Modules 10, 11, 12"], correctIndex: 0 },
      { question: "Quel rôle assure le 'Buddy' dans l'onboarding ?", options: ["Manager direct", "Collaborateur référent pour les questions", "Support N3", "Responsable RH"], correctIndex: 1 },
    ],
  },
];

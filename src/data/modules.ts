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
    description: "Découvrez les fondamentaux des serveurs physiques dédiés et leur rôle dans le cloud moderne.",
    icon: "Server",
    duration: "20 min",
    level: "Débutant",
    content: `# Introduction au Bare Metal Server

## Qu'est-ce qu'un Bare Metal Server ?

Un **Bare Metal Server** (BMS) est un serveur physique dédié, mis à disposition d'un seul client dans un environnement cloud. Contrairement aux machines virtuelles, il n'y a pas de couche d'hyperviseur entre le système d'exploitation et le matériel.

## Caractéristiques principales

- **Performance native** : accès direct au matériel sans overhead de virtualisation
- **Isolation complète** : aucun partage de ressources avec d'autres clients
- **Personnalisation** : choix du système d'exploitation, du firmware et de la configuration matérielle
- **Conformité** : idéal pour les workloads soumis à des contraintes réglementaires

## Pourquoi utiliser un BMS ?

Les BMS sont utilisés dans des scénarios nécessitant :
- Des performances maximales (HPC, bases de données)
- Une isolation stricte (conformité, sécurité)
- Un contrôle total sur l'infrastructure
- Des licences logicielles liées au matériel

## BMS chez Orange Business

Chez Orange Business Cloud Avenue, les BMS sont proposés via un catalogue de configurations standardisées, avec un portail self-service et des API REST pour le provisioning automatisé.`,
    quiz: [
      { question: "Qu'est-ce qui distingue un BMS d'une VM ?", options: ["Le prix", "L'absence d'hyperviseur", "La taille du disque", "Le système d'exploitation"], correctIndex: 1 },
      { question: "Quel est un avantage clé du BMS ?", options: ["Coût réduit", "Performance native", "Déploiement plus rapide qu'une VM", "Moins de maintenance"], correctIndex: 1 },
      { question: "Pour quel usage un BMS est-il idéal ?", options: ["Site web statique", "HPC et bases de données", "Blog personnel", "Cache DNS"], correctIndex: 1 },
    ],
  },
  {
    id: 2,
    title: "Architecture BMS chez Orange Business",
    description: "Comprendre l'architecture technique des BMS dans l'infrastructure Cloud Avenue.",
    icon: "Building2",
    duration: "25 min",
    level: "Intermédiaire",
    content: `# Architecture BMS chez Orange Business

## Vue d'ensemble

L'infrastructure BMS de Cloud Avenue repose sur des datacenters Tier III+ répartis en France, offrant redondance et haute disponibilité.

## Composants architecturaux

### Couche matérielle
- Serveurs Dell PowerEdge / HPE ProLiant
- Processeurs Intel Xeon Scalable / AMD EPYC
- RAM DDR5 ECC (jusqu'à 2 To par serveur)
- Stockage NVMe local + accès SAN

### Couche réseau
- Top-of-Rack switches 25/100 GbE
- Fabric réseau leaf-spine
- Séparation des flux : management, données, stockage
- Connectivité Internet, MPLS, SD-WAN

### Couche management
- BMC/iLO/iDRAC pour la gestion out-of-band
- IPMI pour le contrôle à distance
- PXE boot pour le provisioning automatisé
- API REST Cloud Avenue

## Zones de disponibilité

Les BMS sont déployés dans des zones de disponibilité (AZ) distinctes permettant la haute disponibilité des applications critiques.`,
    quiz: [
      { question: "Quel type de processeurs est utilisé dans les BMS Cloud Avenue ?", options: ["ARM Cortex", "Intel Xeon / AMD EPYC", "Apple M1", "Qualcomm Snapdragon"], correctIndex: 1 },
      { question: "Quel protocole permet la gestion out-of-band ?", options: ["HTTP", "IPMI", "FTP", "SMTP"], correctIndex: 1 },
      { question: "Comment est organisé le réseau BMS ?", options: ["Bus unique", "Leaf-spine", "Token ring", "Mesh WiFi"], correctIndex: 1 },
    ],
  },
  {
    id: 3,
    title: "Cloud Avenue : l'écosystème",
    description: "Tour d'horizon de la plateforme Cloud Avenue et de ses services.",
    icon: "Cloud",
    duration: "15 min",
    level: "Débutant",
    content: `# Cloud Avenue : l'écosystème

## Présentation

Cloud Avenue est la plateforme cloud souveraine d'Orange Business, hébergée en France et conforme aux normes européennes de protection des données.

## Services proposés

- **Compute** : VMs, Bare Metal Servers, containers (Kubernetes managé)
- **Stockage** : Block storage, Object storage (S3-compatible), File storage
- **Réseau** : Load balancers, VPN, peering, firewall managé
- **Base de données** : PostgreSQL, MySQL, Redis managés
- **Sécurité** : WAF, DDoS protection, HSM, PKI

## Portail et API

Le portail Cloud Avenue offre :
- Dashboard de gestion centralisé
- Provisioning en quelques clics
- API REST documentée (OpenAPI)
- CLI pour l'automatisation
- Terraform provider officiel

## Certifications

- SecNumCloud (ANSSI)
- ISO 27001, ISO 27017, ISO 27018
- HDS (Hébergement de Données de Santé)`,
    quiz: [
      { question: "Où sont hébergés les services Cloud Avenue ?", options: ["USA", "Chine", "France", "Inde"], correctIndex: 2 },
      { question: "Quel outil d'IaC est supporté nativement ?", options: ["Ansible", "Puppet", "Terraform", "Chef"], correctIndex: 2 },
      { question: "Quelle certification de sécurité française Cloud Avenue possède-t-il ?", options: ["SOC2", "FedRAMP", "SecNumCloud", "PCI-DSS"], correctIndex: 2 },
    ],
  },
  {
    id: 4,
    title: "Provisioning et déploiement BMS",
    description: "Maîtriser le processus de provisioning d'un Bare Metal Server de A à Z.",
    icon: "Rocket",
    duration: "30 min",
    level: "Intermédiaire",
    content: `# Provisioning et déploiement BMS

## Processus de provisioning

### 1. Sélection de la configuration
Choisir parmi le catalogue :
- CPU : nombre de cœurs, fréquence
- RAM : capacité, type
- Stockage : type (SSD/NVMe/HDD), capacité, RAID
- Réseau : bande passante, nombre d'interfaces

### 2. Configuration réseau
- Attribution VLAN
- Configuration IP (publique/privée)
- Règles firewall
- Bonding réseau (LACP)

### 3. Installation OS
Le provisioning utilise PXE boot :
1. Le serveur démarre via PXE
2. DHCP fournit l'IP et le serveur TFTP
3. L'image OS est chargée (Ubuntu, RHEL, Windows Server, ESXi)
4. Installation automatisée via kickstart/preseed/autounattend
5. Configuration post-install (cloud-init)

### 4. Validation
- Tests de connectivité réseau
- Vérification RAID et stockage
- Test de performance baseline
- Remise des accès (SSH, iLO/iDRAC)

## Via l'API

\`\`\`bash
curl -X POST https://api.cloudavenue.orange-business.com/v1/bms \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"flavor": "bms.xlarge", "os": "ubuntu-22.04", "network": "vlan-100"}'
\`\`\``,
    quiz: [
      { question: "Quel protocole est utilisé pour le boot réseau ?", options: ["HTTP", "PXE", "NFS", "iSCSI"], correctIndex: 1 },
      { question: "Quel outil configure le serveur après l'installation OS ?", options: ["Ansible", "cloud-init", "Docker", "systemd"], correctIndex: 1 },
      { question: "Quel mode de bonding réseau est utilisé ?", options: ["Round-robin", "LACP", "Broadcast", "XOR"], correctIndex: 1 },
    ],
  },
  {
    id: 5,
    title: "Réseau et connectivité BMS",
    description: "Comprendre l'architecture réseau des BMS : VLAN, bonding, BGP et load balancing.",
    icon: "Network",
    duration: "25 min",
    level: "Intermédiaire",
    content: `# Réseau et connectivité BMS

## Architecture réseau

### VLANs
Chaque BMS est connecté à un ou plusieurs VLANs :
- **VLAN Management** : accès BMC/iLO (réseau isolé)
- **VLAN Données** : trafic applicatif
- **VLAN Stockage** : accès SAN/NAS (iSCSI, NFS)
- **VLAN Backup** : flux de sauvegarde

### Bonding réseau
Configuration LACP (802.3ad) pour la haute disponibilité :
- 2x 25 GbE en mode actif-actif
- Failover automatique
- Augmentation de la bande passante

### BGP et routage
- BGP pour le peering avec les réseaux clients
- OSPF en interne pour le routage dynamique
- Routes statiques pour les cas simples

## Load Balancing
- F5 BIG-IP pour le load balancing L4/L7
- HAProxy pour les déploiements open-source
- Health checks configurables
- Session persistence (sticky sessions)

## Sécurité réseau
- Micro-segmentation via NSX ou ACLs
- Firewall distribué
- IDS/IPS en option`,
    quiz: [
      { question: "Combien de VLANs typiques a un BMS ?", options: ["1", "2", "4", "8"], correctIndex: 2 },
      { question: "Quel standard est utilisé pour le bonding ?", options: ["802.1Q", "802.3ad (LACP)", "802.11ac", "802.1X"], correctIndex: 1 },
      { question: "Quel protocole de routage est utilisé pour le peering ?", options: ["RIP", "OSPF", "BGP", "EIGRP"], correctIndex: 2 },
    ],
  },
  {
    id: 6,
    title: "Stockage et volumes",
    description: "Les options de stockage pour les BMS : RAID, SAN, NAS, NVMe.",
    icon: "HardDrive",
    duration: "25 min",
    level: "Intermédiaire",
    content: `# Stockage et volumes

## Stockage local

### Types de disques
- **HDD** : capacité élevée, coût faible (SATA, SAS)
- **SSD** : performances élevées, faible latence (SATA, SAS)
- **NVMe** : performances maximales, latence ultra-faible (PCIe)

### Configurations RAID
- **RAID 0** : performance (striping) — pas de redondance
- **RAID 1** : miroir — redondance maximale
- **RAID 5** : striping + parité — bon compromis
- **RAID 6** : double parité — tolérance à 2 pannes
- **RAID 10** : miroir + striping — performance + redondance

## Stockage réseau

### SAN (Storage Area Network)
- Protocole iSCSI ou Fibre Channel
- LUNs dédiées par serveur
- Réplication synchrone entre sites

### NAS (Network Attached Storage)
- Protocoles NFS / SMB
- Partage de fichiers entre serveurs
- Snapshots et clones

## Bonnes pratiques
- RAID 10 pour les bases de données
- NVMe pour les workloads I/O intensifs
- SAN pour la portabilité des données
- Sauvegardes régulières sur stockage objet`,
    quiz: [
      { question: "Quel RAID offre le meilleur compromis performance/redondance pour les DB ?", options: ["RAID 0", "RAID 5", "RAID 10", "RAID 6"], correctIndex: 2 },
      { question: "Quel protocole est utilisé pour le SAN ?", options: ["NFS", "iSCSI", "HTTP", "FTP"], correctIndex: 1 },
      { question: "Quel type de stockage offre la latence la plus faible ?", options: ["HDD SATA", "SSD SAS", "NVMe", "SAN iSCSI"], correctIndex: 2 },
    ],
  },
  {
    id: 7,
    title: "Monitoring et observabilité",
    description: "Mettre en place le monitoring complet d'un BMS : Prometheus, Grafana, alerting.",
    icon: "Activity",
    duration: "30 min",
    level: "Intermédiaire",
    content: `# Monitoring et observabilité

## Stack de monitoring

### Prometheus
- Collecte de métriques par scraping HTTP
- Stockage time-series local
- PromQL pour les requêtes
- Service discovery automatique

### Grafana
- Dashboards de visualisation
- Alertes visuelles
- Intégration multi-sources
- Templates prédéfinis pour BMS

### Alertmanager
- Routage des alertes
- Déduplication et groupage
- Notifications : email, Slack, PagerDuty

## Métriques clés BMS

| Métrique | Seuil d'alerte | Critique |
|----------|----------------|----------|
| CPU usage | > 80% | > 95% |
| RAM usage | > 85% | > 95% |
| Disk I/O | > 80% IOPS max | > 95% |
| Réseau | > 70% bande passante | > 90% |
| Température | > 70°C | > 85°C |

## SNMP
- Monitoring matériel via SNMP v3
- Traps pour les événements critiques
- MIBs constructeur (Dell, HPE)

## Logs
- Centralisation avec ELK Stack ou Loki
- Syslog pour les logs système
- Audit trail pour la conformité`,
    quiz: [
      { question: "Quel outil collecte les métriques dans la stack standard ?", options: ["Grafana", "Prometheus", "Elasticsearch", "Nagios"], correctIndex: 1 },
      { question: "À partir de quel seuil CPU déclenche-t-on une alerte ?", options: ["> 50%", "> 70%", "> 80%", "> 95%"], correctIndex: 2 },
      { question: "Quelle version de SNMP est recommandée ?", options: ["v1", "v2c", "v3", "v4"], correctIndex: 2 },
    ],
  },
  {
    id: 8,
    title: "Sécurité et compliance",
    description: "Sécuriser les BMS : firmware, secure boot, HSM, segmentation réseau.",
    icon: "Shield",
    duration: "30 min",
    level: "Avancé",
    content: `# Sécurité et compliance

## Sécurité matérielle

### Secure Boot
- Vérification de la chaîne de confiance au démarrage
- Protection contre les rootkits firmware
- Certificats UEFI managés

### TPM (Trusted Platform Module)
- Stockage sécurisé des clés
- Attestation de l'intégrité du système
- Chiffrement du disque (BitLocker, LUKS)

### HSM (Hardware Security Module)
- Gestion des clés cryptographiques
- Conformité PCI-DSS, eIDAS
- API PKCS#11

## Sécurité logicielle

- Mises à jour firmware régulières (BIOS, BMC, NIC)
- Hardening OS (CIS Benchmarks)
- Antivirus / EDR
- Gestion des vulnérabilités (CVE)

## Sécurité réseau
- Micro-segmentation
- Firewall host-based (iptables/nftables)
- VPN IPsec pour les accès distants
- 802.1X pour l'authentification réseau

## Compliance
- SecNumCloud : exigences ANSSI
- RGPD : protection des données personnelles
- HDS : hébergement de données de santé
- PCI-DSS : données de paiement`,
    quiz: [
      { question: "Que protège le Secure Boot ?", options: ["Le réseau", "La chaîne de confiance au démarrage", "Les fichiers utilisateur", "La RAM"], correctIndex: 1 },
      { question: "Quel standard est utilisé pour le hardening OS ?", options: ["OWASP", "CIS Benchmarks", "ISO 9001", "ITIL"], correctIndex: 1 },
      { question: "Quelle certification ANSSI s'applique au cloud souverain ?", options: ["SOC2", "FedRAMP", "SecNumCloud", "HIPAA"], correctIndex: 2 },
    ],
  },
  {
    id: 9,
    title: "Maintenance et mises à jour",
    description: "Procédures de maintenance préventive et corrective des BMS.",
    icon: "Wrench",
    duration: "20 min",
    level: "Intermédiaire",
    content: `# Maintenance et mises à jour

## Types de maintenance

### Maintenance préventive
- Mises à jour firmware planifiées (BIOS, BMC, NIC, RAID)
- Remplacement proactif des disques (SMART monitoring)
- Nettoyage des logs et rotation
- Tests de performance périodiques

### Maintenance corrective
- Remplacement matériel en cas de panne
- Diagnostic via iLO/iDRAC
- Escalade au support constructeur si nécessaire

## Fenêtres de maintenance

- **Standard** : mardi/jeudi 2h-6h (impact minimal)
- **Urgente** : sous 4h avec notification client
- **Planifiée** : 7 jours de préavis minimum

## Processus de mise à jour firmware

1. Téléchargement du firmware depuis le portail constructeur
2. Validation en environnement de test
3. Planification de la fenêtre de maintenance
4. Application via iLO/iDRAC (certaines MAJ nécessitent un reboot)
5. Validation post-mise à jour
6. Rollback si nécessaire

## Rolling updates
Pour les clusters, mise à jour nœud par nœud :
- Drain du nœud (évacuation des workloads)
- Mise à jour et reboot
- Validation et réintégration
- Passage au nœud suivant`,
    quiz: [
      { question: "Quand sont les fenêtres de maintenance standard ?", options: ["Lundi 8h-12h", "Mardi/Jeudi 2h-6h", "Vendredi 18h-22h", "Dimanche 0h-6h"], correctIndex: 1 },
      { question: "Quel outil surveille la santé des disques ?", options: ["iostat", "SMART", "df", "lsblk"], correctIndex: 1 },
      { question: "Quel est le délai de préavis pour une maintenance planifiée ?", options: ["24h", "48h", "7 jours", "30 jours"], correctIndex: 2 },
    ],
  },
  {
    id: 10,
    title: "SLA, support et escalade",
    description: "Comprendre les niveaux de service, le support et les procédures d'escalade.",
    icon: "LifeBuoy",
    duration: "20 min",
    level: "Débutant",
    content: `# SLA, support et escalade

## Niveaux de service (SLA)

| Service | Disponibilité | RTO | RPO |
|---------|--------------|-----|-----|
| BMS Standard | 99.9% | 4h | 24h |
| BMS Premium | 99.95% | 2h | 4h |
| BMS Critical | 99.99% | 1h | 1h |

## Support

### Niveaux de support
- **N1** : Support de premier niveau (incidents simples, FAQ)
- **N2** : Support technique avancé (diagnostic, configuration)
- **N3** : Ingénierie (problèmes complexes, bugs, RCA)

### Canaux de support
- Portail de ticketing (24/7)
- Téléphone (heures ouvrées ou 24/7 selon contrat)
- Chat en ligne
- Email

## Procédure d'escalade

1. **Ouverture du ticket** : description détaillée, impact, urgence
2. **Classification** : P1 (critique) à P4 (faible)
3. **Traitement N1** : résolution en < 30 min ou escalade
4. **Escalade N2** : diagnostic approfondi, résolution en < 2h
5. **Escalade N3** : intervention ingénierie, RCA sous 5 jours
6. **Communication** : mises à jour régulières au client

## Métriques clés
- MTTR (Mean Time To Repair)
- MTBF (Mean Time Between Failures)
- Taux de résolution au premier contact`,
    quiz: [
      { question: "Quel est le SLA de disponibilité BMS Premium ?", options: ["99%", "99.9%", "99.95%", "99.99%"], correctIndex: 2 },
      { question: "Quel est le RTO pour un BMS Critical ?", options: ["30 min", "1h", "4h", "8h"], correctIndex: 1 },
      { question: "Combien de niveaux de support existent ?", options: ["2", "3", "4", "5"], correctIndex: 1 },
    ],
  },
  {
    id: 11,
    title: "BMS vs VM vs Container",
    description: "Comparaison détaillée des trois modèles de compute : quand utiliser quoi.",
    icon: "GitCompare",
    duration: "20 min",
    level: "Débutant",
    content: `# BMS vs VM vs Container

## Comparaison

| Critère | BMS | VM | Container |
|---------|-----|-----|-----------|
| Performance | Native | ~95-98% | ~98-99% |
| Isolation | Physique | Logique (hyperviseur) | Processus |
| Démarrage | 5-30 min | 1-5 min | Secondes |
| Densité | 1 par serveur | 10-50 par serveur | 100+ par serveur |
| Coût | Élevé | Moyen | Faible |
| Flexibilité | Faible | Moyenne | Élevée |

## Quand choisir un BMS ?
- Workloads HPC (calcul haute performance)
- Bases de données critiques (Oracle, SAP HANA)
- Applications avec licences liées au hardware
- Conformité stricte (isolation physique requise)
- Gaming servers, streaming
- IA/ML avec GPU dédiés

## Quand choisir une VM ?
- Applications web standard
- Environnements de développement/test
- Workloads avec besoins variables
- Multi-tenancy avec isolation logique

## Quand choisir des containers ?
- Microservices
- CI/CD pipelines
- Applications cloud-native
- Scaling horizontal rapide

## Approche hybride
Souvent, la meilleure architecture combine les trois :
- BMS pour la base de données
- VMs pour les services middleware
- Containers pour les microservices frontend`,
    quiz: [
      { question: "Quel modèle offre la meilleure densité ?", options: ["BMS", "VM", "Container", "Tous égaux"], correctIndex: 2 },
      { question: "Pour quel cas d'usage un BMS est-il préférable ?", options: ["Blog", "Microservices", "Base de données Oracle", "Site statique"], correctIndex: 2 },
      { question: "Quel est le temps de démarrage typique d'un BMS ?", options: ["Secondes", "1-5 min", "5-30 min", "1 heure"], correctIndex: 2 },
    ],
  },
  {
    id: 12,
    title: "Cas d'usage clients",
    description: "Exemples concrets d'utilisation des BMS par les clients Orange Business.",
    icon: "Users",
    duration: "15 min",
    level: "Débutant",
    content: `# Cas d'usage clients

## Cas 1 : Banque — Trading haute fréquence
- **Besoin** : latence ultra-faible pour les ordres de bourse
- **Solution** : BMS avec NVMe, réseau 25 GbE, kernel tuning
- **Résultat** : latence < 10µs, conformité MiFID II

## Cas 2 : Santé — Imagerie médicale
- **Besoin** : stockage et traitement d'images DICOM volumineuses
- **Solution** : BMS avec GPU NVIDIA, 1 To RAM, SAN haute performance
- **Résultat** : traitement 10x plus rapide, certification HDS

## Cas 3 : Industrie — IoT et edge computing
- **Besoin** : collecte et analyse de données capteurs en temps réel
- **Solution** : BMS edge + cluster central, pipeline Kafka
- **Résultat** : maintenance prédictive, réduction des pannes de 40%

## Cas 4 : Gaming — Serveurs de jeux
- **Besoin** : serveurs de jeux multijoueurs avec faible latence
- **Solution** : BMS avec CPU haute fréquence, réseau dédié
- **Résultat** : 64 joueurs simultanés, ping < 20ms

## Cas 5 : IA/ML — Entraînement de modèles
- **Besoin** : entraîner des modèles de deep learning
- **Solution** : BMS avec 8x GPU A100, NVLink, 2 To RAM
- **Résultat** : entraînement 5x plus rapide vs cloud GPU partagé

## Points communs
Tous ces cas nécessitent : performance, isolation, conformité — les trois piliers du BMS.`,
    quiz: [
      { question: "Quel secteur utilise les BMS pour le trading ?", options: ["Santé", "Banque", "Gaming", "Éducation"], correctIndex: 1 },
      { question: "Quelle certification est requise pour les données de santé ?", options: ["PCI-DSS", "ISO 9001", "HDS", "SOC2"], correctIndex: 2 },
      { question: "Quel GPU est utilisé pour l'entraînement IA ?", options: ["RTX 3090", "A100", "T4", "V100"], correctIndex: 1 },
    ],
  },
  {
    id: 13,
    title: "Outils internes et dashboards",
    description: "Tour d'horizon des outils internes utilisés au quotidien pour gérer les BMS.",
    icon: "LayoutDashboard",
    duration: "20 min",
    level: "Intermédiaire",
    content: `# Outils internes et dashboards

## Portail Cloud Avenue
- Vue d'ensemble de toutes les ressources
- Provisioning self-service
- Monitoring intégré
- Gestion des tickets de support

## CLI Cloud Avenue
\`\`\`bash
# Lister les BMS
ca bms list

# Détails d'un BMS
ca bms show bms-001

# Redémarrer un BMS
ca bms reboot bms-001

# Voir les métriques
ca bms metrics bms-001 --period 24h
\`\`\`

## Terraform Provider
\`\`\`hcl
resource "cloudavenue_bms" "web_server" {
  name   = "web-prod-01"
  flavor = "bms.xlarge"
  os     = "ubuntu-22.04"
  network {
    vlan_id = 100
  }
}
\`\`\`

## Dashboards Grafana
- **BMS Overview** : vue globale de tous les serveurs
- **BMS Detail** : métriques détaillées par serveur
- **Network** : trafic réseau, latence, erreurs
- **Storage** : IOPS, throughput, capacité
- **Alerts** : historique et état des alertes

## Outils de gestion
- **CMDB** : inventaire matériel et logiciel
- **ITSM** : gestion des incidents et changements
- **Ansible Tower** : automatisation des déploiements
- **Vault** : gestion des secrets`,
    quiz: [
      { question: "Quelle commande liste tous les BMS ?", options: ["ca bms show", "ca bms list", "ca bms get", "ca bms status"], correctIndex: 1 },
      { question: "Quel outil gère les secrets ?", options: ["Ansible", "Terraform", "Vault", "Grafana"], correctIndex: 2 },
      { question: "Quel outil d'automatisation est utilisé pour les déploiements ?", options: ["Jenkins", "Ansible Tower", "GitHub Actions", "CircleCI"], correctIndex: 1 },
    ],
  },
  {
    id: 14,
    title: "Bonnes pratiques opérationnelles",
    description: "Les règles d'or pour opérer les BMS de manière fiable et efficace.",
    icon: "CheckCircle",
    duration: "20 min",
    level: "Avancé",
    content: `# Bonnes pratiques opérationnelles

## Infrastructure as Code
- **Tout en code** : configurations, scripts, playbooks versionnés
- **GitOps** : Git comme source de vérité
- **Review** : toute modification via Pull Request
- **Tests** : validation automatisée avant déploiement

## Monitoring & Alerting
- Monitorer TOUT : CPU, RAM, disque, réseau, processus, logs
- Alertes significatives (pas de fatigue d'alerte)
- Runbooks documentés pour chaque alerte
- On-call rotation avec escalade claire

## Sécurité
- Principe du moindre privilège
- Rotation régulière des credentials
- Patch management automatisé
- Audit trail complet

## Sauvegarde & DR
- Règle 3-2-1 : 3 copies, 2 médias, 1 off-site
- Tests de restauration réguliers
- RTO/RPO définis et testés
- Plan de reprise documenté

## Documentation
- Architecture Decision Records (ADR)
- Runbooks opérationnels
- Procédures d'escalade
- Post-mortems sans blame

## Performance
- Baseline de performance à la livraison
- Capacity planning proactif
- Optimisation continue (kernel tuning, I/O scheduler)
- Tests de charge réguliers`,
    quiz: [
      { question: "Quelle règle de sauvegarde est recommandée ?", options: ["2-1-1", "3-2-1", "4-3-2", "1-1-1"], correctIndex: 1 },
      { question: "Quel principe de sécurité est fondamental ?", options: ["Accès total", "Moindre privilège", "Confiance zéro uniquement", "Pas de mot de passe"], correctIndex: 1 },
      { question: "Comment doit être gérée toute modification d'infrastructure ?", options: ["En production directement", "Via Pull Request", "Par email", "Par téléphone"], correctIndex: 1 },
    ],
  },
  {
    id: 15,
    title: "Onboarding checklist nouveau collaborateur",
    description: "Liste complète pour intégrer un nouveau collaborateur dans l'équipe BMS.",
    icon: "ClipboardCheck",
    duration: "15 min",
    level: "Débutant",
    content: `# Onboarding checklist nouveau collaborateur

## Semaine 1 : Accès et découverte

### Accès à obtenir
- [ ] Compte Active Directory / SSO
- [ ] Accès portail Cloud Avenue
- [ ] Accès VPN entreprise
- [ ] Accès Grafana / monitoring
- [ ] Accès ITSM (ticketing)
- [ ] Accès Git (GitLab/GitHub interne)
- [ ] Accès Slack / Teams

### Formations obligatoires
- [ ] Module 1 : Introduction au BMS
- [ ] Module 3 : Cloud Avenue écosystème
- [ ] Module 10 : SLA, support et escalade
- [ ] Formation sécurité Orange Business

## Semaine 2 : Technique

### Hands-on
- [ ] Provisionner un BMS de test
- [ ] Configurer le monitoring (Prometheus + Grafana)
- [ ] Effectuer un reboot via iLO/iDRAC
- [ ] Créer un ticket de support test

### Documentation à lire
- [ ] Architecture réseau BMS
- [ ] Procédures d'escalade
- [ ] Runbooks principaux

## Semaine 3-4 : Mise en pratique

- [ ] Shadow d'un ingénieur senior pendant 1 semaine
- [ ] Prise en charge d'un premier ticket N1
- [ ] Participation à un on-call supervisé
- [ ] Compléter tous les modules de formation BMS Hub
- [ ] Quiz de validation finale (score > 80%)

## Contacts clés
- Manager : votre responsable direct
- Buddy : collaborateur référent pour les questions
- Support N3 : équipe d'ingénierie escalade`,
    quiz: [
      { question: "Quand doit-on obtenir les accès VPN ?", options: ["Semaine 1", "Semaine 2", "Semaine 3", "Mois 2"], correctIndex: 0 },
      { question: "Quel score minimum au quiz de validation ?", options: ["> 60%", "> 70%", "> 80%", "> 90%"], correctIndex: 2 },
      { question: "Qui est le contact principal pour les questions quotidiennes ?", options: ["Manager", "Buddy", "Support N3", "RH"], correctIndex: 1 },
    ],
  },
];

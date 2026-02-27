export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  sentiment: "positif" | "neutre" | "technique";
};

export const staticArticles: Article[] = [
  {
    id: "analyse-bms-2025",
    title: "L'évolution du Bare Metal Server en 2025 : tendances et perspectives",
    description: "Analyse des tendances du marché BMS : performances, souveraineté et edge computing.",
    content: `Le marché du Bare Metal Server connaît une croissance soutenue en 2025, porté par plusieurs tendances majeures.

**Souveraineté des données** : Avec le renforcement des réglementations européennes (RGPD, Digital Markets Act), la demande pour des serveurs physiques hébergés en Europe explose. Les entreprises cherchent des garanties sur la localisation et le contrôle de leurs données.

**IA et GPU** : L'entraînement de modèles d'IA nécessite des ressources GPU dédiées. Les BMS avec GPU NVIDIA H100/H200 sont en forte demande, avec des temps d'attente de plusieurs semaines.

**Edge Computing** : Le déploiement de BMS en edge, au plus près des utilisateurs, répond aux besoins de latence faible pour l'IoT industriel et le gaming.

**Sustainability** : Les datacenters investissent dans le refroidissement liquide et les énergies renouvelables pour réduire l'empreinte carbone des BMS.`,
    date: "2025-01-15",
    category: "Analyse",
    imageUrl: "",
    sentiment: "positif",
  },
  {
    id: "securite-bms-zero-trust",
    title: "Zero Trust et BMS : sécuriser l'infrastructure physique",
    description: "Comment appliquer le modèle Zero Trust aux Bare Metal Servers dans un contexte cloud souverain.",
    content: `L'approche Zero Trust transforme la sécurité des infrastructures BMS. Plutôt que de faire confiance au réseau interne, chaque accès est vérifié.

**Principes appliqués au BMS** :
- Authentification mutuelle TLS pour toutes les communications
- Micro-segmentation réseau via NSX ou Calico
- Rotation automatique des certificats et secrets
- Monitoring continu des comportements (UEBA)

**Implémentation chez Cloud Avenue** :
- Service mesh pour les communications inter-BMS
- Vault pour la gestion centralisée des secrets
- Attestation matérielle via TPM 2.0
- Zero Trust Network Access (ZTNA) pour les accès distants`,
    date: "2025-02-01",
    category: "Sécurité",
    imageUrl: "",
    sentiment: "technique",
  },
  {
    id: "cloud-avenue-nouveautes",
    title: "Cloud Avenue : les nouveautés du catalogue BMS",
    description: "Nouvelles configurations GPU, stockage NVMe et réseau 100GbE disponibles sur Cloud Avenue.",
    content: `Cloud Avenue enrichit son catalogue BMS avec de nouvelles configurations répondant aux besoins croissants en performance.

**Nouvelles configurations** :
- BMS GPU : NVIDIA H100 (80 Go HBM3) pour l'IA/ML
- BMS NVMe : jusqu'à 30 To de stockage NVMe local
- BMS 100GbE : interfaces réseau 100 Gigabit Ethernet
- BMS ARM : processeurs Ampere Altra pour les workloads cloud-native

**Améliorations du portail** :
- Provisioning en moins de 15 minutes
- Dashboard de monitoring intégré
- API v2 avec support OpenAPI 3.1
- Terraform provider v2 avec drift detection`,
    date: "2025-03-01",
    category: "Produit",
    imageUrl: "",
    sentiment: "positif",
  },
  {
    id: "bms-kubernetes-integration",
    title: "BMS et Kubernetes : le meilleur des deux mondes",
    description: "Comment combiner la puissance des BMS avec l'orchestration Kubernetes pour les workloads critiques.",
    content: `L'intégration BMS + Kubernetes offre une solution puissante pour les applications critiques nécessitant à la fois performance et orchestration.

**Architecture recommandée** :
- Control plane Kubernetes sur VMs (haute disponibilité)
- Worker nodes sur BMS (performance native)
- GPU nodes sur BMS pour l'inférence IA
- Stockage persistant via CSI driver Cloud Avenue

**Avantages** :
- Performance native pour les pods critiques
- Scaling horizontal automatique
- Isolation réseau avec Calico/Cilium
- Monitoring unifié avec Prometheus Operator

**Cas d'usage** :
- Bases de données stateful (PostgreSQL, Cassandra)
- Services de ML serving (TensorFlow Serving, Triton)
- Applications de streaming (Kafka, Flink)`,
    date: "2025-01-20",
    category: "Architecture",
    imageUrl: "",
    sentiment: "technique",
  },
  {
    id: "retour-experience-migration",
    title: "Retour d'expérience : migration de VM vers BMS",
    description: "Un client Cloud Avenue partage son expérience de migration d'une base de données Oracle de VM vers BMS.",
    content: `Une grande banque française a migré sa base de données Oracle RAC depuis des VMs vers des BMS Cloud Avenue. Voici les résultats.

**Contexte** :
- Base Oracle RAC 12c, 5 To de données
- 200 000 transactions par seconde en pic
- SLA 99.99% de disponibilité

**Résultats après migration** :
- Latence réduite de 40% (suppression de l'hyperviseur)
- IOPS multiplié par 3 (passage au NVMe local)
- Coût de licence Oracle réduit de 30% (moins de cœurs nécessaires)
- Conformité renforcée (isolation physique)

**Leçons apprises** :
- Planifier la migration en weekend
- Tester le failover avant la bascule
- Prévoir un rollback plan détaillé
- Former les DBA aux spécificités BMS`,
    date: "2025-02-15",
    category: "Retour d'expérience",
    imageUrl: "",
    sentiment: "positif",
  },
];

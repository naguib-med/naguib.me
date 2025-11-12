import pomodoro_image from "@/public/images/pomodoro_image.png";
import code_snippet_image from "@/public/images/code_snippet_image.png";
import planify_app from "@/public/images/planify_app.png";
import posterEditor from "@/public/images/poster_editor.png";
import cookChef from "@/public/images/cookchef.png";
import myposter from "@/public/images/myposter.png";

import { Project, EducationItem } from "../types";

export const projects: Project[] = [
  {
    title: "Pomodoro Timer",
    description:
      "Pomodoro Timer est une application web pour gérer le temps de travail et de pause.",
    image: pomodoro_image,
    tags: ["Next.js", "Radix UI", "Tailwind CSS"],
    githubUrl: "https://github.com/naguib-med/pomodoro",
    demoUrl: "https://pomodoro-three-beryl.vercel.app/",
    status: "En cours",
    isRecent: true,
  },
  {
    title: "Code Snippet",
    description:
      "Code Snippet est une application web moderne pour stocker et partager des extraits de code.",
    image: code_snippet_image,
    tags: ["Next.js", "Prisma", "PostgreSQL", "Radix UI", "Tailwind CSS"],
    githubUrl: "https://github.com/naguib-med/code-snippets",
    demoUrl: "https://code-snippets-three-theta.vercel.app/",
    status: "En cours",
    isRecent: true,
  },
  {
    title: "Planify",
    description:
      "Planify est une application web moderne de réservation de rendez-vous en ligne.",
    image: planify_app,
    tags: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/naguib-med/planify",
    demoUrl: "https://planify.vercel.app/",
    status: "En cours",
    isRecent: true,
  },
  {
    title: "Éditeur de posters",
    description:
      "Une application web pour créer des posters. Les utilisateurs peuvent ajouter du texte, des images, des formes, et changer la couleur du texte et des formes.",
    image: posterEditor,
    tags: ["Vite + Vue", "Fabric.js", "Pinia", "Vuetify3"],
    githubUrl: "https://github.com/naguib-med/demo-fabricjs",
    demoUrl: "https://demo-fabricjs.vercel.app/",
    status: "Terminé",
    isRecent: false,
  },
  {
    title: "Cook Chef",
    description:
      "Une application web de gestion de recettes. Les utilisateurs peuvent rechercher des recettes, les consulter, les ajouter à leurs favoris et les retirer de leurs favoris.",
    image: cookChef,
    tags: ["react", "Yup", "React-hook-form", "Sass"],
    githubUrl: "https://github.com/naguib-med/cookchefapp",
    demoUrl: "https://cookchefapp.vercel.app/",
    status: "Terminé",
    isRecent: false,
  },
  {
    title: "Gestion des posters",
    description:
      "Une application web pour gérer des posters. Les utilisateurs peuvent ajouter, modifier, supprimer, consulter des posters et générer un fichier PDF contenant la liste des posters.",
    image: myposter,
    tags: ["vue", "Firebase", "Fabric.js", "Pinia", "Vuetify3"],
    githubUrl: "https://github.com/naguib-med/creation-posters",
    demoUrl: "https://posters-app-3eb45.web.app/",
    status: "Terminé",
    isRecent: false,
  },
];

export const educationList: EducationItem[] = [
  {
    title: "Master 2 OPSIE – Cybersécurité (Label SecNumÉdu – ANSSI)",
    institution: "Université Lumière Lyon 2",
    location: "Lyon, France",
    period: "Depuis sept. 2025",
    description: [
      "Formation labellisée SecNumÉdu par l'ANSSI - expertise reconnue en sécurité des systèmes d'information",
      "Audit informatique et sécurité des SI: méthodologies d'audit, évaluation des vulnérabilités",
      "Gestion des risques: EBIOS RM, ISO 27001/27005, analyse et traitement des risques cyber",
      "Sécurité applicative: OWASP Top 10, secure coding, tests d'intrusion applicatifs",
      "Cryptographie: algorithmes de chiffrement, PKI, signatures numériques, protocoles cryptographiques",
      "Sécurité des infrastructures: firewalling, Netfilter, Nmap, segmentation réseau, défense en profondeur",
      "Urbanisation des SI et normes qualité: ISO 9001, ISO 22301, modélisation MERISE, PCA/PRA",
      "DevSecOps: intégration de la sécurité dans les pipelines CI/CD, conteneurs sécurisés",
    ],
    tags: [
      "ANSSI SecNumÉdu",
      "Audit SI",
      "EBIOS RM",
      "ISO 27001",
      "Pentesting",
      "Cryptographie",
      "DevSecOps",
      "PCA/PRA",
    ],
    highlight: true,
    badge: "Label ANSSI",
  },
  {
    title: "Master Technologies de l'Information et du Web",
    institution: "Université Claude Bernard Lyon 1",
    location: "Lyon, France",
    period: "Sept. 2022 - Août 2024",
    description: [
      "Classé dans le 1er tiers de la promotion - excellence académique",
      "Architecture distribuée: Kubernetes, Docker, microservices, scaling automatique",
      "DevOps & Infrastructure: CI/CD, GitLab/GitHub Actions, Terraform, Ansible, monitoring",
      "Sécurité: cryptographie appliquée, tests d'intrusion, OWASP, exploitation CVE",
      "Cloud Native: déploiement cloud, conteneurisation, orchestration",
      "Big Data: Apache Spark, traitement de flux temps réel, analyse de données massives",
      "Développement Web avancé: React, Vue.js, Node.js, WebSockets, WebRTC, PWA",
      "Performance: optimisation BDD, programmation concurrentielle, monitoring d'applications",
    ],
    tags: [
      "Kubernetes",
      "DevOps",
      "Sécurité Web",
      "Cloud Native",
      "React/Node.js",
      "Big Data",
      "1er tiers",
    ],
  },
  {
    title: "Master 1 Management et Stratégies d'Entreprise",
    institution: "École Tourangelle Supérieure NEED",
    location: "Tours, France",
    period: "Sept. 2024 - Sept. 2025",
    description: [
      "Compétences transversales en gestion d'entreprise et stratégie",
      "Business planning et analyse financière pour projets tech",
      "Management d'équipes et leadership dans un contexte international",
      "Marketing stratégique et communication corporate",
      "Gestion des ressources humaines et développement des talents",
      "Vision stratégique pour piloter des projets cybersécurité et IT",
    ],
    tags: [
      "Business Planning",
      "Management",
      "Leadership",
      "Stratégie",
      "Communication",
    ],
  },
  {
    title: "Licence Informatique",
    institution: "Université de Djibouti",
    location: "Djibouti",
    period: "Oct. 2017 - Juin 2020",
    description: [
      "Major de promotion: 1er sur 101 étudiants - excellence académique",
      "Fondamentaux solides: algorithmique, structures de données, conception logicielle",
      "Développement: Java, C, Python, SQL, programmation orientée objet",
      "Réseaux informatiques: protocoles TCP/IP, architecture réseau, sécurité de base",
      "Intelligence artificielle: apprentissage automatique, traitement du langage naturel",
      "Base de données: conception, optimisation, requêtes SQL avancées",
      "Projet de fin d'études: Application mobile de transport en commun (Android)",
    ],
    tags: [
      "Major promotion",
      "Java",
      "Algorithmique",
      "Réseaux",
      "BDD",
      "Architecture",
    ],
  },
];

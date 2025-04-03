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
    title: "Master en Technologies de l'Information et Web",
    institution: "Université Claude Bernard Lyon 1",
    location: "Lyon, France",
    period: "2022 - 2024",
    description: [
      "Architecture distribuée: monitoring et scaling d'applications sur Kubernetes, circuit breaker pattern, déploiement avec Terraform/Ansible.",
      "Performance: programmation concurrentielle, optimisation BDD distribuées, monitoring d'applications.",
      "Gestion de flux: Apache Spark/Storm, traitement temps réel, analyse de données massives.",
      "Sécurité: cryptographie, tests d'intrusion, OWASP, exploitation CVE, sécurité des applications web.",
      "DevOps: Docker, VXLAN, stockage objet, monitoring (logs, métriques), CI/CD, déploiement continu.",
      "Web: React, Vue, Node.js, Express, REST, WebSockets, WebRTC, PWA, WebAssembly.",
    ],
    tags: [
      "DevOps",
      "Microservices",
      "Cloud Native",
      "Web Avancé",
      "Sécurité",
      "Big Data",
    ],
  },
  {
    title: "Licence en Informatique",
    institution: "Université de Djibouti",
    location: "Djibouti, Djibouti",
    period: "2017 - 2020",
    description: [
      "Formation complète en développement logiciel et algorithmique",
      "Structures de données, Algorithmes, Développement web, Intelligence artificielle, Réseaux informatiques",
      "Projet étudiant: Deux applications mobile (conducteur et passager) de transport en commun à Djibouti",
      "Major de promotion: 1/101 étudiants",
    ],
    tags: ["Java", "SQL", "Algorithmes", "Architecture logicielle"],
  },
  {
    title: "Master 1 en Management et Stratégie d'Entreprise",
    institution: "École Tourangelle Supérieure-NEED",
    location: "Tours, France",
    period: "2024 - 2025",
    description: [
      "Développement des compétences en gestion d'entreprise et business planning",
      "Techniques de décision stratégique et analyse de l'environnement managérial",
      "Communication interne et externe, marketing stratégique",
      "Management d'équipes internationales et gestion des ressources humaines",
      "Mise en place d'outils d'organisation et de contrôle pour optimiser les performances",
      "Acquisition d'une vision transversale des différents départements de l'entreprise",
    ],
    tags: [
      "Business Planning",
      "Management",
      "Marketing",
      "RH",
      "Stratégie d'Entreprise",
      "Leadership",
    ],
  },
];

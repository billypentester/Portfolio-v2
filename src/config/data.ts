import cnss from '@/assets/images/certifications/cnss.webp'
import develop from '@/assets/images/certifications/develop.webp'
import pentesting from '@/assets/images/certifications/pentesting.webp'
import remote from '@/assets/images/certifications/remoteWork.webp'
import GDSC from '@/assets/images/certifications/GDSCCOMSATS.jpg'
import sqlSoloLearn from '@/assets/images/certifications/sqlSoloLearn.jpg'

import TutorHub from '@/assets/images/projects/tutorhub.webp'
import DEX from '@/assets/images/projects/dex.webp'
import Car from '@/assets/images/projects/carpart.webp'
import Bus from '@/assets/images/projects/buslink.webp'
import Covid from '@/assets/images/projects/covid.webp'
import Weather from '@/assets/images/projects/weather.webp'
import Wallet from '@/assets/images/projects/wallet.webp'
import Personality from '@/assets/images/projects/personality.webp'
import Profile from '@/public/images/about-me.jpeg'

import Simplex from '@/assets/images/experience/simplex.png'
import Fiverr from '@/assets/images/experience/fiverr.png'

import COMSATS from '@/assets/images/education/comsats-university-islamabad.webp'
import PGC from '@/assets/images/education/punjab-group-of-colleges.webp'

import IT from '@/assets/images/publications/it.webp'
import predict from '@/assets/images/publications/predict.webp'
import master from '@/assets/images/publications/master.webp'
import CyberSecurity from '@/assets/images/publications/cybersecurity.webp'
import WekaModelPrediction from '@/assets/images/publications/weka-model-prediction.webp'
import FrontendTenStages from '@/assets/images/publications/frontend-ten-stages.webp'

import KFCProject from '@/assets/images/projects/KFC.png'

import KFC from '@/assets/images/clients/kfc.png'
import Dominos from '@/assets/images/clients/dominos.png'
import PizzaHut from '@/assets/images/clients/pizzahut.png'
import CrustCulture from '@/assets/images/clients/crustculture.png'
import halla from '@/assets/images/clients/halla.png'
import Kyochon from '@/assets/images/clients/kyochon.png'
import { DataInterface, structuredDataInterface } from '../interface'

const data: DataInterface = {
  first_name: 'Bilal',
  last_name: 'Ahmad',
  identity_keyword: 'billypentester',
  seo: {
    title: "Bilal Ahmad - Software Engineer | Full Stack Developer",
    description: 'Skilled Software Engineer specializing in full-stack development with expertise in MERN, MEVN, and modern JavaScript frameworks. Experienced in building scalable web apps, mobile apps, and secure software solutions.',
    keywords: [
      "Bilal Ahmad",
      "Bilal Ahmad Software Engineer",
      "Bilal Ahmad Full Stack Developer",
      "Software Engineer in Pakistan",
      "MERN Stack Developer",
      "MEVN Stack Developer",
      "Full Stack Web Developer",
      "React Next.js Developer",
      "Node.js Backend Engineer",
      "Web Developer Bilal Ahmad"
    ],
    authors: [{ name: 'Bilal Ahmad', url: 'https://billypentester.pk' }],
    creator: 'Bilal Ahmad',
    publisher: 'Bilal Ahmad',
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: "Bilal Ahmad - Software Engineer | Full Stack Developer",
      description: 'Skilled Software Engineer specializing in full-stack development with expertise in MERN, MEVN, and modern JavaScript frameworks. Experienced in building scalable web apps, mobile apps, and secure software solutions.',
      url: 'https://billypentester.pk',
      siteName: 'Bilal Ahmad',
      type: 'website',
      images: [
        {
          url: 'https://billypentester.pk/portfolio.webp',
          width: 1200,
          height: 630,
          alt: 'Bilal Ahmad - Software Engineer'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: "Bilal Ahmad - Software Engineer | Full Stack Developer",
      description: "Bilal Ahmad | Full Stack Developer | MERN, MEVN, Next.js, Node.js",
      images: ['https://billypentester.pk/portfolio.webp'],
      creator: '@billypentester'
    },
    alternates: {
      canonical: 'https://billypentester.pk'
    },
    icons: [
      { rel: "icon", url: "/images/favicon.svg" },
      { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png" }
    ]
  },
  themes: [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellate',
    'abyss',
    'silk'
  ],
  profile_pic: Profile,
  socialLinks: [
    {
      name: 'email',
      url: 'mailto:contact@billypentester.pk'
    },
    {
      name: 'whatsapp',
      url: 'https://wa.me/923324187624?text=Hi%20Bilal%2C%20I%20want%20to%20hire%20you%20for%20my%20project'
    },
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/billypentester/'
    },
    {
      name: 'messenger',
      url: 'https://messenger.com/t/billypentester'
    }
  ],
  services: [
    {
      title: 'Full Stack Development',
      description: 'I can develop full stack web apps, designing dynamic web applications, building robust backend architectures, handling integrations and creating efficient database systems.',
      icon: 'fullstack'
    },
    {
      title: 'Security Auditing',
      description: 'I can perform comprehensive penetration testing, covering everything from reconnaissance and vulnerability assessment to exploitation, detailed reporting, and remediation.',
      icon: 'security'
    },
    {
      title: 'Technical SEO',
      description: 'I provide Technical SEO solutions, optimizing web performance, managing crawling and indexing, adding structured data, designing SEO-friendly site architecture, and integrating GA.',
      icon: 'seo'
    }
  ],
  edu: [
    {
      id: 1,
      title: 'Bachelor in Computer Science',
      university: 'COMSATS University Islamabad',
      startDate: '2019',
      endDate: '2023',
      city: 'Lahore',
      image: COMSATS
    },
    {
      id: 2,
      title: 'Intermediate in Computer Science',
      university: 'Punjab Group of Colleges',
      startDate: '2017',
      endDate: '2019',
      city: 'Lahore',
      image: PGC
    }
  ],
  clients: [
    {
      id: 1,
      name: 'KFC',
      image: KFC,
      url: "https://www.kfcpakistan.com/"
    },
    {
      id: 2,
      name: 'Dominos',
      image: Dominos,
      url: "https://www.dominos.com.pk/"
    },
    {
      id: 3,
      name: 'PizzaHut',
      image: PizzaHut,
      url: "https://www.pizzahut.co.za/"
    },
    {
      id: 4,
      name: 'Crust Culture',
      image: CrustCulture,
      url: "https://crustculture.com.pk/"
    },
    {
      id: 5,
      name: 'Halla Shawarma',
      image: halla,
      url: "https://www.hallashawarmame.com/"
    },
    {
      id: 6,
      name: 'Kyochon',
      image: Kyochon,
      url: "https://www.kyochonme.com/"
    }
  ],
  cert: [
    {
      title: 'Certified Network Security Specialist',
      image: cnss
    },
    {
      title: 'Remote Work Certification',
      image: remote,
    },
    {
      title: 'Advance Peneration Testing',
      image: pentesting,
    },
    {
      title: 'Develop Applications with GCP',
      image: develop,
    },
    // {
    //     title: '',
    //     image: GDSC,
    // },
    // {
    //     title: '',
    //     image: sqlSoloLearn,
    // }
  ],
  expertise: [
    {
      title: 'Frontend',
      skills: ['react', 'vue', 'nextjs', 'typescript', 'redux', 'tailwind', 'sass']
    },
    {
      title: 'Backend',
      skills: ['nodejs', 'nestjs', 'firebase', 'kafka', 'jest', 'graphql']
    },
    {
      title: 'Database',
      skills: ['mysql', 'postgresql', 'mongodb', 'redis']
    }
  ],
  work: [
    {
      title: 'TutorHub',
      image: TutorHub,
    },
    {
      title: 'Decenteralized Exchange',
      image: DEX,
    },
    {
      title: 'Car Part Ecommerce',
      image: Car,
    },
    {
      title: 'Bus Link',
      image: Bus,
    },
    {
      title: 'Covid Tracker',
      image: Covid,
    },
    {
      title: 'Weather App',
      image: Weather,
    },
    {
      title: 'Wallet Authenticator',
      image: Wallet,
    },
    {
      title: 'Personality Prediction',
      image: Personality,
    }
  ],
  experience: [
    {
      id: 'e1',
      title: 'Software Engineer',
      company: 'Simplex Technology Solutions',
      location: 'Lahore',
      startTime: "2023-09-01",
      endTime: '2024-11-17',
      currentlyWorking: true,
      logo: Simplex,
      url: "https://simplexts.net/"
    },
    {
      id: 'e2',
      title: 'MERN Developer',
      company: 'Fiverr',
      location: 'Remote',
      startTime: 'Sep 2022',
      endTime: 'Sep 2023',
      currentlyWorking: false,
      logo: Fiverr,
      url: "https://fiverr.com/"
    }
  ],
  publications: [
    {
      title: 'Predict your personality',
      description: 'How does one assess your personality based on a survey or interview question?',
      link: 'https://medium.com/mlearning-ai/predict-your-personality-f2c5d3701dc3',
      image: predict,
      tags: ['ML', 'AI']
    },
    {
      title: 'Ultimate 10 Stages to Master Backend Development',
      description: "A step-by-step guide to getting a job as a good backend developer",
      link: "https://billypentester.medium.com/ultimate-10-stages-to-master-backend-development-f6f65f22a327",
      image: master,
      tags: ['JS', 'Backend']
    },
    {
      title: 'Ethics and the IT Professional',
      description: 'Why ethics are important to follow? ',
      link: "https://billypentester.medium.com/ethics-and-the-it-professional-8b108a4f0ee",
      image: IT,
      tags: ['ethics', 'IT']
    },
    {
      title: 'Student study material engagement prediction model',
      description: 'Without the knowledge of coding, you can train the model using the weka tool.',
      link: 'https://billypentester.medium.com/student-study-material-engagement-prediction-model-using-weka-bd2a2ee97cd8',
      image: WekaModelPrediction,
      tags: ['Machine Learning', 'Data Mining']
    },
    {
      title: 'Ultimate 10 Stages to Master Frontend Development',
      description: 'A step-by-step guide to getting a job as a good frontend developer',
      link: 'https://levelup.gitconnected.com/ultimate-10-stages-to-master-frontend-development-9b075b904835',
      image: FrontendTenStages,
      tags: ['JavaScript', 'Frontend']
    },
    {
      title: 'Cyber security essentials',
      description: 'Intro to cyber security',
      link: 'https://medium.com/@billypentester/cyber-security-essentials-ad2bb8e9fce8',
      image: CyberSecurity,
      tags: ['Cyber Security', 'Essentials']
    }
  ],
  projects: [
    {
      title: 'KFC Pakistan',
      description: 'A full stack e-commerce web application for KFC Pakistan, built with Next.js, React, Node.js, Express, and MongoDB. Features include user authentication, product browsing, cart management, and order processing.',
      tags: ['React', 'Node.js', 'mySQL'],
      image: KFCProject,
      url: ''
    }
  ],

}

const worksFor = {
  "@type": "Organization",
  "name": "Simplex Technology Solutions",
  "url": "https://simplexts.net",
  "logo": "https://simplexts.net/wp-content/uploads/2023/12/Untitled-design-91-1.png.webp"
}

const knowsAbout = [
  "MERN Stack",
  "MEVN Stack",
  "Cybersecurity",
  "Penetration Testing",
  "Full Stack Development",
  "Scalable System Design",
]

const sameAs = [
  "http://linkedin.com/in/billypentester",
  "https://github.com/billypentester",
  "https://twitter.com/billypentester",
  "https://www.facebook.com/billypentester",
  "https://www.instagram.com/billypentester",
  "https://billypentester.medium.com",
  "https://www.fiverr.com/billypentester",
  "https://wa.me/923324187624"
]

const offerCatalog = {
  "@type": "OfferCatalog",
  "name": "Services",
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Full Stack Web Development",
        "description": "Building scalable and efficient applications with MERN & MEVN."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Penetration Testing",
        "description": "Comprehensive security testing from reconnaissance to exploitation."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Technical SEO",
        "description": "Improving website performance and search engine rankings."
      }
    }
  ]
}

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateCreated": "2025-09-13T00:00:00+05:00",
  "dateModified": "2025-09-13T00:00:00+05:00",
  "mainEntity": {
    "@type": "Person",
    "name": "Bilal Ahmad",
    "alternateName": "Billy Pentester",
    "identifier": "billypentester",
    "url": "https://billypentester.pk",
    "image": "https://billypentester.pk/images/about-me.jpeg",
    "jobTitle": "Software Engineer & Security Expert",
    "description": "I am Bilal Ahmad, a passionate Software Engineer & Security Expert. I offer services in full-stack web development, penetration testing, and technical SEO.",
    "worksFor": worksFor,
    "sameAs": sameAs,
    "knowsAbout": knowsAbout
  }
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bilal Ahmad",
  "url": "https://billypentester.pk",
}

const aboutMebreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "About Me",
      "item": "https://billypentester.pk/about-me"
    }
  ]
}

const blogBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Blogs",
      "item": "https://billypentester.pk/blogs"
    },
  ]
}

const projectBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Projects",
      "item": "https://billypentester.pk/projects"
    },
  ]
}

const certificationsBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Certificates",
      "item": "https://billypentester.pk/certificates"
    },
  ]
}

const structuredData: structuredDataInterface = {
  profileSchema,
  websiteSchema,
  aboutMebreadcrumbSchema,
  projectBreadcrumbSchema,
  blogBreadcrumbSchema,
  certificationsBreadcrumbSchema
}


export { data, structuredData }


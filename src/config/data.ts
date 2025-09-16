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

import KFCProject from '@/assets/images/projects/KFC.png'

import KFC from '@/assets/images/clients/kfc.png'
import Dominos from '@/assets/images/clients/dominos.png'
import PizzaHut from '@/assets/images/clients/pizzahut.png'
import CrustCulture from '@/assets/images/clients/crustculture.png'
import halla from '@/assets/images/clients/halla.png'
import Kyochon from '@/assets/images/clients/kyochon.png'
import { DataInterface } from '../interface'

const data : DataInterface = {
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
    experience : [
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
        }
    ],
    projects: [
        {
            title: 'KFC Pakistan',
            description: 'A full stack e-commerce web application for KFC Pakistan, built with Next.js, React, Node.js, Express, and MongoDB. Features include user authentication, product browsing, cart management, and order processing.',
            tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
            image: KFCProject,
            url: ''
        }
    ] 
}

export { data }


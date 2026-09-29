import FrontendTenStages from '@/assets/images/publications/frontend-ten-stages.webp'
import BackendTenStages from '@/assets/images/publications/master.webp'
import WekaModelPrediction from '@/assets/images/publications/weka-model-prediction.webp'
import Predict from '@/assets/images/publications/predict.webp'
import CyberSecurity from '@/assets/images/publications/cybersecurity.webp'
import IT from '@/assets/images/publications/it.webp'
import Web3Part1 from '@/assets/images/publications/web3-1.webp'
import Web3Part2 from '@/assets/images/publications/web3-2.webp'
import Web3Part3 from '@/assets/images/publications/web3-3.webp'
import type { Publication } from './types'

export const publications: Publication[] = [
  {
    source: 'external',
    title: 'Ultimate 10 Stages to Master Backend Development',
    description: 'A step-by-step guide to becoming a job-ready backend developer.',
    url: 'https://levelup.gitconnected.com/ultimate-10-stages-to-master-backend-development-f6f65f22a327',
    publisher: 'Level Up Coding',
    category: 'Career',
    tags: ['Backend', 'JavaScript'],
    cover: BackendTenStages,
    featured: true,
  },
  {
    source: 'external',
    title: 'Ultimate 10 Stages to Master Frontend Development',
    description: 'A step-by-step guide to becoming a job-ready frontend developer.',
    url: 'https://levelup.gitconnected.com/ultimate-10-stages-to-master-frontend-development-9b075b904835',
    publisher: 'Level Up Coding',
    category: 'Career',
    tags: ['Frontend', 'JavaScript'],
    cover: FrontendTenStages,
    featured: true,
  },
  {
    source: 'external',
    title: 'Web3.js in Practice — Part I',
    description: 'The basics of the web3.js API.',
    url: 'https://coinsbench.com/web3-js-in-practical-part-i-39fbbd65738b',
    publisher: 'CoinsBench',
    category: 'Web3',
    tags: ['Blockchain', 'Web3', 'Solidity'],
    cover: Web3Part1,
    featured: true,
  },
  {
    source: 'external',
    title: 'Web3.js in Practice — Part II',
    description: 'Interacting with smart contracts through the web3.js API.',
    url: 'https://coinsbench.com/web3-js-in-practical-part-ii-937b035a8c0c',
    publisher: 'CoinsBench',
    category: 'Web3',
    tags: ['Blockchain', 'Web3', 'Solidity'],
    cover: Web3Part2,
  },
  {
    source: 'external',
    title: 'Web3.js in Practice — Part III',
    description: 'Compiling and deploying contracts with the web3.js API.',
    url: 'https://coinsbench.com/web3-js-in-practical-part-iii-6ed2080f84b7',
    publisher: 'CoinsBench',
    category: 'Web3',
    tags: ['Blockchain', 'Web3', 'Solidity'],
    cover: Web3Part3,
  },
  {
    source: 'external',
    title: 'Cyber Security Essentials',
    description: 'An introduction to cyber security.',
    url: 'https://medium.com/@billypentester/cyber-security-essentials-ad2bb8e9fce8',
    publisher: 'Medium',
    category: 'Security',
    tags: ['Cyber Security'],
    cover: CyberSecurity,
  },
  {
    source: 'external',
    title: 'Student Study Material Engagement Prediction Model',
    description: 'Training a prediction model with the Weka tool, no code required.',
    url: 'https://billypentester.medium.com/student-study-material-engagement-prediction-model-using-weka-bd2a2ee97cd8',
    publisher: 'Medium',
    category: 'Machine Learning',
    tags: ['Machine Learning', 'Data Mining'],
    cover: WekaModelPrediction,
  },
  {
    source: 'external',
    title: 'Predict Your Personality',
    description: 'How can personality be assessed from survey or interview answers?',
    url: 'https://medium.com/mlearning-ai/predict-your-personality-f2c5d3701dc3',
    publisher: 'MLearning.ai',
    category: 'Machine Learning',
    tags: ['Machine Learning', 'AI'],
    cover: Predict,
  },
  {
    source: 'external',
    title: 'Ethics and the IT Professional',
    description: 'Why professional ethics matter in IT.',
    url: 'https://billypentester.medium.com/ethics-and-the-it-professional-8b108a4f0ee',
    publisher: 'Medium',
    category: 'Career',
    tags: ['Ethics', 'IT'],
    cover: IT,
  },
]

export const featuredPublications = publications.filter((p) => p.featured)

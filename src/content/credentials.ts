import COMSATS from '@/assets/images/education/comsats-university-islamabad.webp'
import PGC from '@/assets/images/education/punjab-group-of-colleges.webp'
import CNSS from '@/assets/images/certifications/cnss.webp'
import Develop from '@/assets/images/certifications/develop.webp'
import Pentesting from '@/assets/images/certifications/pentesting.webp'
import Remote from '@/assets/images/certifications/remoteWork.webp'
import GDSCLead from '@/assets/images/certifications/GDSCCOMSATS.webp'
import PAMCybrary from '@/assets/images/certifications/PAMCybrary.webp'
import SQLSoloLearn from '@/assets/images/certifications/sqlSoloLearn.webp'
import NSE2 from '@/assets/images/certifications/NSE2.webp'
import APIArchitect from '@/assets/images/certifications/apiArchitect.webp'
import SecurityFoundation from '@/assets/images/certifications/securityFoundation.webp'
import type { Certification, Education } from './types'

export const education: Education[] = [
  {
    id: 'comsats',
    degree: 'BSc Computer Science',
    institution: 'COMSATS University Islamabad',
    city: 'Lahore',
    start: '2019',
    end: '2023',
    logo: COMSATS,
  },
  {
    id: 'pgc',
    degree: 'Intermediate in Computer Science',
    institution: 'Punjab Group of Colleges',
    city: 'Lahore',
    start: '2017',
    end: '2019',
    logo: PGC,
  },
]

// Add issuer, issuedAt, credentialId and verifyUrl as they are confirmed; the UI shows them when present.
export const certifications: Certification[] = [
  { id: 'cnss', title: 'Certified Network Security Specialist', image: CNSS, topics: ['Network security'], featured: true },
  { id: 'pentesting', title: 'Advance Penetration Testing', image: Pentesting, topics: ['Penetration testing'], featured: true },
  { id: 'gcp-develop', title: 'Develop Applications with GCP', image: Develop, topics: ['Google Cloud'], featured: true },
  { id: 'remote-work', title: 'Remote Work Certification', image: Remote, topics: ['Remote collaboration'], featured: true },
  { id: 'api-architect', title: 'API Architect Certification', image: APIArchitect, topics: ['API design'] },
  { id: 'nse2', title: 'NSE 2 — Network Security Associate', issuer: 'Fortinet', image: NSE2, topics: ['Network security'] },
  { id: 'pam', title: 'Privileged Access Management', issuer: 'Cybrary', image: PAMCybrary, topics: ['Identity & access'] },
  { id: 'security-foundation', title: 'Security Foundation Professional Certificate', image: SecurityFoundation, topics: ['Security fundamentals'] },
  { id: 'sql', title: 'SQL', issuer: 'SoloLearn', image: SQLSoloLearn, topics: ['SQL'] },
  { id: 'gdsc-lead', title: 'GDSC Cloud Lead', issuer: 'Google Developer Student Clubs, COMSATS', image: GDSCLead, topics: ['Community', 'Cloud'] },
]

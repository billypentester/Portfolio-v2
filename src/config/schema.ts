
const worksFor = {
  "@type": "Organization",
  "legalName": "Simplex Technology Solutions",
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
  "https://twitter.com/billypentester"
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

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bilal Ahmad",
  "url": "https://billypentester.pk",
  "image": "https://billypentester.pk/images/about-me.jpeg",
  "jobTitle": "Software Engineer & Security Expert",
  "description": "I am Bilal Ahmad, a passionate Software Engineer & Security Expert. I offer services in full-stack web development, penetration testing, and technical SEO.",
  "worksFor": worksFor,
  "sameAs": sameAs,
  "knowsAbout": knowsAbout,
  "hasOfferCatalog": offerCatalog
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
    "knowsAbout": knowsAbout,
    "hasOfferCatalog": offerCatalog

  }
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
    }, 
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blogs",
      "item": "https://billypentester.pk/blogs"
    },
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


export { aboutSchema, profileSchema, aboutMebreadcrumbSchema, projectBreadcrumbSchema, blogBreadcrumbSchema  }
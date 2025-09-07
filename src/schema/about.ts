
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bilal Ahmad",
  "url": "https://billypentester.pk",
  "image": "https://billypentester.pk/images/about-me.jpeg",
  "jobTitle": "Software Engineer & Security Expert",
  "worksFor": {
    "@type": "Organization",
    "name": "Independent / Freelancer"
  },
  "sameAs": [
    "http://linkedin.com/in/billypentester",
    "https://github.com/billypentester",
    "https://twitter.com/billypentester"
  ],
  "description": "I am Bilal Ahmad, a passionate Software Engineer & Security Expert. I offer services in full-stack web development, penetration testing, and scalable system design.",
  "knowsAbout": [
    "MERN Stack",
    "MEVN Stack",
    "Cybersecurity",
    "Penetration Testing",
    "Full Stack Development"
  ],
  "hasOfferCatalog": {
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
          "name": "SEO & Performance Optimization",
          "description": "Boosting site speed, search ranking, and security."
        }
      }
    ]
  }
}

export default aboutSchema;

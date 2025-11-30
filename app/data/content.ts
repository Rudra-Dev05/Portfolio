export const personalInfo = {
  name: "Rudradev Myadara",
  role: "System Engineer",
  company: "Infosys",
  specialization: "Salesforce Developer",
  location: "Hyderabad, India",
  email: "myadararudradev@gmail.com",
  education: {
    degree: "B.Tech in CSE with AIML",
    college: "Vasavi College of Engineering",
    year: "2025"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/rudradev-myadara/",
    github: "https://github.com/Rudra-Dev05",
    twitter: "https://x.com/RMyadara",
    resume: "https://drive.google.com/file/d/13oN1fousZwZPAe11iz_fNYWDTQDlnno_/view?usp=sharing"
  },
  bio: {
    short: "System Engineer at Infosys & Salesforce Developer. I code for fun.",
    long: "I'm Rudradev, a System Engineer at Infosys and a Salesforce Developer based in Hyderabad. I code for fun and specialize in building intelligent systems and scalable solutions.",
    tagline: "Crafting digital experiences with code, intelligence, and passion."
  }
}

export const navigation = [
  { label: "Projects", href: "#work" },
  { label: "Craft", href: "/about" },
  { label: "Connect", href: "#footer", noHover: true }
]

export const footerLinks = [
  { label: "Email", href: `mailto:${personalInfo.email}` },
  { label: "Resume", href: personalInfo.social.resume },
  { label: "X/Twitter", href: personalInfo.social.twitter },
  { label: "LinkedIn", href: personalInfo.social.linkedin },
  { label: "GitHub", href: personalInfo.social.github }
]

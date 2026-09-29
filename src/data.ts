export const profile = {
  name: 'Akash Verma',
  role: 'Senior Full-Stack Engineer',
  location: 'Toronto, Canada',
  email: 'akash.dev3497@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akash-dev97/',
  github: 'https://github.com/akash-verma-au16',
  careerStart: '2019-09',
}

export const rotatingRoles = [
  'React & TypeScript front ends',
  'FastAPI services and async workers',
  'CI/CD pipelines to Kubernetes',
  'security automation for analysts',
  'data pipelines that feed dashboards',
]

export type Stat = { value?: number; prefix?: string; suffix?: string; text?: string; label: string }

export const stats: Stat[] = [
  { value: 7, suffix: '+', label: 'years shipping production software' },
  { value: 50, prefix: '~', suffix: '%', label: 'manual analyst effort automated away' },
  { value: 6, label: 'companies across banking, retail and ed-tech' },
  { text: 'Multi-$M', label: 'in savings from migration automation' },
]

export const capabilities = [
  {
    title: 'Front end',
    icon: '◧',
    blurb: 'Complete, user-facing applications in React and TypeScript. Component architecture, state, typed APIs and the workflows people use every day.',
    tags: ['React', 'TypeScript', 'Next.js', 'React Native', 'Redux', 'Tailwind'],
  },
  {
    title: 'Back end & data',
    icon: '⌬',
    blurb: 'FastAPI and Django services, async processing with Celery and Redis, and Airflow pipelines that turn messy data into something useful.',
    tags: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'Airflow', 'Databricks'],
  },
  {
    title: 'DevOps & security',
    icon: '⛨',
    blurb: 'GitHub Actions CI/CD to Kubernetes on OpenShift, security scanning in the pipeline, and secrets kept in Vault where they belong.',
    tags: ['GitHub Actions', 'Kubernetes', 'OpenShift', 'Vault', 'Azure', 'AWS'],
  },
]

export type Job = {
  company: string
  short: string
  title: string
  start: string
  end: string | null
  location: string
  summary: string
  points: string[]
  stack: string[]
}

export const experience: Job[] = [
  {
    company: 'RBC (Royal Bank of Canada)',
    short: 'RBC',
    title: 'Senior DevOps Developer',
    start: '2025-02',
    end: null,
    location: 'Toronto, ON',
    summary: 'Building an internal network-security platform that manages the full firewall-rule lifecycle for network and risk analysts.',
    points: [
      'Built the complete user-facing front end in React and TypeScript: provisioning, attestation, decommissioning and migration.',
      'Owned front-end architecture end to end: component design, state management, typed API integration and analyst workflows.',
      'Developed FastAPI services on PostgreSQL with Databricks as a data source, plus Celery/Redis workers for long-running jobs.',
      'Designed workflows that cut manual effort in the rule lifecycle by about half; Airflow pipelines feed Tableau dashboards.',
      'Built GitHub Actions CI/CD to Kubernetes pods on Azure-hosted OpenShift, with security scanning and Vault-managed secrets.',
      'Contributed to a data-center migration tool automating large-scale IP-pair firewall migrations, with multi-million-dollar savings.',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Airflow', 'GitHub Actions', 'OpenShift', 'Vault'],
  },
  {
    company: 'Canadian Tire Corporation',
    short: 'Canadian Tire',
    title: 'Python Developer',
    start: '2023-08',
    end: '2025-02',
    location: 'Toronto, ON',
    summary: 'Backend services for internal warehouse and inventory-management applications.',
    points: [
      'Built and enhanced REST APIs and services with Python, Django and FastAPI.',
      'Designed schemas and queries in PostgreSQL for reliable operational data.',
      'Integrated services with internal systems through Agile delivery, reviews and testing.',
    ],
    stack: ['Python', 'Django', 'FastAPI', 'PostgreSQL'],
  },
  {
    company: 'BMO (Bank of Montreal)',
    short: 'BMO',
    title: 'Python Developer',
    start: '2023-01',
    end: '2023-08',
    location: 'Montreal, QC',
    summary: 'Security automation and reporting for security analysts and senior stakeholders.',
    points: [
      'Automated recurring security and operational tasks, reducing manual work for analysts.',
      'Consolidated data from multiple security consoles over REST APIs into automated reports.',
      'Built dashboards of security metrics and trends with Pandas, Matplotlib and Chart.js.',
    ],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Chart.js', 'REST APIs'],
  },
  {
    company: "CareerNinja's Digital Institute",
    short: 'CareerNinja',
    title: 'Software Engineer',
    start: '2022-02',
    end: '2022-12',
    location: 'Mumbai, India',
    summary: 'The LearnTube learning platform across web, Android and a Chrome extension.',
    points: [
      'Built the LearnTube web and Android apps with React, React Native, Expo and Redux.',
      'Developed backend APIs for learning, assessment and content delivery.',
      'Shipped push notifications, analytics, and a Chrome extension that surfaces courses on YouTube.',
    ],
    stack: ['React', 'React Native', 'Expo', 'Redux', 'Node.js', 'Firebase'],
  },
  {
    company: 'PeakMind',
    short: 'PeakMind',
    title: 'Full Stack Engineer',
    start: '2021-08',
    end: '2022-02',
    location: 'Bengaluru, India',
    summary: 'Wellbeing platforms for companies and schools.',
    points: [
      'Built full-stack features in TypeScript and Python.',
      'Designed REST APIs covering application logic, authentication and integrations.',
    ],
    stack: ['TypeScript', 'JavaScript', 'Python'],
  },
  {
    company: 'Thoughtworks',
    short: 'Thoughtworks',
    title: 'Software Developer',
    start: '2019-09',
    end: '2021-08',
    location: 'Hyderabad, India',
    summary: 'Responsive web applications for client projects.',
    points: [
      'Built responsive React applications and reusable UI components integrated with REST services.',
      'Delivered enhancements, fixes and cross-browser work in Agile teams.',
    ],
    stack: ['React', 'JavaScript', 'HTML/CSS'],
  },
]

export type Project = {
  title: string
  context: string
  problem: string
  built: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    title: 'Firewall-rule lifecycle platform',
    context: 'RBC · internal',
    problem: 'Analysts moved firewall rules through provisioning, attestation, decommissioning and migration by hand.',
    built: ['The complete React + TypeScript front end', 'FastAPI services and Celery/Redis workers', 'Automation that removes about half the manual effort'],
    stack: ['React', 'TypeScript', 'FastAPI', 'Celery', 'PostgreSQL'],
  },
  {
    title: 'Data-center migration automation',
    context: 'RBC · internal',
    problem: 'Moving huge sets of IP-to-IP firewall pairs between data centers was slow, manual and risky.',
    built: ['Automated large-scale IP-pair migrations', 'Pipelines validating every pair before it moves', 'Multi-million-dollar savings'],
    stack: ['Python', 'Pandas', 'Airflow', 'PostgreSQL'],
  },
  {
    title: 'Security reporting automation',
    context: 'BMO',
    problem: 'Security metrics lived in several consoles and were assembled into reports by hand.',
    built: ['Collectors pulling from security consoles over REST', 'Automated stakeholder reports', 'Trend dashboards'],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Chart.js'],
  },
  {
    title: 'LearnTube apps & extension',
    context: 'CareerNinja',
    problem: 'Learners needed one experience across web, Android and the pages they already browse.',
    built: ['Web and Android apps from shared React skills', 'Push notifications and analytics', 'A Chrome extension on YouTube'],
    stack: ['React', 'React Native', 'Expo', 'Redux', 'Firebase'],
  },
]

export const skills: Record<string, string[]> = {
  Frontend: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'React Native', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3'],
  Backend: ['Python', 'FastAPI', 'Django', 'Flask', 'Node.js', 'REST APIs', 'Celery', 'Redis', 'Java'],
  'DevOps & Cloud': ['GitHub Actions', 'CI/CD', 'Kubernetes', 'OpenShift', 'Docker', 'Azure', 'AWS IAM', 'Lambda', 'S3', 'CloudWatch', 'CloudTrail', 'CloudFormation', 'GCP'],
  Security: ['Vault', 'Pipeline security scanning', 'Firewall-rule lifecycle', 'Network security automation'],
  Data: ['PostgreSQL', 'MySQL', 'Databricks', 'Airflow', 'Pandas', 'NumPy', 'Tableau'],
  'AI tooling': ['Claude Code', 'Agentic AI-assisted development'],
}

export const education = [
  { school: 'Conestoga College', detail: 'Cloud Computing and Network Security', period: '2023 – 2024' },
  { school: 'BITS Pilani', detail: 'Bachelor of Technology', period: '2015 – 2019' },
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

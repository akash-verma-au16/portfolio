export const profile = {
  name: 'Akash Verma',
  role: 'Full-Stack Software Engineer',
  tagline: 'Backend services, data pipelines and React/TypeScript front ends for security-focused platforms.',
  location: 'Toronto, Canada',
  email: 'akash.dev3497@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akash-dev97/',
  github: 'https://github.com/akash-verma-au16',
}

export const about = [
  "I'm a full-stack engineer with seven years of experience building software that takes manual, error-prone work off people's plates. Today I'm a Senior DevOps Developer at RBC, where a team of three of us is building a network-security platform from scratch.",
  'I like owning a feature end to end: sketching the system design, building the API and the async workers behind it, shipping the UI in front of it, and watching it run in production. Most of my recent work sits where backend engineering meets cloud and network security.',
]

export type Job = {
  company: string
  title: string
  period: string
  location: string
  points: string[]
  stack: string[]
}

export const experience: Job[] = [
  {
    company: 'RBC',
    title: 'Senior DevOps Developer',
    period: 'Feb 2025 - Present',
    location: 'Toronto, ON',
    points: [
      'Building, from the ground up, a unified platform that manages the full firewall-rule lifecycle (provisioning, attestation, decommissioning and migration) for network and risk analysts.',
      'Designed and built the entire React/TypeScript front end single-handedly.',
      'Built FastAPI services on PostgreSQL with Databricks as a data source, plus Celery/Redis workers for long-running jobs.',
      'Automated pipelines that remove roughly half of the manual effort in the rule lifecycle; Airflow DAGs feed Tableau dashboards.',
      'Helped deliver a data-center migration product that automates large-scale IP-pair migrations, saving millions of dollars.',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Airflow', 'Databricks'],
  },
  {
    company: 'Canadian Tire Corporation',
    title: 'Python Developer',
    period: 'Aug 2023 - Feb 2025',
    location: 'Toronto, ON',
    points: [
      'Built backend services and REST APIs for internal warehouse and inventory-management applications.',
      'Designed and managed PostgreSQL data for operational workflows.',
    ],
    stack: ['Python', 'Django', 'FastAPI', 'PostgreSQL'],
  },
  {
    company: 'BMO',
    title: 'Python Developer',
    period: 'Jan 2023 - Aug 2023',
    location: 'Montreal, QC',
    points: [
      'Automated recurring security operations and reporting for security analysts.',
      'Consolidated data from multiple security consoles over REST APIs into dashboards for senior stakeholders.',
    ],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Chart.js', 'REST APIs'],
  },
  {
    company: "CareerNinja's Digital Institute",
    title: 'Software Engineer',
    period: 'Feb 2022 - Dec 2022',
    location: 'Mumbai, India',
    points: [
      'Built the LearnTube web and Android apps and their backend APIs.',
      'Shipped push notifications, analytics, and a Chrome extension that surfaces courses on YouTube.',
    ],
    stack: ['React', 'React Native', 'Expo', 'Redux', 'Node.js', 'Firebase'],
  },
  {
    company: 'PeakMind.in',
    title: 'Full Stack Engineer',
    period: 'Aug 2021 - Feb 2022',
    location: 'Bengaluru, India',
    points: ['Built full-stack features and REST APIs, including authentication, for wellbeing platforms used by companies and schools.'],
    stack: ['TypeScript', 'JavaScript', 'Python'],
  },
  {
    company: 'Thoughtworks',
    title: 'Software Developer',
    period: 'Sep 2019 - Aug 2021',
    location: 'Hyderabad, India',
    points: ['Built responsive React applications and reusable UI components integrated with REST services.'],
    stack: ['React', 'JavaScript', 'HTML/CSS'],
  },
]

export const highlights = [
  { value: '7 yrs', label: 'building production software' },
  { value: '~50%', label: 'of manual analyst effort automated away' },
  { value: '3', label: 'engineers building a security platform from scratch' },
]

export const skills: Record<string, string[]> = {
  Languages: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'Shell'],
  Backend: ['FastAPI', 'Django', 'Flask', 'Node.js', 'REST APIs', 'Celery', 'Redis'],
  Frontend: ['React', 'Next.js', 'React Native', 'Redux', 'Tailwind CSS'],
  'Cloud & DevOps': ['AWS IAM', 'Lambda', 'S3', 'CloudWatch', 'CloudTrail', 'CloudFormation', 'GCP', 'Azure', 'Docker', 'CI/CD'],
  Data: ['PostgreSQL', 'MySQL', 'Databricks', 'Airflow', 'Pandas', 'NumPy', 'Tableau'],
  'AI tooling': ['Claude Code', 'Agentic AI-assisted development'],
}

export const education = [
  { school: 'Conestoga College', detail: 'Cloud Computing and Network Security', period: '2023 - 2024' },
  { school: 'BITS Pilani', detail: 'Bachelor of Technology', period: '2015 - 2019' },
]

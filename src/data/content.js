export const site = {
  name: "Dweep Vartak",
  brand: "Dweep",
  email: "2004dweep@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/DweepVartak" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dweep-vartak/" },
    { label: "CV (PDF)", href: "/cv.pdf" },
  ],
};

export const hero = {

  line1: "Hi.",
  line2a: "I'm ",
  line2b: "Dweep",
  sub: [
    "I teach robots to look at things and then do something sensible about it :)",
    "Currently an MS by Research student in the robotics cluster at IIT Madras.",
  ],
};

export const about = {
  caption: "me :)",
  paragraphs: [
    "Physics-curious kid who got into computer vision.<br><b>How I work:</b> get something working end to end first and then reiterate.",

    "At Quidich Innovation Labs I trained player and body detection models for live cricket broadcast — it aired during the ICC T20 World Cup Final and IPL 2025.<br><b>The Best Part?</b> I worked with the whole pipeline end to end: collection, annotation, training, then watching it go out live with no chance to fix it.",

    "Looking for <b>internships and collaborations</b> in Embodied AI, RL and perception. The dog at the bottom is Tuppy. Say hi, she responds.",
  ],
};

export const experience = [
  {
    when: "2026 — present",
    role: "MS by Research",
    org: "INSPIRE Lab, SIDiS (Robotics Cluster), IIT Madras",
    desc: "Working on Deformation of Soft-body and its manipulation.",

    img: { src: "work/inspire-lab1.jpg", cap: "ongoing" },
  },
  {
    when: "Jan — Mar 2025",
    role: "Machine Learning Intern",
    org: "Quidich Innovation Labs",
    href: "https://quidich.com/",
    desc: "Built Deep learning models for player, head and body detection powering Stiqy overlays and Quidich Tracker — 92% detection accuracy across varied broadcast conditions. Also ran the annotation pipeline and automated preprocessing so training could happen overnight.",

    img: null,
    imgs: [
      { src: "work/annotation.jpg", cap: "Augmented data" },
      { src: "work/quidich.jpg", cap: "Tracker" },
      { src: "work/quidich3.jpg", cap: "Fielding positions, live on air" },
    ],
  },
  {
    when: "2021 — 2025",
    role: "B.Tech, Artificial Intelligence & Data Science",
    org: "K. J. Somaiya Institute of Technology, Mumbai",
    desc: "CGPA 9.23.",
    img: null,
  },
];

export const interests = {
  lead: "Off the clock —",
  items: [
    "football",
    "running",
    "drawing and painting",
    "video games",
    "dogs, unreasonably",
  ],
  tail: "Tuppy down there is twelve frames I drew myself, so consider that exhibit A.",

  media: [
    { src: "life/run.mp4", cap: "chasing a sub-20 5k" },
    { src: "life/football.jpg", cap: "since childhood" },
    { src: "life/optimus.jpg", cap: "so cool" },
  ],
};

export const secret = {
  len: 4,
  iterations: 250000,
  salt: "jV5Yy2O+stuxz3MkJIVxbA==",
  iv: "ltUP1JD/m5sRa2Lb",
  ct: "b36DPtMgdlG+6X1Ag1PkePIB19qKxqN/NKyMWqQmcT9lR649q6G610IgJ/ma4Su6",
};

export const contact = {
  lede: "Open to internships and collaborations in perception and robot learning. Or just drop by to say hello.",
};

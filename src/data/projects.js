export const projects = [

  {
    slug: "assistive-device",
    title: "An Edge AI wearable for the visually impaired",
    year: null,
    award: "Silver medal, Aavishkar · Represented University of Mumbai",
    card: {
      desc: "Camera in a pair of sunglasses, a Raspberry Pi in your pocket, and the whole perception stack running on it — detection, depth, scene description and spoken question answering, with no cloud and no connectivity issues.",
      stack: "Raspberry Pi 5 · Hailo-8L · ONNX · YOLO · VLM · STT / TTS",
      thumb: "work/netra-thumb.jpg",
      thumbCap: "the prototype",
    },
    page: {
      lede: "Commercial assistive wearables cost around 5 lakh rupees and stop working when the network does. This one is a pair of sunglasses, a Pi, and everything running locally.",
      hero: null,
      sections: [
        {
          h: "The problem with what exists",
          p: "Every AI push frames to the cloud, so they inherit its latency and its outages — and a person crossing a road needs an answer now, not after a round trip. Dedicated wearables such as Envision Glasses and OrCam avoid some of that, but land around ₹5 lakh, which puts them out of reach of most of the people who need them. Both problems point the same way: put the models on the device, and use hardware people can actually buy.",
        },
        {
          h: "What it does",
          p: 'Four things, all through speech. It names objects it sees. It flags obstacles ahead as navigation cues. It describes a scene in about 25 tokens when asked and it answers spoken questions about what is in front of you. The whole thing wakes on "Hey, Netra", so it is hands-free.',
        },
        {
          h: "Making it fit",
          p: "A camera mounted into a pair of sunglasses runs over ribbon cable to a Raspberry Pi 5 with a Hailo-8L accelerator on an M.2 HAT. Models were exported to ONNX and then compiled down to the Hailo runtime, which is where most of the latency came out. The rest came from restructuring the pipeline to run multi-threaded, so capture, inference and speech synthesis overlap instead of queueing behind each other.",
        },
        {
          h: "Where it breaks",
          p: "Detection accuracy sits at 70–75%, the camera covers a 75° field of view, and below roughly 100 lux it degrades badly, so it is a daylight and lit-indoor device, not a low-light one. The light sensitivity is the first thing I would solve next.",
        },
        {
          h: "Credit and recognition",
          p: "Silver medal at Aavishkar, and selected to represent the University of Mumbai. Built as a final-year project with Chaitanya Mule and Devang Wangde. I specially worked on optimizing model as per hailo constraints and reducing the latency of the entire pipeline.",
        },
      ],
      figures: [
        {
          src: "work/wall_clock_caption.mp4",
          cap: "Demo",
        },
        {
          src: "work/netra-thumb.jpg",
          cap: "The Device",
        },
        {
          src: "work/netra.jpg",
          cap: "Architecture",
        },
      ],
      links: [
        { label: "Code", href: "#" },
      ],
    },
  },

  {
    slug: "vision-agents",
    title: "Vision-only game agents",
    year: null,
    card: {
      desc: "Agents that play from screen pixels alone, with no access to engine state or game APIs. If it only needs the screen, it works.",
      stack: "DQN · Stable Baselines3 · Gymnasium · MSS · OpenCV · PaddleOCR",
      thumb: "work/106.mp4",
      thumbCap: "just flying",
    },
    page: {
      lede: "A robot cannot query the world for its internal variables. It gets pixels, and it has to act. These agents are that same solution.",
      hero: null,
      sections: [
        {
          h: "Why pixels only",
          p: "Most game-playing agents are handed engine state (position, velocity, score) through an API or simulator hook. That makes the problem easier in exactly the way that stops it transferring. Reading the screen instead means facing what an embodied system faces: partial observability, capture latency, and no reward signal handed over for free.",
        },
        {
          h: "Flappy Bird",
          p: "A custom Gymnasium environment where observations come from MSS screen capture rather than the game itself. The game never tells the agent how it is doing. Trained as a Deep Q-Network with Stable Baselines3. Best run reached 176 points in a single session.",
        },
        {
          h: "The classic Snake game",
          p: "A longer-horizon problem: Flappy Bird only ever asks \u201cflap or not\u201d against an obstacle a second away, while Snake has to avoid trapping itself in a corner it built twenty moves ago. Training ran with a live score plot beside the game, so a run that had stopped improving was obvious within a few games.",
        },
        {
          h: "The counter-example: Elden Ring",
          p: "I also automated rune farming in Elden Ring, and it is worth being precise about what that is: scripted keyboard and mouse input on fixed intervals. No perception, no policy, no learning — a macro. It works, and it keeps working right up until the game does something the schedule did not anticipate, at which point it fails silently and keeps pressing buttons at nothing.",
        },
        {
          h: "What carried across",

          p: "Less than I'd hoped, and the split was the useful part. The plumbing carried over completely \u2014 screen capture, preprocessing, the training loop, the live plotting \u2014. The agent and the reward had to be rebuilt, because the two games fail on different timescales. In Flappy Bird the mistake and the crash are half a second apart, so credit lands roughly where it belongs and a fairly plain DQN gets there. In Snake the move that kills you happened twenty steps earlier, when you quietly boxed yourself into a corner.",
        },
      ],
      figures: [
        {
          src: "work/flappy.mp4",
          cap: "Flappy Bird under agent control.",
        },
        {
          src: "work/flappy-training.png",
          cap: "Training curves: mean episode reward climbing while exploration decays over ~60k steps.",
        },
        {
          src: "work/snake-training.mp4",
          cap: "Snake training with the score plot live beside the game.",
        },
        {
          src: "work/elden.mp4",
          cap: "The counter-example: Elden Ring rune farming on timed inputs. No perception at all",
        },
      ],
      links: [
        { label: "Code", href: "#" },
      ],
    },
  },

  {
    slug: "virtual-tour",
    title: "Virtual apartment tour",
    year: null,
    card: {
      desc: "A browser walkthrough of an apartment: fifteen panoramic viewpoints you move between, a full 3D model you can orbit, and a tool that measures distances inside the photographs themselves.",
      stack: "Three.js · Marzipano · Vite · Blender · Firebase",
      thumb: "work/apartment.jpg",
      thumbCap: "glimpse",
    },
    page: {
      lede: "Two ways to look at the same apartment: stand inside it, or pick it up and turn it over, plus a measuring tape that works inside a photograph.",
      hero: null,
      sections: [
        {
          h: "What it is",
          p: "A virtual tour of an apartment, deployed on Firebase Hosting. Fifteen panoramic viewpoints cover the entry, halls, kitchen, bathroom and rooms, linked by hotspots so you walk between them the way you would walk through the flat.",
        },
        {
          h: "Two viewers, one apartment",
          p: "The panoramic side runs on Marzipano, with each viewpoint stored as a cube map cut into tiles at three resolutions — a 256px fallback, then 512, then 1024. The viewer pulls only the tiles facing you at the detail you need, so a room resolves progressively instead of blocking on one enormous image. The second view is a Three.js scene loading the apartment as a GLTF model with orbit controls, plus a raycaster that picks out named meshes like doors. Same space, one from inside and one from above.",
        },
        {
          h: "Measuring inside a photograph",
          p: "A 360° photo has no depth, so measuring in one is not straightforward: the viewer knows the direction you clicked but not how far away the surface is. Clicking converts screen position into yaw and pitch through the viewer, then estimates depth from how far down the frame the point sits. That approximation holds for floor-level points and degrades on walls and ceilings, which is worth understanding.",
        },
        {
          h: "The 100 MB problem",
          p: "The panorama and the model load in opposite ways, and that shapes the whole first visit. Tiles stream, the viewer fetches only the faces you are looking at, at the resolution you need so the panorama is usable almost immediately. A GLB is atomic: one file, nothing to render until the last byte lands. At 100 MB that meant a blank screen for long enough that a visitor would reasonably assume the page was broken. Compressing the geometry is what made it viable; the model now arrives in a few seconds, which is inside the window where a loading state still reads as loading rather than failure. The 3D view is the only part that lets you move freely through the space instead of hopping between the fixed points the panoramas were shot from.",
        },
      ],
      figures: [
        {
          src: "work/apart2.jpg",
          cap: "Measurement tool",
        },
        {
          src: "work/apartment.jpg",
          cap: "top-view",
        },
        {
          src: "work/apart3.jpg",
          cap: "explore-view",
        },
      ],
      links: [
        {
          label: "Live tour",
          href: "https://aiexecute-virtual-experience.web.app/tour.html",
        },
        { label: "Code", href: "#" },
      ],
    },
  },

];

export const byslug = (slug) => projects.find((p) => p.slug === slug);

import { STATUS, type Project, type Projects } from "./types";

export const projects: Projects = {
  "web": {
    "peridot": {
      name: "peridot",
      status: STATUS.DOING,
      description: "pinterest meets obsidian, store ideas locally",
      link: "https://peridot.deltea.space",
      source: "https://github.com/deltea/peridot"
    },
    "downbeat": {
      name: "downbeat",
      status: STATUS.DOING,
      description: "a small tool for syncing gifs to the beat",
      link: "https://downbeat.deltea.space/",
      source: "https://github.com/deltea/downbeat"
    },
    "the movie game": {
      name: "the movie game",
      status: STATUS.DONE,
      description: "higher or lower game, but with movies",
      link: "https://movie-game.deltea.space/",
      source: "https://github.com/deltea/themoviegame",
    },
    "button maker": {
      name: "button maker",
      status: STATUS.DONE,
      description: "a small tool to make 88x31 buttons",
      link: "https://buttons.deltea.space/",
      source: "https://github.com/deltea/button-maker",
    },
    "youguess": {
      name: "youguess",
      status: STATUS.DONE,
      description: "higher or lower game, but with youtube videos",
      link: "https://youguess.deltea.space/",
      source: "https://github.com/deltea/youguess",
    },
    "color pong": {
      name: "color pong",
      status: STATUS.DONE,
      description: "a cool looking screensaver-ahh pong simulation",
      link: "https://color-pong.deltea.space/",
      source: "https://github.com/deltea/color-pong",
    }
  },
  "games": {
    "power cut": {
      name: "power cut",
      status: STATUS.DONE,
      description: "a short puzzle platformer made for a game jam",
      link: "https://deltea.itch.io/power-cut",
      source: "https://github.com/deltea/power-cut"
    },
    "catalyst": {
      name: "catalyst",
      status: STATUS.DONE,
      description: "a bullet hell boss rush game made for a month long game jam",
      link: "https://deltea.itch.io/catalyst",
      source: "https://github.com/deltea/brj-exchange"
    },
    "jetcat": {
      name: "jetcat",
      status: STATUS.DONE,
      description: "a fast-paced speedrun platformer with a cat that can fly",
      link: "https://deltea.itch.io/jetcat",
      source: "https://github.com/deltea/Gravity"
    },
    "g r a p p l e": {
      name: "g r a p p l e",
      status: STATUS.DONE,
      description: "grappling in the 90s",
      link: "https://deltea.itch.io/grapple",
    },
    "rpgeometry": {
      name: "rpgeometry",
      status: STATUS.DONE,
      description: "a horde shooter made for bullet hell game jam 2023",
      link: "https://deltea.itch.io/rpgeometry",
    },
    "long shot": {
      name: "long shot",
      status: STATUS.DONE,
      description: "an abstract shooter with a weird movement mechanic",
      link: "https://deltea.itch.io/long-shot",
    }
  },
  "hardware": {
    "yume": {
      name: "yume",
      status: STATUS.DOING,
      description: "a custom mp3 player with an oled display and rotary encoder",
      link: "https://github.com/deltea/yume_os",
    },
    "naicha68": {
      name: "naicha68",
      status: STATUS.DRAFT,
      description: "a 68% gasket-mounted mechanical keyboard with custom pcb"
    }
  }
}

export const featuredProjects: Project[] = [
  projects.web["peridot"],
  projects.web["downbeat"],
  projects.games["catalyst"],
  projects.hardware["yume"],
  projects.web["button maker"]
];

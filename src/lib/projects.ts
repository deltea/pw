import { STATUS, type Project, type Projects } from "./types";

export const projects: Projects = {
  "web": {
    "fruity!": {
      name: "fruity!",
      status: STATUS.DOING,
      description: "A hack club YSWS where you ship a music-related project, and get FL Studio!",
      link: "https://fruity.deltea.space",
      source: "https://github.com/deltea/fruity"
    },
    "peridot": {
      name: "peridot",
      status: STATUS.DONE,
      description: "Pinterest meets Obsidian, an experimental way to store ideas",
      link: "https://peridot.deltea.space",
      source: "https://github.com/deltea/peridot"
    },
    "downbeat": {
      name: "downbeat",
      status: STATUS.DONE,
      description: "A small tool for syncing animated gifs to a music track",
      link: "https://downbeat.deltea.space/",
      source: "https://github.com/deltea/downbeat"
    },
    "the movie game": {
      name: "the movie game",
      status: STATUS.DONE,
      description: "Higher or Lower game, but with movies",
      link: "https://movie-game.deltea.space/",
      source: "https://github.com/deltea/themoviegame",
    },
    "button maker": {
      name: "button maker",
      status: STATUS.DONE,
      description: "A small tool for making indie web 88x31 buttons",
      link: "https://buttons.deltea.space/",
      source: "https://github.com/deltea/button-maker",
    },
    "youguess": {
      name: "youguess",
      status: STATUS.DONE,
      description: "Higher or Lower game, but with youtube videos",
      link: "https://youguess.deltea.space/",
      source: "https://github.com/deltea/youguess",
    },
    "color pong": {
      name: "color pong",
      status: STATUS.DONE,
      description: "A cool looking screensaver-ahh pong simulation",
      link: "https://color-pong.deltea.space/",
      source: "https://github.com/deltea/color-pong",
    }
  },
  "games": {
    "power cut": {
      name: "power cut",
      status: STATUS.DONE,
      description: "A short puzzle platformer made for a game jam",
      link: "https://deltea.itch.io/power-cut",
      source: "https://github.com/deltea/power-cut"
    },
    "catalyst": {
      name: "catalyst",
      status: STATUS.DONE,
      description: "A bullet hell boss rush game made for a month long game jam",
      link: "https://deltea.itch.io/catalyst",
      source: "https://github.com/deltea/brj-exchange"
    },
    "jetcat": {
      name: "jetcat",
      status: STATUS.DONE,
      description: "A fast-paced speedrun platformer with a cat that can fly",
      link: "https://deltea.itch.io/jetcat",
      source: "https://github.com/deltea/Gravity"
    },
    "g r a p p l e": {
      name: "g r a p p l e",
      status: STATUS.DONE,
      description: "♪ Grappling in the 90s! ♪",
      link: "https://deltea.itch.io/grapple",
    },
    "rpgeometry": {
      name: "rpgeometry",
      status: STATUS.DONE,
      description: "A horde shooter made for Bullet Hell Jam 2023",
      link: "https://deltea.itch.io/rpgeometry",
    },
    "long shot": {
      name: "long shot",
      status: STATUS.DONE,
      description: "An abstract shooter with a weird movement mechanic",
      link: "https://deltea.itch.io/long-shot",
    }
  },
  "hardware": {
    "mochi": {
      name: "mochi player",
      status: STATUS.DOING,
      description: "My dream mp3 player with an oled display and case",
      link: "https://github.com/deltea/yume_os",
    },
    "naicha68": {
      name: "naicha68",
      status: STATUS.DOING,
      description: "A 68% gasket-mounted mechanical keyboard with a custom pcb"
    }
  }
}

export const featuredProjects: Project[] = [
  projects.web["downbeat"],
  projects.hardware["mochi"],
  projects.web["fruity!"],
  projects.games["catalyst"],
  projects.web["button maker"],
];

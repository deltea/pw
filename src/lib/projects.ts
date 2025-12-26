export enum STATUS { DONE, DOING, DRAFT };

export const projects = {
  "web": {
    "peridot": {
      status: STATUS.DOING,
      description: "pinterest meets obsidian, store ideas locally",
      link: "https://peridot.deltea.space",
      source: "https://github.com/deltea/peridot"
    },
    "downbeat": {
      status: STATUS.DOING,
      description: "a small tool for syncing gifs to the beat",
      link: "https://downbeat.deltea.space/",
      source: "https://github.com/deltea/downbeat"
    },
    "the movie game": {
      status: STATUS.DONE,
      description: "higher or lower game, but with movies",
      link: "https://movie-game.deltea.space/",
      source: "https://github.com/deltea/themoviegame",
    },
    "button maker": {
      status: STATUS.DONE,
      description: "a small tool to make 88x31 buttons",
      link: "https://buttons.deltea.space/",
      source: "https://github.com/deltea/button-maker",
    },
    "youguess": {
      status: STATUS.DONE,
      description: "higher or lower game, but with youtube videos",
      link: "https://youguess.deltea.space/",
      source: "https://github.com/deltea/youguess",
    },
    "color pong": {
      status: STATUS.DONE,
      description: "a cool looking screensaver-ahh pong simulation",
      link: "https://color-pong.deltea.space/",
      source: "https://github.com/deltea/color-pong",
    }
  },
  "games": {
    "power cut": {
      status: STATUS.DONE,
      description: "a short puzzle platformer made for a game jam",
      link: "https://deltea.itch.io/power-cut",
      source: "https://github.com/deltea/power-cut"
    },
    "catalyst": {
      status: STATUS.DONE,
      description: "a bullet hell boss rush game made for a month long game jam",
      link: "https://deltea.itch.io/catalyst",
      source: "https://github.com/deltea/brj-exchange"
    },
    "jetcat": {
      status: STATUS.DONE,
      description: "a fast-paced speedrun platformer with a cat that can fly",
      link: "https://deltea.itch.io/jetcat",
      source: "https://github.com/deltea/Gravity"
    },
    "g r a p p l e": {
      status: STATUS.DONE,
      description: "grappling in the 90s",
      link: "https://deltea.itch.io/grapple",
    },
    "rpgeometry": {
      status: STATUS.DONE,
      description: "a horde shooter made for bullet hell game jam 2023",
      link: "https://deltea.itch.io/rpgeometry",
    },
    "long shot": {
      status: STATUS.DONE,
      description: "an abstract shooter with a weird movement mechanic",
      link: "https://deltea.itch.io/long-shot",
    }
  },
  "hardware": {
    "yume": {
      status: STATUS.DOING,
      description: "a custom mp3 player with an oled display and rotary encoder",
      link: "https://github.com/deltea/yume_os",
    },
    "naicha68": {
      status: STATUS.DRAFT,
      description: "a 68% gasket-mounted mechanical keyboard with custom pcb"
    }
  }
}

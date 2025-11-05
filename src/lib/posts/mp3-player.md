---
published: true
title: mp3 players
date: "11-1-2025"
excerpt: "ok so, mp3 players. they're pretty cool. i made a prototype of a simple mp3 player a while ago on a breadboard, and now i want to finalize it!"
---

<script>
  import Caption from "$components/mdsvex/Caption.svelte"
</script>

ok so, mp3 players. they're pretty cool. i made a prototype of a simple mp3 player a while ago on a breadboard, and now i want to finalize it!
my dream mp3 player consists of these things:

- cool looking ui with slick animations
- (almost) instant song start times
- more or less simple music upload process
- playlist and queue support
- specific queue controls, like play next and add to queue
- mix playlists???

right now i have 2 choices, to either design a completely custom pcb with the specific components i need, or to just make a sort of "motherboard" that i can just solder various "daughterboards" onto.
doing it the motherboard way will be significantly easier to design, since i basically just place the holes and pads in the places i want the components. the issue with that, however, is that the board will also be very thick, since i need to stack extra boards onto the main board. going with a single pcb will make the final product look a lot cleaner, and also make it have a smaller form factor.

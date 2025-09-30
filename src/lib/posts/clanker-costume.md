---
published: true
title: clanker costume?
date: "9-29-2025"
excerpt: "so 2 days ago i went to the bay area maker faire, which is basically a giant convention with people making cool stuff, like electronics, robots, art, and costumes. i saw a bunch of interesting things there, like some indie games and stuff, but one kinda stood out a lot for some reason (idk why)."
---

<script>
  import VideoEmbed from "$components/mdsvex/VideoEmbed.svelte"
  import Caption from "$components/mdsvex/Caption.svelte"
  import YoutubeEmbed from "$components/mdsvex/YoutubeEmbed.svelte"
</script>

so 2 days ago i went to the bay area maker faire, which is basically a giant convention with people making cool stuff, like electronics, robots, art, and costumes. i saw a bunch of interesting things there, like some indie games and stuff, but one kinda stood out a lot for some reason (idk why).

i saw a robot head thingymajig where it's literally just a box with a screen on the front side of it, and you can wear it and pretend you're a clanka. i was curious, so i looked it up. here's a photo of the thing:

![stack-san](https://previewengine-accl.zohoexternal.com/thumbnail/BACKSTAGE/155002000001553376?cli-msg=eyJtb2R1bGUiOiJFeHBvUmVzb3VyY2UiLCJpZCI6IjE1NTAwMjAwMDAwMTU1MzM3NiIsImxhc3RNb2RpZmllZFRpbWUiOiIxNzUzNDgzOTE2OTgxIiwicG9ydGFsSWQiOiI4Nzc4ODI5NjUifQ==)
<Caption>stack-san</Caption>

another interesting booth that caught my eye was the *CyberDragon*. it's basically a bunch of adafruit led matrix panels stuck to a helmet, and loaded with custom animations to make it look like a dragon. the single guy who made it takes it to raves, and is starting to sell them for like 3000 dollars. here's a photo

![CyberDragon](https://framerusercontent.com/images/ojMptVZY0N4z7kbvnrGOsrgv8.jpg?width=720&height=953)
<Caption>CyberDragon (bestseller in the furry community i'm sure!)</Caption>

so how do these 2 projects tie into possibly my next project??? here's how: *halloween costume*

i had a random idea to maybe dress up as a clanker for halloween, and just put a box on my head with an led matrix on the front, and make some cool procedural animations to go along with it! i took some inspiration for the animations looking at **tokyo machine's** glassess and also a little robot dude made by dasai called **mochi 3**

![DASAI MOCHI 3](https://dasai.com.au/cdn/shop/files/DSC01344.jpg?v=1726664042&width=800)
<Caption>DASAI MOCHI 3 (apparently it's for driving???)</Caption>

![Tokyo Machine](https://i.pinimg.com/736x/72/e7/9c/72e79c75e713df2180631e8132b5e4c8.jpg)
<Caption>Tokyo Machine's glasses look cool!</Caption>

so yeah! that's pretty much how i want the style to be like, but i haven't decided on the specifics yet. i realized pretty early that i will have to figure out how to actually see through the headpiece, since the led matrix is opaque. i looked for transparent led matrices, but was out of luck since no one really sells them (and they're expensive). i eventually thought of using some kind of periscope system to use mirrors to bounce light into my eyes so i could see. it honestly seems kinda janky, so i don't know how well it'll work.

## robo sounds

ok so while i was thinking about all this stuff, scope creep started to kick in, and i was like: *"hey why can't i add a voice changer to it, so i actually sound like a frickin clanker? why not???"* and so i started looking into ways i could add a stupid microphone to the inside, and attach a speaker to the outside, and also still somehow have enough portable power to power this entire thng.

## the tech

after thinking about this thing for some time, i have come up with a list of supplies:

- cardboard/3d printed frame (maybe fixed on bike helmet?)
- raspberry pi 3 b+
- 2 portable power banks (both 5v)
- my webcam (used as microphone lol)
- some kinda of speaker
- a bunch of mirrors
- large square head sized led matrix (roughly 6x6 in)

ok that's a pretty big list actually wow.

![Waveshare 64x64 LED Matrix Panel](https://www.waveshare.com/media/catalog/product/r/g/rgb-matrix-p3-64x64-5.jpg)
<Caption>Waveshare 64x64 LED Matrix Panel</Caption>

i think the most crucial part of this project is probably the ability to see out of the box, since you can't really just be walking around blind with this thing. i am also not completely sure if the audio thing would work, since there might be some delay or something idk.

welp, let's get to work i guess.

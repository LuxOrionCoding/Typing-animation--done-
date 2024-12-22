# Typing Animation

A another javascript project from me. A project about a typing animation for website aesthetic purpose.

## How to try

1. First download `typing_animation.js` to your computer and put it to the desired folder.
2. And put `import { setAnimation, playAnimation } from "path/to/typing_animation.js";` to your main javascript file to initialize.
3. Then set attribute of the desired element in html with `data-animated = "false"` or you can set the value to `"true"` to play animation by default.
4. After that use `setAnimation(your_element, wordList, deletingPulse, typingPulse, pauseBetweenText)` and fill with your requirements / needs (the pulses is in milliseconds).
5. Finally use `playAnimation(your_element)` and fill it with element you've set your animation on.
6. And the animation is ready.

## Extra information

You can have more than 1 elements to be animated.

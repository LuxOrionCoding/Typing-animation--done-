# Typing Animation

A another javascript project from LuxOrionCoding. A project about a typing animation for website aesthetic purpose.

## How to use

1. Firstly put `import { setAnimation, playAnimation } from "";` to your main javascript file to initialize.
2. And then set attribute of the desired element in html with `data-animated = "false"` or you can set the value to `"true"` to play animation by default.
3. After that use `setAnimation(your_element, wordList, deletingPulse, typingPulse, pauseBetweenText)` and fill with your requirements / needs (the pulses is in milliseconds).
4. Finally use `playAnimation(your_element)` and fill it with element you've set your animation on.
5. And the animation is ready.

## Extra information

You can have more than 1 elements to be animated.

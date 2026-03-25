# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page.

### Links

- Solution URL:  (https://github.com/shadymo2291/JavaScript-Projects-Typing-Speed-Test-Solution))
- Live Site URL: (https://shadymo2291.github.io/JavaScript-Projects-Typing-Speed-Test-Solution/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Responsive App with Different Screen Sizes.
- Flexbox
- Animation
- Pseudo Elements and Classes
- JavaScript
- AJAX and JSON
- Local Storage 

### What I learned

I learned more skills with responsive design using css properties and new events (for me) with JavaScript
With JavaScript, solve bugs and manipulate with DOM and have a clean code.
To see how you can add code snippets, see below:

```html
        <section class="text_area">
            <div class="start_container">
                <button class="start">Start Typing Test</button>
                <p>Or click the text and start typing</p>
            </div>

            <div class="text active"></div>

            <input type="text" class="typing_input">
            <div class="restart_container">
                <button class="restart">restart test <img src="assets/images/icon-restart.svg" alt="restart"></button>
            </div>
        </section>
```
```css

.restart_container {
    padding-top: 20px;
    margin-top: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform-origin: top;
    transform: rotateX(90deg);
    animation: restart 0.5s linear forwards;
    display: none;
}

@keyframes restart {
    to {
        opacity: 1;
        transform: rotateX(0deg);
    }
}

```
```js

function get_the_score(wpm, accuracy, correct_ch, incorrect_ch) {
  result = {
    time: new Date(),
    wpm: wpm,
    accuracy: accuracy,
    correctCharacter: correct_ch,
    inCorrectCharacter: incorrect_ch,
  };

  all_results.push(result);

  window.sessionStorage.setItem("all_results", JSON.stringify(all_results));
```



### Continued development

I am focusing on applying more to master JavaScript and to write clean code and learn more about events API's 



## Author

- LinkedIn - [@shady-mohamed-a222a53a4](https://www.linkedin.com/in/shady-mohamed-a222a53a4/)
- Frontend Mentor - [@shadymo2291](https://www.frontendmentor.io/profile/shadymo2291)
- gIthub - [@shadymo2291](https://github.com/shadymo2291)
- upwork - [@~01d544da35261cf01c](https://www.upwork.com/freelancers/~01d544da35261cf01c)


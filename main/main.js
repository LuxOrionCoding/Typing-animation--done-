import { setAnimation, playAnimation } from "../typing_animation.js";

const cycleText = document.querySelector(".cycle-text");
const triggerBtn = document.querySelector('#start-cycle-btn');
const restartBtn = document.querySelector('#restart-cycle-btn');
var wordList = ["Web Developer", "UI/UX designer", "Data Scientist", "Penetration Tester", "Cyber Security"];
setAnimation(cycleText, wordList);

triggerBtn.addEventListener('click', e => {
	if (cycleText.getAttribute("data-animate") == "false") {
		triggerBtn.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nO3SoRHAMBAEMfffdEK2gIBzkMQf/NyeAwA/ej66dT/jkVhkTVqR1pq0Iq01aUVaa9KKtNakFWmtSSvSWpNWpLUmrUhrTVqR1pq0Ii0AOPe8ZXiV98fYlvIAAAAASUVORK5CYII=");
        cycleText.setAttribute("data-animate", "true");
		playAnimation(cycleText);
    } else {
		triggerBtn.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFklEQVR4nO3ZsW3CQBjF8Q8hoIEuLU0GyAJswBCskAIGyAop06ZMmwW8AAzgmtYdjWXFf4TgpEgpUODu7HfcbwI/yfa9+z6zLMuy34ANMDZ1nJXA0hII4nwDz6aIv2rgHZiZeBBnD6yAgSngugJ4sQSCnPwAn8CT9RX/UwGvwNDEgzg7YGF9wu1a4AuYm3gQ5wC8ARP1IPSiHeBfN+2AMOK3A8KK1w6IowjeDoinAT6CtQPiq4K0A7qz89oO6FbrrR3kIPfbqr9alfrH3qTw+y3UD0T5ilJfSuM0eAAnQAj5Gl+qX6wO6lfdNoXhw1Z9HFSpD+iaoKeyD48wxN6rrxXq6KeyD6mt3soUlqFrYNT1c2RZ9uCOorLyFKJbgmwAAAAASUVORK5CYII=");
        cycleText.setAttribute("data-animate", "false");
    }
})

restartBtn.addEventListener('click', e => {
	// for animation
	e.target.style.rotate = "360deg";
	e.target.style.scale = "1";
	setTimeout(()=>{
		e.target.style.transition = "0ms";
		e.target.style.rotate = "";
		setTimeout(()=>{
			e.target.style.scale = "";
			e.target.style.transition = "";
		}, 50)
	}, 500)

	// for functions
	location.reload();
})
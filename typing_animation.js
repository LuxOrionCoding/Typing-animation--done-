const styleElement = document.createElement('style');
styleElement.innerHTML = `
@keyframes blink {
	50% {
		opacity: 0;
	}
}
`;
document.head.appendChild(styleElement);

// +==================+
// |    FOR BLINKER   |
// +==================+
const parentElements = document.querySelectorAll("*:has(> [data-animate])");
parentElements.forEach(parent => {
	const computedStyle = window.getComputedStyle(parent);
	const position = computedStyle.getPropertyValue('position');
	if (position == "static") {
		parent.style.position = "relative";
	}
})
const animatedElements = document.querySelectorAll("[data-animate]");
animatedElements.forEach(el => {
	const computedStyle = window.getComputedStyle(el);
	const color = computedStyle.getPropertyValue('color');
	const blinker = document.createElement('div');
	blinker.style.position = 'absolute';
	blinker.style.right = '-0.5rem';
	blinker.style.top = '0';
	blinker.style.height = '100%';
	blinker.style.width = '2px';
	blinker.style.backgroundColor = color;
	blinker.style.opacity = '1';
	blinker.style.animation = 'linear blink .9s infinite';
	blinker.classList.add('blinker');

	el.insertAdjacentElement("afterend", blinker);
})

const individualVariables = {
	element: "",
	
	wordList: [],
	deletingPulse: 0,
	typingPulse: 0,
	pauseBetweenText: 0,

	textReveal: 0,
	deleteSignal: true,
	curWordIndex: 0,
	currentText: "",
};
var data_list = [];

// +==================+
// | TO SET ANIMATION |
// +==================+
export function setAnimation(text_element, wordList, deletingPulse=60, typingPulse=220, pauseBetweenText=3000) {
	// making individual variables
	const variables = Object.create(individualVariables);
	variables.element = text_element;
	variables.wordList = wordList;
	variables.currentText = wordList[0];
	variables.deletingPulse = deletingPulse;
	variables.typingPulse = typingPulse;
	variables.pauseBetweenText = pauseBetweenText;

	data_list.push(variables);
	text_element.innerHTML = wordList[0];
}

// +=====================+
// |  TO PLAY ANIMATION  |
// +=====================+
export function playAnimation(text_element) {

	text_element.setAttribute("data-animate", "true");
	var element_data;
	for (let i=0; i<data_list.length; i++) {
		if (data_list[i].element == text_element) {
			element_data = data_list[i];
			break;
		}
	}

	var deleteText, typeText;
	var pauseBetween_a, pauseBetween_b;
	const blinker = text_element.nextSibling;
	
	function startLoop() {
		if (text_element.getAttribute("data-animate") == "false") {
			clearPlayState();
			return;
		}

		if (element_data.deleteSignal) {
			deleteText = setInterval(deleteFunc, element_data.deletingPulse);
		} else {
			typeText = setInterval(typeFunc, element_data.typingPulse);
		}
		
		if (element_data.curWordIndex == element_data.wordList.length - 1) element_data.curWordIndex = -1;
	}
	
	function deleteFunc() {
		if (text_element.getAttribute("data-animate") == "false") {
			clearPlayState();
			return;
		}
		blinker.style.animation = 'none';
		
		element_data.currentText = element_data.currentText.slice(0, element_data.currentText.length - 1);
		text_element.innerHTML = element_data.currentText;
		
		if (text_element.innerHTML == '') {
			clearInterval(deleteText);
			element_data.deleteSignal = false;
			blinker.style.animation = 'linear blink .9s infinite';
			
			pauseBetween_a = setTimeout(()=>{
				typeText = setInterval(typeFunc, element_data.typingPulse);
			}, 350);
		}
	}
	
	function typeFunc() {
		if (text_element.getAttribute("data-animate") == "false") {
			clearPlayState();
			element_data.deleteSignal = false;
			return;
		}
		blinker.style.animation = 'none';
		
		element_data.currentText = element_data.wordList[element_data.curWordIndex+1].slice(0, element_data.textReveal);
		text_element.innerHTML = element_data.currentText;
		element_data.textReveal++;
		
		if (text_element.innerHTML == element_data.wordList[element_data.curWordIndex+1]) {
			clearInterval(typeText);
			blinker.style.animation = 'linear blink .9s infinite';
			
			element_data.deleteSignal = true;
			element_data.textReveal = 1;
			element_data.curWordIndex++;
			
			if (text_element.hasAttribute("data-animate")) {
				pauseBetween_b = setTimeout(() => startLoop(), element_data.pauseBetweenText);
			}
		}
	}

	function clearPlayState() {
		clearInterval(deleteText);
		clearInterval(typeText);
		clearTimeout(pauseBetween_a);
		clearTimeout(pauseBetween_b);
	}

	startLoop();
}
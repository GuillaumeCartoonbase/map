// Change marble's color [0, 1 , 2, 3]
let playerID = 0; // Var to change player in JS
const lessons = 6;

const inputLessonDone = []; // Lessons status
const lessonProgress = [];
const isLessonHover = [];
const lessonTrigger = [];

// Create Rive
const riveInstance = new rive.Rive({
	src: "src/floor-1.riv", //get rive file
	canvas: document.getElementById("firstFloor"), //get correct canvas
	autoplay: true,
	stateMachines: "First Floor", // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: () => {
		// Prevent a blurry canvas by using the device pixel ratio
		riveInstance.resizeDrawingSurfaceToCanvas();

		// Get inputs
		const inputs = riveInstance.stateMachineInputs("First Floor");

		// Change marble's color
		playerSelector = inputs.find((i) => i.name === "playerProfile");
		playerSelector.value = playerID; //initial value

		for (let i = 1; i <= lessons; i++) {
			// Get lesson done status
			// inputLessonDone[0].value = true; [true, false]
			inputLessonDone.push(
				inputs.find((input) => input.name === `isLesson${i}Done`)
			);

			// Get lesson progress
			// lessonProgress[0].value = 20; [0-100]
			lessonProgress.push(
				inputs.find((input) => input.name === `Lesson progress ${i}`)
			);

			// Hover
			isLessonHover.push(
				inputs.find((input) => input.name === `Lesson ${i} Hover`)
			);

			// Triggers
			lessonTrigger.push(
				inputs.find((input) => input.name === `Trigger Lesson ${i}`)
			);
		}

		triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

		inputLessonCounter = inputs.find((i) => i.name === "lessonCounter");
		inputMarbleHover = inputs.find((i) => i.name === "marble hovering");
	},
});

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// fire movement on click
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	let cardButton = eventData.properties.cardButton;
	if (cardButton === 1) return lessonTrigger[0].fire();
	if (cardButton === 2) return lessonTrigger[1].fire();
	if (cardButton === 3) return lessonTrigger[2].fire();
	if (cardButton === 4) return lessonTrigger[3].fire();
	if (cardButton === 5) return lessonTrigger[4].fire();
	if (cardButton === 6) return lessonTrigger[5].fire();
	if (cardButton === 200) return triggerNextLevel.fire();
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

// Get Events
const demoEvent = document.getElementById("demoEvent");
const onRiveEventReceived = (riveEvent) => {
	const eventData = riveEvent.data;
	let text =
		Object.keys(eventData.properties)[0] === "lesson"
			? `launch activity #${eventData.properties.lesson} `
			: `${Object.keys(eventData.properties)[0]} ${
					Object.values(eventData.properties)[0]
			  }`;
	demoEvent.innerHTML = text;
};
riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);

// Event intel watcher
const eventLog = document.getElementById("eventsInfo");
const eventConsoleLogger = (riveEvent) => {
	const eventData = riveEvent.data;
	console.log("event name:", eventData.name);
	console.log("event properties", eventData.properties);
	eventLog.innerHTML = `event name: ${eventData.name}
    <br>
    event object keys: ${Object.keys(eventData.properties)}
    <br>
    event object values: ${Object.values(eventData.properties)}
    `;
};

riveInstance.on(rive.EventType.RiveEvent, eventConsoleLogger);

// Player selector from HTML
const selectPlayer = (n) => {
	playerSelector.value = n;
};

// Get Checkboxes
const lessonCheckboxes = [];

for (let i = 1; i <= 6; i++) {
	const checkbox = document.getElementById(`Lesson0${i}`);
	lessonCheckboxes.push(checkbox);
}

// Switchers
lessonCheckboxes[0].addEventListener("change", (e) => {
	inputLessonDone[0].value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[1].addEventListener("change", (e) => {
	inputLessonDone[1].value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[2].addEventListener("change", (e) => {
	inputLessonDone[2].value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[3].addEventListener("change", (e) => {
	inputLessonDone[3].value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[4].addEventListener("change", (e) => {
	inputLessonDone[4].value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[5].addEventListener("change", (e) => {
	inputLessonDone[5].value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});

// Cards Lessons Hover Status

const cardHover = (index) => {
	isLessonHover[index - 1].value = true;
};
const cardNoHover = (index) => {
	isLessonHover[index - 1].value = false;
};

// Card Lessons Click

const cardClick = (index) => {
	lessonTrigger[index - 1].fire(); // fire trigger
};

const lessonCounter = () => {
	let total = 0;

	for (let i = 0; i < lessons; i++) {
		total += inputLessonDone[i].value == true ? 1 : 0;
	}

	return total;
};

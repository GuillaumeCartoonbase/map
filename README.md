# Floor 1

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_1/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## Doc

### Lesson status

To mark a lesson 'done'.
(boolean, in array)

Rive Input names:

- `isLesson1Done`
- `isLesson2Done`
- `isLesson3Done`
- `isLesson4Done`
- `isLesson5Done`
- `isLesson6Done`

#### Setup in JS

The value is in an array named `inputLessonDone`.

```js
for (let i = 1; i <= lessons; i++) {
	// Get lesson done status
	inputLessonDone.push(
		inputs.find((input) => input.name === `isLesson${i}Done`)
	);
}

inputLessonDone[0].value = true; // lesson 1 marked done
inputLessonDone[5].value = false; // lesson 6 marked not done
```

### Lesson Completion

To show the completition percentage on the hover card.
(integrer, 0-100, in array)

Rive Input names:

- `Lesson progress 1`
- `Lesson progress 2`
- `Lesson progress 3`
- `Lesson progress 4`
- `Lesson progress 5`
- `Lesson progress 6`

#### Setup in JS

```js
let progressLessons = [0, 0, 0, 0, 0, 0]; // 0-100 value

lesson1Completion = inputs.find((i) => i.name === "Lesson progress 1"); // get rive input
lesson2Completion = inputs.find((i) => i.name === "Lesson progress 2"); // get rive input
lesson3Completion = inputs.find((i) => i.name === "Lesson progress 3"); // get rive input
lesson4Completion = inputs.find((i) => i.name === "Lesson progress 4"); // get rive input
lesson5Completion = inputs.find((i) => i.name === "Lesson progress 5"); // get rive input
lesson6Completion = inputs.find((i) => i.name === "Lesson progress 6"); // get rive input
lesson6Completion.value = progressLessons[0];
lesson1Completion.value = progressLessons[1];
lesson2Completion.value = progressLessons[2];
lesson3Completion.value = progressLessons[3];
lesson4Completion.value = progressLessons[4];
lesson5Completion.value = progressLessons[5];
```

### Triggers

To launch a lesson or next level.

Rive Input names:

- `Trigger Lesson 1`
- `Trigger Lesson 2`
- `Trigger Lesson 3`
- `Trigger Lesson 4`
- `Trigger Lesson 5`
- `Trigger Lesson 6`
- `Trigger Next Level`

#### Setup in JS

To fire the marble movement :

```js
trigger1.fire(); // movement to lesson 1
```

Trigger movement from web

```html
<div onclick="card1click()"></div>
```

```js
const card1click = () => {
	trigger1.fire(); // fire trigger
};
```

### Hover

To set the status hovering on the lessons
(boolean)

Rive Input names:

- `Lesson 1 Hover`
- `Lesson 2 Hover`
- `Lesson 3 Hover`
- `Lesson 4 Hover`
- `Lesson 5 Hover`
- `Lesson 6 Hover`

```html
<div onmouseover="card1hover()" onmouseleave="card1nohover()"></div>
```

```js
isLesson1Hover = inputs.find((i) => i.name === "Lesson 1 Hover");

const card1hover = () => {
	isLesson1Hover.value = true;
};
const card1nohover = () => {
	isLesson1Hover.value = false;
};
```

### Player Status

To change the marble's color depending on the user profile.
(integrer, 0-3)

- `0` : Standard marble
- `1` : Blue marble
- `2` : Red marble
- `3` : Green marble

Variable to edit in js: `playerID`

Rive Input name: `playerProfile`

#### Setup in JS

```js
playerSelector = inputs.find((i) => i.name === "playerProfile"); // get rive input
playerSelector.value = playerID;
```

### Events

Events return an object
(booleans, integrers and strings can be used as value)

`console.log()` are in place to show the result and timing.

```js
console.log(eventData.name);
console.log(eventData.properties);
```

```js
LessonButton = { lesson: 1 };
NextLevelButton = { level: 2 };
```

#### Setup in JS

Current example:

```js
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
```

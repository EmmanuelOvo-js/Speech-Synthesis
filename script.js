const select = document.getElementById('voice-select');

const synth = window.speechSynthesis;

let voices;

function addVoicesToSelect() {
	// Get all voices from SpeechSynthesis
	voices = synth.getVoices();

	//Loop through voices, create option tag and add the voices
	for (let i = 0; i < voices.length; i++) {
		const option = document.createElement('option');
		option.textContent = `${voices[i].name} - ${voices[i].lang}`;

		//Add the text '- Default' to the first text content in the options list
		if (voices[i].default) {
			option.textContent += ' - DEFAULT';
		}

		//Add html attribute to the option tag
		option.setAttribute('data-name', voices[i].name);
		option.setAttribute('data-lang', voices[i].lang);

		select.appendChild(option);
	}
}

function onSubmit(e) {
	e.preventDefault();

	const textInput = document.getElementById('text-input');
	const utterThis = new SpeechSynthesisUtterance(textInput.value);
	const selectedOption = select.selectedOptions[0].getAttribute('data-name');

	for (let i = 0; i < voices.length; i++) {
		if (voices[i].name === selectedOption) {
			utterThis.voice = voices[i];
		}
	}

	synth.speak(utterThis);
}

addVoicesToSelect();

if (speechSynthesis.onvoiceschanged !== undefined) {
	speechSynthesis.onvoiceschanged = addVoicesToSelect;
}

document.getElementById('form').addEventListener('submit', onSubmit);

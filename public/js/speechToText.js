// speechToText.js

// Primary loader Function to Start the Process
window.addEventListener("load", () => {
  audioCheck();
});

// Double Click to Restart the Process
window.addEventListener("dblclick", () => {
  playDefaultAudio();
});

const audioCheck = () => {
  // Check if there is any Audio to be played or user wants to exit
  let pageAudio = document.querySelector("#python-audio");
  if (pageAudio.getAttribute("src") === "stop") {
    // Tell user they have stopped and how to start again
    const stopAudio = document.querySelector("#stop-audio");
    stopAudio.play();
    stopAudio.addEventListener("ended", () => {
      if (pageAudio.getAttribute("src") !== "") {
        pageAudio.setAttribute("src", "");
      }
    });
  } else {
    // If an audio src exists, play it first
    if (pageAudio.getAttribute("src") !== "") {
      pageAudio.play();
    }
  }
};

// Default Audio function
const playDefaultAudio = () => {
  // If Src exists in Dynamic Audio it is removed
  let pageAudio = document.querySelector("#python-audio");
  if (pageAudio.getAttribute("src") !== "") {
    pageAudio.setAttribute("src", "");
  }
  // Get audio by id
  const initial = document.querySelector("#initial-audio");
  initial.play();
  // Start Recording after the audio stops
  initial.addEventListener("ended", runSpeechRecognition);
};

// Speech Recognition function
function runSpeechRecognition() {
  // Get output div reference
  var output = document.getElementById("output");

  // New speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    // Transcript is the string and confidence is surety of machine
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    // Append text to the form and submit
    let autoFormSubmit = document.querySelector("#express");
    // Adding user input and machine confidence in inputs
    document.querySelector("#user-text").value = transcript;
    document.querySelector("#user-confidence").value = confidence;
    document.querySelector("#current-url").value = window.location.href;
    console.log(
      `This is the string : ${transcript}, the confidence ${confidence}`
    );
    // Submitting the form
    autoFormSubmit.submit();
  };

  // Start recognition
  recognition.start();
}

function startRecognition(field) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById(field).value = transcript;

    // Special handling for gender to match the select options
    if (field === 'gender') {
      const genderOptions = ['Male', 'Female', 'Other'];
      const matchedOption = genderOptions.find(option => option.toLowerCase() === transcript.toLowerCase());
      if (matchedOption) {
        document.getElementById(field).value = matchedOption;
      }
    }
  };

  recognition.onerror = function(event) {
    console.error('Speech recognition error', event.error);
  };
}

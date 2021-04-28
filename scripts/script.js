"use strict";
// let note = [];
// class Note {
//   constructor(noteBody) {
//     this.noteBody = noteBody;
//     this.initCreateNote();

//     this.readNoteFromLocalStorage();
//     this.renderNote();
//   }

//   saveNoteInLocalStorage() {
//     localStorage.setItem("note", JSON.stringify(note));
//   }
//   readNoteFromLocalStorage() {
//     JSON.parse(localStorage.getItem("note"));
//   }
//   createNote() {
//     const noteBodyValue = document.getElementById("note-body").value;
//     const newNote = new Note(noteBodyValue);
//     note.push(newNote);
//     this.saveNoteInLocalStorage();
//   }
//   initCreateNote() {
//     document.getElementById("create-btn").addEventListener("click", () => {
//       console.log("dupa");
//       this.createNote();
//     });
//   }

//   renderNote() {
//     const noteBox = document.createElement("div");
//     noteBox.classList.add("note-box");
//     const content = `
//     <div class="note-top-box"> </div>
//     <div class="note-text-box">
//       <textarea ></textarea>
//     </div>
//       <div class="note-settings-box"> </div>
//     `;
//     noteBox.innerHTML = content;
//     document.querySelector(".note-section").appendChild(noteBox);
//   }
// }

// new Note();
let currentInputIndex = 1;
const pinInputs = document.querySelectorAll(".passcode-input");

const savePinInLocalStorage = () => {
  localStorage.setItem("pin", JSON.stringify("1111"));
};

const enterPin = (btnNumber) => {
  pinInputs.forEach((input) => {
    if (input.id == `passcode-input-${currentInputIndex}`) {
      input.value = btnNumber;
      console.log(input.value);
    }
  });
  currentInputIndex++;
};
const initEnterPin = () => {
  const numberBtns = document.querySelectorAll(".number-btn");
  numberBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.dir(e.currentTarget.innerHTML);

      enterPin(e.currentTarget.innerHTML);
    });
  });
};

const checkPin = () => {
  const firstInput = document.getElementById("passcode-input-1").value;
  const secondInput = document.getElementById("passcode-input-2").value;
  const thirdInput = document.getElementById("passcode-input-3").value;
  const fourthInput = document.getElementById("passcode-input-4").value;

  const savedPin = JSON.parse(localStorage.getItem("pin"));
  const enteredPin = `${firstInput}${secondInput}${thirdInput}${fourthInput}`;
  if (savedPin === enteredPin) {
    document.querySelector(".pin-pad-section").style.display = "none";
  }
};
const initCheckPin = () => {
  document.querySelector(".ok-btn").addEventListener("click", () => {
    checkPin();
  });
};

const clearPin = () => {
  pinInputs.forEach((input) => {
    input.value = "";
    currentInputIndex = 1;
  });
};
const initClearPin = () => {
  document.querySelector(".clear-btn").addEventListener("click", () => {
    clearPin();
  });
};
savePinInLocalStorage();
initEnterPin();
initCheckPin();
initClearPin();

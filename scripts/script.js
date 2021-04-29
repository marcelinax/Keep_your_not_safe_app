"use strict";

let currentInputIndex = 1;
const pinInputs = document.querySelectorAll(".passcode-input");
const createNoteBox = document.querySelector(".create-note-box");

const savePinInLocalStorage = (passcode) => {
  localStorage.setItem("pin", JSON.stringify(passcode));
};

const readPinFromLocalStorage = () => {
  passcodeValue = JSON.parse(localStorage.getItem("pin"));
  return passcode;
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
    document
      .querySelector(".pin-pad-section")
      .classList.toggle("pin-pad-section--disactive");
    document
      .querySelector(".note-section")
      .classList.toggle("note-section--active");
  } else {
    document.getElementById("pin-pad-title").innerHTML =
      "Wrong passcode! Try again!";
    clearPin();
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

const saveNoteInLocalStorage = (note) => {
  localStorage.setItem("note", JSON.stringify(note));
};

const createNote = () => {
  const noteBody = document.getElementById("note-body").value;
  const note = {
    content: noteBody,
  };
  saveNoteInLocalStorage(note);

  console.log(note);
};

const initCreateNote = () => {
  document.getElementById("create-btn").addEventListener("click", () => {
    createNote();
    location.reload();
  });
};

const renderNote = () => {
  const note = JSON.parse(localStorage.getItem("note"));
  if (note) {
    const noteBox = document.createElement("div");
    noteBox.classList.add("note-box");
    let content = `
    <div class="top-menu">
      <button class="settings-btn"></button>
      <h6>Note settings</h6>
    </div>
    <div class="body-note">
      <textarea id="body-note">${note.content}</textarea>
    </div>
    <div class="bottom-menu">
      <button class="bottom-menu-btn delete-btn">
        <img src='../assets/bxs-trash-alt.svg'>          
      </button>
      <button class="bottom-menu-btn font-btn">
        <img src='../assets/bx-font-size.svg'>    
      </button>
      <button class="bottom-menu-btn change-mode-btn">
        <img src='../assets/bxs-moon.svg'>
      </button>
    </div>
  `;
    noteBox.innerHTML = content;
    document.querySelector(".note-section").appendChild(noteBox);
  } else return;
};
const hideCreateNoteBox = () => {
  if (JSON.parse(localStorage.getItem("note")))
    createNoteBox.style.display = "none";
  else createNoteBox.style.display = "flex";
};
const showNoteSettings = () => {
  document.querySelector(".settings-btn").addEventListener("click", () => {
    document
      .querySelector(".bottom-menu")
      .classList.toggle("bottom-menu--active");
  });
};

const showChangePasscodeBox = () => {
  document
    .querySelector(".change-passcode-btn")
    .addEventListener("click", () => {
      document
        .querySelector(".change-passcode-box")
        .classList.toggle("change-passcode-box--active");
    });
};
const changePasscode = () => {
  const newPasscode = document.getElementById("change-passcode-input").value;
  savePinInLocalStorage(newPasscode);
};

const initChangePasscode = () => {
  document
    .querySelector(".accept-change-passcode-btn")
    .addEventListener("click", () => {
      changePasscode();
    });
};

const deleteNote = () => {
  localStorage.removeItem("note");
  hideCreateNoteBox();
  location.reload();
};
const initDeleteNote = () => {
  document.querySelector(".delete-btn").addEventListener("click", () => {
    deleteNote();
  });
};

if (!initChangePasscode) savePinInLocalStorage("1111");
initEnterPin();
initCheckPin();
initClearPin();
initCreateNote();
renderNote();
showNoteSettings();
hideCreateNoteBox();
showChangePasscodeBox();
initChangePasscode();
initDeleteNote();

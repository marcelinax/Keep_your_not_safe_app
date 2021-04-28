"use strict";

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
savePinInLocalStorage();
initEnterPin();
initCheckPin();
initClearPin();

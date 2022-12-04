const body = document.querySelector("body");
const themeSwitcher = document.querySelector("#themeSwitcher");
const input = document.querySelector("#input");
const resultInput = document.querySelector("#result");

themeSwitcher.addEventListener("click", () => {
   body.classList.toggle("light-theme");
   body.classList.toggle("dark-theme");
});

const allowedChars = [
   "(",
   ")",
   "/",
   "*",
   "-",
   "+",
   "9",
   "8",
   "7",
   "6",
   "5",
   "4",
   "3",
   "2",
   "1",
   "0",
   ".",
   "%",
   " ",
];

body.addEventListener("keydown", (ev) => {
   if (input === document.activeElement) {
      return;
   }

   if (allowedChars.includes(ev.key)) {
      input.value += ev.key;
   } else if (ev.key === "Backspace") {
      input.value = input.value.slice(0, -1);
   } else if (ev.key === "Escape") {
      input.value = "";
   } else if (ev.key === "Enter") {
      calculate();
   }
});

// input.addEventListener("keydown", (ev) => {
//    ev.preventDefault();

//    if (allowedChars.includes(ev.key)) {
//       input.value += ev.key;
//       // return
//    } else if (ev.key === "Backspace") {
//       input.value = input.value.slice(0, -1);
//    } else if (ev.key === "Escape") {
//       input.value = "";
//    } else if (ev.key === "Enter") {
//       calculate();
//    }
// });

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
   input.value = "";
   resultInput.value = "";
   input.focus();
});

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", calculate);

const charsButtons = document.querySelectorAll(".charKey");
charsButtons.forEach((button) => {
   button.addEventListener(
      "click",
      () => (input.value += button.dataset.value)
   );
});

let res;
function calculate() {
   if (input.value) {
      try {
         const result = eval(input.value);
         resultInput.value = result;
      } catch (error) {
         resultInput.value = "Not valid! Try again.";
         resultInput.classList.add("error");
         input.value = "";
         setTimeout(() => {
            resultInput.classList.remove("error");
            resultInput.value = "";
         }, 1750);
      } finally {
         res = resultInput.value;
         // input.value = ''
         input.focus();
      }
   }
}

const copyToClipboard = document.querySelector("#result-div");
copyToClipboard.addEventListener("click", (ev) => {
   if (
      resultInput.value === "Not valid! Try again." ||
      resultInput.value === ""
   ) {
      return;
   }
   navigator.clipboard.writeText(resultInput.value);

   const button = ev.currentTarget.children.copyToClipboard;
   button.innerText = "Copied!";
   button.classList.add("success");
   resultInput.value = "Copied to clipboard!";

   setTimeout(() => {
      button.innerText = "Click to Copy";
      button.classList.remove("success");
      resultInput.value = res;
   }, 1750);
});

let currentInput = document.getElementById("current-input");
let inputRef = document.getElementById("input-ref");
let currentOperateDisplay = document.getElementById("current-operate-display");

let Saver = [];

let operandSaver = "";
let operatorSaver = "";

function GetInput(value) {
  //!check if user enter the next operate if there's a reference input
  if (inputRef.value != "" && operatorSaver == "") {
    alert("Choose your next operate");
    return;
    //!check if the first character in the input is dot
  } else if (currentInput.value == "" && value == ".") {
    return;
  }

  currentInput.value += value;
}

function Operator(value) {
  //!check if there's no operator is calculated
  if (inputRef.value == "" && currentInput.value == "") {
    alert("There's no operand to calculate");
    return;
  }
  //!check if the current element of the input is already operator
  if (
    currentInput.value[currentInput.value.length - 1] == "+" ||
    currentInput.value[currentInput.value.length - 1] == "-" ||
    currentInput.value[currentInput.value.length - 1] == "*" ||
    currentInput.value[currentInput.value.length - 1] == "/"
  ) {
    return;
  }

  if (
    inputRef.value != "" &&
    currentInput.value[0] != "+" &&
    currentInput.value[0] != "-" &&
    currentInput.value[0] != "*" &&
    currentInput.value[0] != "/" &&
    currentInput.value[0] != "." &&
    typeof currentInput.value[0] != "undefined"
  ) {
    currentInput.value += value;
  } else if (inputRef.value == "") {
    currentInput.value += value;
  } else if (
    (operatorSaver == "" ||
      operatorSaver == "+" ||
      operatorSaver == "-" ||
      operatorSaver == "*" ||
      operatorSaver == "/") &&
    inputRef.value != ""
  ) {
    operatorSaver = value;
    document.getElementById("current-operator-text").innerText = operatorSaver;
  }
}

function Equal() {
  //!check if there's no operator to perform with inputRef
  if (operatorSaver == "" && inputRef.value != "") {
    alert("There's no operator to perform calculcation");
    return;
  }
  //!check if any operator is redundant
  if (
    currentInput.value[currentInput.value.length - 1] == "+" ||
    currentInput.value[currentInput.value.length - 1] == "-" ||
    currentInput.value[currentInput.value.length - 1] == "*" ||
    currentInput.value[currentInput.value.length - 1] == "/"
  ) {
    currentInput.value = currentInput.value.substring(
      0,
      currentInput.value.length - 1
    );
  }
  //make an array contain seperated operands and operator
  for (let i = 0; i < currentInput.value.length; i++) {
    if (
      currentInput.value[i] == "+" ||
      currentInput.value[i] == "-" ||
      currentInput.value[i] == "*" ||
      currentInput.value[i] == "/"
    ) {
      Saver.push(operandSaver);
      Saver.push(currentInput.value[i]);
      i++;
      operandSaver = "";
    }
    operandSaver += currentInput.value[i];

    if (typeof currentInput.value[i + 1] == "undefined") {
      Saver.push(operandSaver);
    }
  }
  operandSaver = "";
  let counter = 0;

  //do * / first
  while (Saver.includes("*") || Saver.includes("/")) {
    if (Saver[counter] == "*") {
      Saver.splice(
        counter - 1,
        3,
        (Number(Saver[counter - 1]) * Number(Saver[counter + 1])).toString()
      );
      counter--;
    } else if (Saver[counter] == "/") {
      Saver.splice(
        counter - 1,
        3,
        (Number(Saver[counter - 1]) / Number(Saver[counter + 1])).toString()
      );
      counter--;
    }
    counter++;
  }

  counter = 0;
  //do + - later
  while (Saver.includes("+") || Saver.includes("-")) {
    let result = 0;
    if (Saver[counter] == "+") {
      Saver.splice(
        counter - 1,
        3,
        (Number(Saver[counter - 1]) + Number(Saver[counter + 1])).toString()
      );
      counter--;
    } else if (Saver[counter] == "-") {
      Saver.splice(
        counter - 1,
        3,
        (Number(Saver[counter - 1]) - Number(Saver[counter + 1])).toString()
      );
      counter--;
    }
    counter++;
  }
  //wait for the currentInput done and take the inputRef = inputRef + "operatorSaver" + Saver[0]
  if (inputRef.value != "") {
    if (operatorSaver == "+") {
      inputRef.value = Number(inputRef.value) + Number(Saver[0]);
    } else if (operatorSaver == "-") {
      inputRef.value = Number(inputRef.value) - Number(Saver[0]);
    } else if (operatorSaver == "*") {
      inputRef.value = Number(inputRef.value) * Number(Saver[0]);
    } else if (operatorSaver == "/") {
      inputRef.value = Number(inputRef.value) / Number(Saver[0]);
    }

    currentInput.value = "";
    operatorSaver = "";
    document.getElementById("current-operator-text").innerText = operatorSaver;
    Saver = [];
    return;
  }
  inputRef.value = Saver[0];
  currentInput.value = "";
  operatorSaver = "";
  document.getElementById("current-operator-text").innerText = operatorSaver;
  Saver = [];
}

function AC() {
  currentInput.value = "";
  inputRef.value = "";
  operandSaver = "";
  operatorSaver = "";
  document.getElementById("current-operator-text").innerText = operatorSaver;
}

function CE() {
  currentInput.value = currentInput.value.substring(
    0,
    currentInput.value.length - 1
  );
}

function MouseDown() {
  let sound = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3"
  );
  sound.load();
  sound.play();
}
function MouseUp() {
  let sound = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
  );
  sound.load();
  sound.play();
}

const inputs = document.querySelectorAll("input");
const resetBtn = document.getElementById("reset");
const tipBtns = document.querySelectorAll(".tip-grid button");
const peopleWrapper = document.getElementById("people");

let state = { bill: 0, tip: 0, people: 0 };

const renderTip = (state) => {
  const tipText = document.getElementById("tip-amount");
  const totalText = document.getElementById("tip-total");

  if (state.bill === 0 || state.tip === 0 || state.people === 0) {
    tipText.innerText = `$0.00`;
    totalText.innerText = `$0.00`;
    return;
  }

  if (state.people <= 0) {
    peopleWrapper.classList.add("error");
    return;
  } else {
    peopleWrapper.classList.remove("error");
  }

  const tipAmount = state.bill + state.tip * 0.01 * state.bill;
  const tipTotal = tipAmount * state.people;

  tipText.innerText = `$${tipAmount.toFixed(2)}`;
  totalText.innerText = `$${tipTotal.toFixed(2)}`;
};

const resetTip = () => {
  state = { bill: 0, tip: 0, people: 0 };

  inputs.forEach((input) => {
    input.value = "";
  });

  resetBtns();
  renderTip(state);
};

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    state[event.target.name] = event.target.valueAsNumber;
    renderTip(state);
  });
});

resetBtn.onclick = () => {
  resetTip();
};

const resetBtns = () => {
  tipBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

tipBtns.forEach((btn) => {
  btn.onclick = () => {
    resetBtns();

    btn.classList.add("active");
    state.tip = btn.id;
    renderTip(state);
  };
});

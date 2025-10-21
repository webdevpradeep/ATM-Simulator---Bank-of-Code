let state = 'insert';
let name = '';
let pin = '';
let balance = 1000;
let loan = 0;
let interest = 0;
const screen = document.getElementById('screen');
const keypad = document.getElementById('keypad');
const buttons = document.getElementById('buttons');

function showScreen(text) {
  screen.innerHTML = text;
}

function clearAll() {
  keypad.innerHTML = '';
  buttons.innerHTML = '';
}

function startATM() {
  state = 'getName';
  showScreen('Enter your name:');
  keypad.innerHTML =
    '<input id="nameInput" style="width: 100%; margin-top: 10px;"> <br><br>' +
    '<button onclick="submitName()">Submit</button>';
}

function submitName() {
  name = document.getElementById('nameInput').value;
  if (name === '') return;
  state = 'getPin';
  showScreen(`Welcome ${name}.\nEnter your 4-6 digit PIN:`);
  showKeypad();
}

function showKeypad() {
  clearAll();
  for (let i = 1; i <= 9; i++) {
    keypad.innerHTML += `<button onclick="enterPin('${i}')">${i}</button>`;
  }
  keypad.innerHTML += `<button onclick="enterPin('0')">0</button><button onclick="clearPin()">C</button><button onclick="submitPin()">OK</button>`;
}

function enterPin(num) {
  if (pin.length < 6) {
    pin += num;
    showScreen(`PIN: ${'*'.repeat(pin.length)}`);
  }
}

function clearPin() {
  pin = '';
  showScreen(`PIN: `);
}

function submitPin() {
  if (pin.length >= 4) {
    state = 'menu';
    showMenu();
  }
}

function showMenu() {
  clearAll();
  showScreen(
    `Welcome ${name}!\nBalance: ₹${balance.toFixed(2)}\nLoan: ₹${loan.toFixed(
      2
    )}\nChoose an option:`
  );
  ['Check Balance', 'Deposit', 'Withdraw', 'Eject'].forEach((label, index) => {
    buttons.innerHTML += `<button onclick="menuAction('${label}')">${label}</button>`;
  });
}

function menuAction(action) {
  if (action === 'Check Balance') {
    showScreen(
      `Your balance is ₹${balance.toFixed(2)}\nLoan: ₹${loan.toFixed(2)}`
    );
  } else if (action === 'Deposit') {
    let amt = prompt('Enter deposit amount:');
    if (!isNaN(amt) && amt > 0) {
      balance += parseFloat(amt);
      showScreen(`₹${amt} deposited. New balance ₹${balance.toFixed(2)}`);
    }
  } else if (action === 'Withdraw') {
    let amt = prompt('Enter withdrawal amount:');
    if (!isNaN(amt) && amt > 0 && amt <= balance) {
      balance -= parseFloat(amt);
      showScreen(`₹${amt} withdrawn. Remaining balance ₹${balance.toFixed(2)}`);
    } else {
      showScreen('Invalid or insufficient funds.');
    }
  } else if (action === 'Eject') {
    pin = '';
    state = 'insert';
    clearAll();
    showScreen('Card ejected. Thank you!');
  }
}

function loanSection() {
  const uname = prompt('Enter your full name:');
  const phone = prompt('Enter your phone number:');
  const amt = parseFloat(prompt('Loan amount you want:'));
  if (!isNaN(amt) && amt > 0) {
    const monthly = ((amt * 0.1) / 12).toFixed(2);
    balance += amt;
    loan += amt;
    showScreen(
      `Loan approved for ₹${amt}\nMonthly Interest: ₹${monthly}\nCredited to your account!`
    );
  }
}

// Start ATM simulation
startATM();

// DOM Elements
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const balanceDisplay = document.getElementById("balance");

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses and balance
function render() {
  expenseList.innerHTML = "";
  let totalBalance = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${expense.name} - $${expense.amount} <button onclick="removeExpense(${index})">X</button>`;
    expenseList.appendChild(li);
    totalBalance += expense.amount;
  });

  balanceDisplay.textContent = totalBalance;
}

// Add expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    name: expenseName.value,
    amount: parseFloat(expenseAmount.value),
  };

  expenses.push(newExpense);

  // Save expenses to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Clear inputs and render updated list
  expenseName.value = "";
  expenseAmount.value = "";
  render();
});

// Remove expense
function removeExpense(index) {
  expenses.splice(index, 1);

  // Save updated expenses to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Re-render the list
  render();
}

// Initial render
render();

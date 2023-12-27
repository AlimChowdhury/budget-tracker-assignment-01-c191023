const addExpenseButton = document.getElementById("add-expense-button");

const parentContainer = document.getElementById("parent-container");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const availableBudget = document.getElementById("available-budget");

const deleteIncome = document.querySelectorAll(".delete-income");
const deleteExpense = document.querySelectorAll(".delete-expense");

let sufficient = true;

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
}

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
   let sum = 0;
  for (let item of expenseList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  let income = parseFloat(totalIncome.innerHTML.replace(/,/g, ""));
    if (sum > income) {
        sufficient = false;
    } else {
        totalExpense.innerHTML = formatMoney(sum);
    }
}

/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
  let income = parseFloat(totalIncome.innerHTML.replace(/,/g, ""));
  let expense = parseFloat(totalExpense.innerHTML.replace(/,/g, ""));

  let budget = income-expense;
  availableBudget.innerHTML = formatMoney(budget);
}

/**
 * Task 3: Delete Entry
 */
//function deleteEntry() {}

parentContainer.addEventListener("click", function(e) {
    const target = e.target;
    if (target.classList.contains("delete-income")) {
        handleDeleteIncome(target);
    } else if (target.classList.contains("delete-expense")) {
        handleDeleteExpense(target);
    }
});

function parseMoneyValue(element){
  return parseFloat(element.innerHTML.replace(/,/g, ""));
}

function updateUI(element, value){
  element.innerHTML = formatMoney(value);
}

function handleDeleteIncome(target){
  let decreaseIncome = parseMoneyValue(target.previousElementSibling);
  let income =parseMoneyValue(totalIncome);
  let expense =parseMoneyValue(totalExpense);
  let budget =parseMoneyValue(availableBudget);

  income -= decreaseIncome;
  budget -= decreaseIncome;

  if(income<expense){
    alert("Sorry! Expense can't be higher than income");
  }
  else{
    updateUI(totalIncome,income);
    updateUI(availableBudget,budget);

    target.parentNode.parentNode.parentNode.remove();
  }
}

function handleDeleteExpense(target){
  let decreaseExpense = target.previousElementSibling.innerHTML.replace(/,/g, "");
  decreaseExpense = parseFloat(Math.abs(decreaseExpense));
  let expense =parseMoneyValue(totalExpense);
  let budget = parseMoneyValue(availableBudget);


  expense -= decreaseExpense;
  budget += decreaseExpense;
  totalExpense.innerHTML = formatMoney(expense);
  availableBudget.innerHTML = formatMoney(budget);

  target.parentNode.parentNode.parentNode.remove();
}

//update entry
function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  list.innerHTML += newEntryHtml;

  // update total income value
  calculateIncome();
  calculateExpense();
   let budget = parseFloat(availableBudget.innerHTML.replace(/,/g, ""));
    // list.innerHTML += newEntryHtml;
    if (!sufficient || (value > availableBudget)) {
        // return;
        alert('Insufficient balance. Please add some money..');
        list.innerHTML = inner;

    } else {
        calculateBudget();
    }
    descriptionInput.value = "";
    valueInput.value = "";
}

addExpenseButton.addEventListener("click", addEntry);

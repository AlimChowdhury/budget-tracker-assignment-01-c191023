const addExpenseButton = document.getElementById("add-expense-button");

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

const parentContainer = document.getElementById("parent-container");
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
//calculateIncome();

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
  totalExpense.innerHTML = formatMoney(sum);
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

parentContainer.addEventListener("click",function(e){
  const target = e.target;
  if(target.classList.contains("delete-income")){
    handleDeleteIncome(target);
  }
  else  if(target.classList.contains("delete-expense")){
    handleDeleteExpense(target);
  }
});

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
  calculateBudget();
}

addExpenseButton.addEventListener("click", addEntry);

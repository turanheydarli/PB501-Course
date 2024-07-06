const expenses = {
    'All': [],
    'Transport': [],
    'Entertainment': [],
    'Food': [],
    'Shopping': [],
    'Education': [],
}

const filterElement = document.getElementById('filter-select');
const expensesTableBody = document.querySelector('#expenses-table-body');

const mostExpensiveExpense = document.querySelector('#most-expensive-expense');
const mostExpensiveDay = document.querySelector('#most-expensive-day');
const avarageExpense = document.querySelector('#avarage-expense');

const createForm = document.querySelector('#create-form');
const formSubmitButton = document.querySelector('#form-submit-button');
const dayInput = document.querySelector('#day-input');
const expenceTypeInput = document.querySelector('#expence-type-input');
const amountInput = document.querySelector('#amount-input');


formSubmitButton.addEventListener('click', performAdd);
formSubmitButton.addEventListener('click', renderPage);

filterElement.addEventListener('change', renderPage);

document.addEventListener('DOMContentLoaded', renderPage);


addExpense('Transport', 1, 1);
addExpense('Transport', 2, 1);
addExpense('Transport', 3, 2);
addExpense('Transport', 4, 1);
addExpense('Transport', 5, 8);
addExpense('Transport', 6, 8);


addExpense('Entertainment', 3, 10);
addExpense('Entertainment', 4, 10);
addExpense('Entertainment', 5, 100);
addExpense('Entertainment', 6, 89);

addExpense('Shopping', 6, 30);

addExpense('Food', 1, 15);
addExpense('Food', 2, 12);
addExpense('Food', 3, 20);
addExpense('Food', 5, 10);
addExpense('Food', 6, 5);

addExpense('Education', 6, 37);

console.log(getAllExpenses());

console.log(getAvarageExpense());


function performAdd(event) {
    event.preventDefault()

    let day = parseInt(dayInput.value);
    let amount = parseFloat(amountInput.value);
    let type = expenceTypeInput.value;

    addExpense(type, day, amount)
}

function renderPage() {
    renderMostExpensiveDay();
    renderMostExpensiveExpense();
    renderAvarageExpense();

    renderExpensesTable();
}

function renderMostExpensiveExpense() {
    const expense = getMostExpensiveExpense();

    mostExpensiveExpense.innerHTML = `Most Expensive Expense: ${expense.expenseType} Amount: ${expense.amount}`;
}

function renderMostExpensiveDay() {
    const expense = getMostExpensiveDayByType('All');

    mostExpensiveDay.innerHTML = `Most Expensive Day: ${expense.day}  Amount: ${expense.amount}`;
}

function renderAvarageExpense() {
    const expense = getAvarageExpense();

    avarageExpense.innerHTML = `Avarage expense: ${expense.toFixed(1)}`;
}

function renderExpensesTable() {
    const selectedType = filterElement.value;
    const filteredExpenses = getExpensesByType(selectedType);

    expensesTableBody.innerHTML = filteredExpenses.map(expense => {
        let tableId = filteredExpenses.indexOf(expense) + 1;

        return `<tr>
            <td>${tableId}</td>
            <td>${expense.expenseType}</td>
            <td>${expense.day}</td>
            <td>${expense.amount}</td>
        </tr>`;
    }).join('');;
}

function getAllExpenses() {
    let expenseValues = Object.values(expenses);

    let allExpenses = [];

    for (let index = 0; index < expenseValues.length; index++) {
        const expense = expenseValues[index];
        expense.forEach(e => {
            allExpenses.push(e);
        });
    }

    return allExpenses;
}

function addExpense(expenseType, day, amount) {
    let expenseValues = Object.values(expenses);

    let expenseId = 1;

    for (let index = 0; index < expenseValues.length; index++) {
        const expense = expenseValues[index];
        expenseId += expense.length;
    }

    let newExpense = {
        'expenseId': expenseId,
        'expenseType': expenseType,
        'day': day,
        'amount': amount
    };

    if (!validateExpense(newExpense)) {
        return null;
    }

    return expenses[expenseType].push(newExpense);
}

function getExpensesByType(expenseType) {

    if (expenseType == 'All') {
        return getAllExpenses();
    }

    return expenses[expenseType];
}

function getSumOfExpenses() {
    let allExpenses = getAllExpenses();

    let sum = 0;

    allExpenses.forEach(expense => {
        expense.amount += sum;
    });

    return sum;
}

function getMostExpensiveDayByType(expenseType) {
    let filteredExpenses = getExpensesByType(expenseType);

    let days = [];

    for (let index = 0; index < filteredExpenses.length; index++) {
        const element = filteredExpenses[index];

        if (!days.map(d => d.day).includes(element.day)) {
            let day = {
                day: element.day,
                amount: element.amount
            };

            days.push(day)
        } else {
            var el = days.find(d => d.day == element.day);

            el.amount = el.amount + element.amount;
        }

    }

    let mostExpensiveExpense = days[0];

    for (let index = 0; index < days.length; index++) {
        const expense = days[index];
        if (expense.amount > mostExpensiveExpense.amount) {
            mostExpensiveExpense = expense;
        }
    }

    return mostExpensiveExpense;
}

function getMostExpensiveExpense() {
    let filteredExpenses = getExpensesByType('All');

    let mostExpensiveExpense = filteredExpenses[0];

    for (let index = 0; index < filteredExpenses.length; index++) {
        const expense = filteredExpenses[index];
        if (expense.amount > mostExpensiveExpense.amount) {
            mostExpensiveExpense = expense;
        }
    }

    return mostExpensiveExpense;
}

function getAvarageExpense() {
    let allExpenses = getAllExpenses();

    let sum = 0;

    allExpenses.forEach(expense => {
        sum += expense.amount;
    });

    return sum / allExpenses.length;
}

function validateExpense(expense) {
    if (expense.day < 1 || expense.day > 7) {
        return false;
    }



    return true;
}


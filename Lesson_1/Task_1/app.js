const ExpenseType = {
    All: 'All',
    Transport: 'Transport',
    Entertainment: 'Entertainment',
    Food: 'Food',
    Shopping: 'Shopping',
    Education: 'Education',
};

const expenses = Object.fromEntries(Object.keys(ExpenseType).map(type => [type, []]));

const filterElement = document.getElementById('filter-select');
const expensesTableBody = document.querySelector('#expenses-table-body');

filterElement.innerHTML = Object.keys(ExpenseType).map((value) => `<option  ${value == ExpenseType.All ? 'selected' : ''}>` + value + '</option>');



document.addEventListener('DOMContentLoaded', renderExpensesTable);
filterElement.addEventListener('change', renderExpensesTable);


// expenseTypeElement.appendChild(`<select>${Object.keys(ExpenseType).map((value) => '<option>' + value + '</option>')}</select>`);

addExpense(ExpenseType.Transport, 2, 100);
addExpense(ExpenseType.Transport, 2, 100);
addExpense(ExpenseType.Transport, 2, 100);
addExpense(ExpenseType.Transport, 2, 100);
addExpense(ExpenseType.Transport, 2, 100);
addExpense(ExpenseType.Transport, 2, 100);


addExpense(ExpenseType.Education, 2, 100);


console.log(getAllExpenses());

function renderExpensesTable() {
    const selectedType = filterElement.value;
    const filteredExpenses = getExpensesByType(selectedType);

    let tableId = filteredExpenses.indexOf(expense) + 1;

    expensesTableBody.innerHTML = filteredExpenses.map(expense => {
        return `<tr>
            <td>${tableId}</td>
            <td>${expense.expenseType}</td>
            <td>${expense.day}</td>
            <td>${expense.amount}</td>
        </tr>`;
    });
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

    if (!valiedateExpense(newExpense)) {
        return null;
    }

    return expenses[expenseType].push(newExpense);
}

function getExpensesByType(expenseType) {
    
    if (expenseType == ExpenseType.All) {
        return getAllExpenses();
    }

    return expenses[expenseType];
}

function valiedateExpense(expense) {

    if (expense.day < 1 || expense.day > 7) {
        return false;
    }

    switch (expense.expenseType) {
        case ExpenseType.Transport:
            break;
        case ExpenseType.Education:
            break;
        default:
            break;
    }

    return true;
}


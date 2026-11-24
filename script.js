let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");
let expenseCategory = document.getElementById("expenseCategory");

let addExpenseBtn = document.getElementById("addExpense");

let totalAmount = document.getElementById("totalAmount");
let expenseList = document.getElementById("expenseList");

let filterCategory = document.getElementById("filterCategory");

let expenses = [];

addExpenseBtn.addEventListener("click", function () {

    let name = expenseName.value.trim();
    let amount = Number(expenseAmount.value);
    let category = expenseCategory.value;

    if (name === "" || expenseAmount.value.trim() === "" || category === "") {
        alert("Please fill all fields!");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid positive amount!");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";

    displayExpenses();

});

function displayExpenses() {

    expenseList.innerHTML = "";

    let selectedCategory = filterCategory.value;

    let filteredExpenses = expenses.filter(function (expense) {
        return selectedCategory === "All" ||
               expense.category === selectedCategory;
    });

    if (filteredExpenses.length === 0) {

        let message = document.createElement("p");

        message.textContent = expenses.length === 0
            ? "No expenses added yet."
            : "No expenses found in this category.";

        expenseList.appendChild(message);

    }

    filteredExpenses.forEach(function (expense) {

        let expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        let expenseInfo = document.createElement("div");
        expenseInfo.className = "expense-info";

        let name = document.createElement("h3");
        name.textContent = expense.name;

        let details = document.createElement("p");
        details.textContent =
            "Category: " + expense.category +
            " | Amount: ₹" + expense.amount.toFixed(2);

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            deleteExpense(expense.id);
        });

        expenseInfo.appendChild(name);
        expenseInfo.appendChild(details);

        expenseItem.appendChild(expenseInfo);
        expenseItem.appendChild(deleteBtn);

        expenseList.appendChild(expenseItem);

    });

    calculateTotal();

}

function calculateTotal() {

    let total = 0;

    expenses.forEach(function (expense) {
        total = total + expense.amount;
    });

    totalAmount.textContent = total.toFixed(2);

}

function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    displayExpenses();

}

filterCategory.addEventListener("change", function () {

    displayExpenses();

});
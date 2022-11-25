// Module Import

import { menuArray } from './data.js';

// Variables

const order = [];
const orderForm = document.getElementById("order-form");

// Event Listeners

document.addEventListener("click", function (e) {
    if (e.target.dataset.add) {
        addItem(e.target.dataset.add);
    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove);
    } else if (e.target.id == "purchase-btn") {
        showModal();
    } else if (e.target.id == "close-modal-btn") {
        closeModal();
    }
    showOrderSection(order);
    render()
})

orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    renderFinalMsg();
    closeModal();
});

// Functions

function render() {
    document.getElementById("menu-section").innerHTML = getMenu();
    document.getElementById("order-summary").innerHTML = getOrder();
    document.getElementById("order-total").textContent = `$${calcOrderTotal(order)}`;
}

function getMenu() {
    let menuHtml = ``;

    menuArray.forEach(function (item) {
        menuHtml += `
        <div class="item">
        <div class="item-graphic"><p>${item.emoji}</p></div>
        <div class="item-inner">
            <h2 class="item-title">${item.name}</h2>
            <p class="item-description">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <button class="add-btn" data-add="${item.id}">+</button>                
        </div>
    `
    })
    return menuHtml;
}

function getOrder() {
    let orderHTML = ``;
    let i = 0;

    order.forEach(function (item) {
        orderHTML += `
        <div class="order-item">
            <p class="item-title">${item.name}</p>
            <button class="remove-btn item-description" data-remove="${i}">remove</button>
            <span class="item-price">$${item.price}</span>
        </div>
        `
        i++;
    })
    return orderHTML;
}

function calcOrderTotal(order) {
    let orderTotal = 0;
    order.forEach(function (item) {
        orderTotal += item.price;
    })
    return orderTotal;
}

function addItem(item) {
    menuArray.forEach(function (menuItem) {
        if (menuItem.id == item) {
            order.push(menuItem);
        }
    })
}

function removeItem(item) {
    let index = Number(item);
    order.splice(index, 1);
}

function showOrderSection(order) {
    let state = (order.length < 1) ? "none" : "flex";
    document.getElementById("checkout-section").style.display = state;
}

function showModal() {
    document.getElementById("payment-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("payment-modal").style.display = "none";
}

function getOrderData() {
    const orderFormData = new FormData(orderForm);
    let name = orderFormData.get("name");

    return name;
}

function processOrder() {
    let name = getOrderData();

    let orderedHtml = `
        <div class="complete-order-msg">
    <p>Thanks, ${name}! Your order is on its way!</p>
    </div>
    `
    return orderedHtml;
}

function renderFinalMsg() {
    document.getElementById("checkout-section").innerHTML = processOrder();
}

render();

// Module Import

import { menuArray } from './data.js';

// Variables

const order = [];

// Event Listeners

document.addEventListener("click", function (e) {
    if (e.target.dataset.add) {
        addItem(e.target.dataset.add);
    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove);
    }
    showOrderSection(order);
    render()
})

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
    console.log(order);
}

function removeItem(item) {
    let index = Number(item);
    order.splice(index, 1);
}

function showOrderSection(order) {
    let state = (order.length < 1) ? "none" : "flex";
    document.getElementById("checkout-section").style.display = state;
}

render();

import { menuArray } from './data.js';

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
        <button class="add-btn">+</button>                
        </div>
    `
    })
    return menuHtml;
}

function render() {
    document.getElementById("items-container").innerHTML = getMenu();
}

render();

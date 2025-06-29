// js/carrinho.js
import {
  getCart, setCart, findProduct,
  formatBRL, groupCartItems, updateCartBadge
} from './cart-utils.js';

function renderCartPage() {
  const ul = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!ul || !totalEl) return;

  const cart = getCart();
  ul.innerHTML = '';
  if (!cart.length) {
    ul.innerHTML = '<li class="empty-cart">Seu carrinho está vazio.</li>';
    totalEl.textContent = '0,00';
    return;
  }

  let total = 0;
  const grouped = groupCartItems(cart);
  Object.entries(grouped).forEach(([id, qty]) => {
    const p = findProduct(id);
    total += p.price * qty;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <h3>${p.name} x${qty}</h3>
        <p>R$ ${formatBRL(p.price * qty)}</p>
        <div class="qty-controls">
          <button class="decrease-qty" data-id="${id}" title="Diminuir">-</button>
          <span class="qty-value">${qty}</span>
          <button class="increase-qty" data-id="${id}" title="Aumentar">+</button>
        </div>
      </div>
      <button class="remove-item" data-id="${id}">❌</button>
    `;
    ul.appendChild(li);
  });

  totalEl.textContent = formatBRL(total);
}

function initCartRemoval() {
  document.getElementById('cart-items')
    .addEventListener('click', e => {
      if (e.target.matches('.remove-item')) {
        const id = e.target.dataset.id;
        const cart = getCart();
        const idx = cart.indexOf(id);
        if (idx > -1) cart.splice(idx, 1);
        setCart(cart);
        renderCartPage();
      }
      if (e.target.matches('.increase-qty')) {
        const id = e.target.dataset.id;
        const cart = getCart();
        cart.push(id);
        setCart(cart);
        renderCartPage();
      }
      if (e.target.matches('.decrease-qty')) {
        const id = e.target.dataset.id;
        const cart = getCart();
        const idx = cart.indexOf(id);
        if (idx > -1) cart.splice(idx, 1);
        setCart(cart);
        renderCartPage();
      }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
  initCartRemoval();
  updateCartBadge();
  document.getElementById('clear-cart')
    .addEventListener('click', () => {
      setCart([]);
      renderCartPage();
    });
});

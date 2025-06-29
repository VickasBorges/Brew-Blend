// js/checkout.js
import {
  getCart, setCart, findProduct,
  formatBRL, updateCartBadge
} from './cart-utils.js';

function renderOrderSummary() {
  const summary = document.getElementById('order-summary');
  if (!summary) return;
  const cart = getCart();
  if (!cart.length) {
    summary.innerHTML = '<p>Seu carrinho está vazio.</p>';
    return;
  }
  const lines = cart.map(id => {
    const p = findProduct(id);
    return `<li>${p.name}: R$ ${formatBRL(p.price)}</li>`;
  }).join('');
  const total = cart.reduce((s, id) => s + findProduct(id).price, 0);
  summary.innerHTML = `
    <ul>${lines}</ul>
    <p><strong>Total: R$ ${formatBRL(total)}</strong></p>
  `;
}

function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.customerName.value.trim();
    const addr = form.customerAddress.value.trim();
    const pay  = form.querySelector('input[name="payment-method"]:checked');
    if (!name || !addr || !pay) {
      return alert('Preencha todos os campos.');
    }
    const cart = getCart();
    let text = `*📋 Novo Pedido Brew&Blend*\n\n` +
               `*👤 Cliente:* ${name}\n` +
               `*🏠 Endereço:* ${addr}\n` +
               `*💳 Pagamento:* ${pay.value}\n\n` +
               `*🛒 Itens:*\n`;
    let total = 0;
    cart.forEach(id => {
      const p = findProduct(id);
      total += p.price;
      text += `• ${p.name}: R$ ${formatBRL(p.price)}\n`;
    });
    text += `\n*💰 Total:* R$ ${formatBRL(total)}`;
    window.open(`https://wa.me/5532998041079?text=${encodeURIComponent(text)}`, '_blank');
    setCart([]);
    renderOrderSummary();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  initCheckoutForm();
  updateCartBadge();
});

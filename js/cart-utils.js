// js/cart-utils.js
export function getCart() {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}
export function setCart(cart) {
  localStorage.setItem('cartItems', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartChanged'));
}
export const ALL_PRODUCTS = Object.values(window.PRODUCTS)
  .filter(arr => Array.isArray(arr))
  .flat();
export function findProduct(id) {
  const p = ALL_PRODUCTS.find(x => x.id === id);
  if (!p) console.error(`Produto "${id}" não encontrado`);
  return p;
}
export function formatBRL(v) {
  return v.toFixed(2).replace('.', ',');
}
export function groupCartItems(cart) {
  return cart.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
}
export function updateCartBadge() {
  const link = document.getElementById('basket-link');
  if (!link) return;
  const count = getCart().length;
  link.dataset.count = count;
  link.setAttribute(
    'aria-label',
    `Carrinho com ${count} item${count !== 1 ? 's' : ''}`
  );
}
window.addEventListener('cartChanged', updateCartBadge);

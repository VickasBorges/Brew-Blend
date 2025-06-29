// js/scripts.js (Home)
import { getCart, setCart, updateCartBadge } from './cart-utils.js';
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.productId;
      const cart = getCart();
      cart.push(id);
      setCart(cart);
      updateCartBadge(); // Atualiza o badge imediatamente
    });
  });
});

// MICROINTERAÇÕES: Ripple, Fly to Cart e Bounce
function addButtonMicroInteractions() {
  // Ripple effect
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Fly to cart
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const card = btn.closest('.product-card, .combo-card');
      if (!card) return;
      const img = card.querySelector('img');
      if (!img) return;
      const imgRect = img.getBoundingClientRect();
      const basket = document.getElementById('basket-link');
      if (!basket) return;
      const basketRect = basket.getBoundingClientRect();
      const clone = img.cloneNode(true);
      clone.classList.add('fly-img');
      clone.style.left = imgRect.left + 'px';
      clone.style.top = imgRect.top + 'px';
      clone.style.width = imgRect.width + 'px';
      clone.style.height = imgRect.height + 'px';
      document.body.appendChild(clone);
      // Forçar reflow para animar
      void clone.offsetWidth;
      clone.style.transform = `translate(${basketRect.left - imgRect.left + basketRect.width/2 - imgRect.width/2}px, ${basketRect.top - imgRect.top + basketRect.height/2 - imgRect.height/2}px) scale(0.3)`;
      clone.style.opacity = '0';
      setTimeout(() => clone.remove(), 900);
    });
  });
}

// Chamar ao carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addButtonMicroInteractions);
} else {
  addButtonMicroInteractions();
}

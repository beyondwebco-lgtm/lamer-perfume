/**
 * VELARI PRIVÉ — RITUAL BAG & PURCHASE CONTROLLER
 * Luxury side drawer, quantity controls & checkout flow
 */

(function () {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  const cartCountBadges = document.querySelectorAll('.cart-count');

  let cart = {
    items: [
      {
        id: 'anagenese-single',
        name: 'ANAGENÈSE — The Regenerating Elixir',
        volume: '40 mL / 1.35 fl. oz.',
        price: 4950,
        qty: 1,
        image: 'assets/images/anagenese-hero-bottle.jpg'
      }
    ]
  };

  function updateCartUI() {
    const itemsContainer = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    if (!itemsContainer || !subtotalEl) return;

    let total = 0;
    let totalCount = 0;

    if (cart.items.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align:center; padding: 4rem 1rem; color: #888;">
          <div style="font-family:'Cormorant Garamond',serif; font-size:1.5rem; color:#333; margin-bottom:0.5rem;">Your Ritual Bag is Empty</div>
          <p style="font-size:0.8125rem;">Discover the restorative precision of Anagenèse.</p>
        </div>
      `;
      subtotalEl.textContent = '₹0';
    } else {
      itemsContainer.innerHTML = cart.items.map((item, index) => {
        total += item.price * item.qty;
        totalCount += item.qty;

        return `
          <div class="cart-item-card">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
            <div class="cart-item-details">
              <div style="font-family:'Cormorant Garamond',serif; font-size:1.15rem; color:#080808; line-height:1.2; margin-bottom:0.25rem;">${item.name}</div>
              <div style="font-size:0.6875rem; color:#777; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.5rem;">${item.volume}</div>
              <div style="font-size:0.9rem; font-weight:500; color:#080808; margin-bottom:0.75rem;">₹${(item.price * item.qty).toLocaleString()}</div>
              
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <div class="qty-counter" style="border:1px solid rgba(8,8,8,0.15);">
                  <button class="qty-btn" onclick="window.updateItemQty(${index}, -1)" style="padding:4px 10px;">-</button>
                  <span class="qty-display" style="padding:0 8px; font-size:0.75rem;">${item.qty}</span>
                  <button class="qty-btn" onclick="window.updateItemQty(${index}, 1)" style="padding:4px 10px;">+</button>
                </div>
                <button onclick="window.removeCartItem(${index})" style="background:none; border:none; font-size:0.6875rem; letter-spacing:0.15em; text-transform:uppercase; color:#999; cursor:pointer;">Remove</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      subtotalEl.textContent = `₹${total.toLocaleString()}`;
    }

    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });
  }

  window.updateItemQty = function (index, delta) {
    if (!cart.items[index]) return;
    cart.items[index].qty += delta;
    if (cart.items[index].qty <= 0) {
      cart.items.splice(index, 1);
    }
    updateCartUI();
  };

  window.removeCartItem = function (index) {
    if (!cart.items[index]) return;
    cart.items.splice(index, 1);
    updateCartUI();
  };

  window.addToRitualCart = function (type) {
    const existingIndex = cart.items.findIndex(i => i.id === (type === 'duo' ? 'anagenese-duo' : 'anagenese-single'));

    if (existingIndex > -1) {
      cart.items[existingIndex].qty += 1;
    } else {
      if (type === 'duo') {
        cart.items.push({
          id: 'anagenese-duo',
          name: 'ANAGENÈSE — Duo Regimen Set',
          volume: '2 × 40 mL (80 mL Total)',
          price: 8900,
          qty: 1,
          image: 'assets/images/anagenese-hero-bottle.jpg'
        });
      } else {
        cart.items.push({
          id: 'anagenese-single',
          name: 'ANAGENÈSE — The Regenerating Elixir',
          volume: '40 mL / 1.35 fl. oz.',
          price: 4950,
          qty: 1,
          image: 'assets/images/anagenese-hero-bottle.jpg'
        });
      }
    }

    updateCartUI();
    openCart();
  };

  function openCart() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    document.querySelectorAll('.open-cart-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });

    document.getElementById('closeCartDrawerBtn')?.addEventListener('click', closeCart);
    backdrop?.addEventListener('click', closeCart);

    // Add to ritual button in product section
    document.getElementById('mainAddToRitualBtn')?.addEventListener('click', () => {
      const activeOption = document.querySelector('.option-pill.active');
      const type = activeOption?.getAttribute('data-type') || 'single';
      window.addToRitualCart(type);
    });

    // Product option selection
    document.querySelectorAll('.option-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const priceEl = document.getElementById('productDynamicPrice');
        if (priceEl) {
          const type = pill.getAttribute('data-type');
          priceEl.textContent = type === 'duo' ? '₹8,900' : '₹4,950';
        }
      });
    });

    // Checkout modal trigger
    document.getElementById('proceedCheckoutBtn')?.addEventListener('click', () => {
      alert("VELARI PRIVÉ CONCIERGE\n\nYour luxury order reservation has been initiated.\nEach bottle of ANAGENÈSE is freshly prepared in small clinical batches with verified batch serialization.");
    });
  });

  window.openRitualBag = openCart;
  window.closeRitualBag = closeCart;
})();

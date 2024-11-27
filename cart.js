document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total');

    const renderCart = () => {
        cartContainer.innerHTML = '';
        let subtotal = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="Product Image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-index="${index}"></p>
                    <p>Price: <span class="price">$${item.price}</span></p>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.05;
        const total = subtotal + tax;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const name = productCard.querySelector('h3').textContent;
            const price = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
            const image = productCard.querySelector('img').src;

            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ name, price, quantity: 1, image });
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert(`${name} has been added to the cart.`);
        });
    });

    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        }
    });

    cartContainer.addEventListener('input', (e) => {
        if (e.target.type === 'number') {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value, 10);
            cartItems[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        }
    });

    if (cartContainer) renderCart();
});

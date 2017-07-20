// TODO: Fix dependency on this.cart.items

export default {
    computed: {
        cartTotal() {
            let total = 0;

            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price;
            });

            return total;
        },
        
        taxAmount() {
            return ((this.cartTotal * 10) / 100);
        }
    },
    methods: {
        getCartItem(product) {
            for (let i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        },

        addProductToCart(product, quantity) {
            let cartItem = this.getCartItem(product);

            // TODO: Verify that there is "quantity" of the product in stock before adding it.

            if (cartItem != null) {
                cartItem.quantity += quantity;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: quantity
                });
            }

            product.inStock -= quantity;
        },

        increaseQuantity(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart(cartItem) {
            let index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout() {
            if (confirm('Are you sure that you want to purchase these products?')) {
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });

                this.cart.items = [];
            }
        }
    }
};
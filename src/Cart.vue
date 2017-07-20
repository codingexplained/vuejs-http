<template>
    <div>
        <h1>Cart</h1>

        <table v-if="cart.items.length > 0" class="table table-striped">
            <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="item in cart.items">
                <td>{{ item.product.name }}</td>
                <td>
                    {{ item.quantity }} &nbsp;
                    <button class="btn btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>
                    <button class="btn btn-danger" @click="decreaseQuantity(item)">-</button>
                </td>
                <td>{{ item.quantity * item.product.price | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Subtotal</strong>
                </td>

                <td>{{ cartTotal | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Taxes</strong>
                </td>

                <td>{{ taxAmount | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Grand total</strong>
                </td>

                <td>{{ cartTotal + taxAmount | currency }}</td>
            </tr>

            <tr>
                <td colspan="2"></td>
                <td><button class="btn btn-success" @click="checkout">Checkout</button></td>
            </tr>
            </tbody>
        </table>

        <p v-else>Your cart is currently empty.</p>
    </div>
</template>

<script>
    import CartMixin from './mixins/cart';

    export default {
        props: ['cart'],
        mixins: [ CartMixin ],
        beforeRouteLeave(to, from, next) {
            if (this.cart.items.length > 0) {
                if (!confirm('Are you sure you don\'t want to buy these products?')) {
                    return next(false);
                }
            }

            next();
        }
    }
</script>
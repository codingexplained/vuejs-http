<template>
    <div id="products" class="row list-group">
        <div v-for="product in products" class="item col-xs-4">
            <div class="thumbnail">
                <img @click="clickedImage(product)" class="group list-group-image" src="http://placehold.it/400x250/000/fff">
                <div class="caption">
                    <router-link
                            :to="{ name: 'viewProduct', params: { productId: product.id }, hash: '#related' }"
                            tag="h4"
                            class="group inner list-group-item-heading">
                        <a>{{ product.name }}</a>
                    </router-link>

                    <p class="group inner list-group-item-text">{{ product.description }}</p>
                    <br>

                    <div class="row flex flex-row align-center">
                        <div class="col-xs-4">
                            <p class="lead">{{ product.price | currency }}</p>
                        </div>

                        <div class="col-xs-8 flex flex-row align-center justify-right">
                            <div class="number-in-stock" :class="{ few: product.inStock < 10 && product.inStock > 0, none: product.inStock == 0 }">
                                {{ product.inStock }} in stock
                            </div>
                            <button class="btn btn-success" @click="addProductToCart(product, 1)" :disabled="product.inStock == 0">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus } from './main';

    export default {
        data() {
            return {
                products: []
            };
        },
        methods: {
            addProductToCart(product, quantity) {
                eventBus.$emit('addItemToCart', {
                    product: product,
                    quantity: quantity
                });
            },
            clickedImage(product) {
                this.$router.push({
                    name: 'viewProduct',
                    params: {
                        productId: product.id
                    },
                    query: {
                        discount: 10
                    }
                });
            }
        }
    }
</script>

<style>
    #products .item img { background-color: #000; cursor: pointer; }
    #products .item p.lead { margin-bottom: 0; }
    #products .item .number-in-stock { margin-right: 10px; }
    #products .item .number-in-stock.few { color: #E0A14F; }
    #products .item .number-in-stock.none { color: #C45E5E; }
</style>

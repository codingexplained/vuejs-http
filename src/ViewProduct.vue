<template>
    <div>
        <button class="btn btn-primary" @click="goBack">&laquo; Back</button>

        <div v-if="product != null">
            <h1>{{ product.name }}</h1>

            <p><strong>ID:</strong> {{ product.id }}</p>
            <p><strong>Price:</strong> {{ product.price | currency }}</p>
            <p><strong>In stock:</strong> {{ product.inStock }}</p>
            <p>{{ product.description }}</p>

            <h2>Reviews</h2>

            <div v-if="product.reviews.length > 0">
                <div v-for="review in product.reviews">
                    <strong>{{ review.reviewer }}</strong> (rating: {{ review.rating }})
                    <p>{{ review.text }}</p>
                </div>
            </div>

            <div v-else>
                <p>No reviews have been added for this product.</p>
            </div>
        </div>

        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            productId: {
                required: true
            }
        },
        data() {
            return {
                product: null
            };
        },
        created() {
            this.getProduct(this.productId)
                .then(product => this.product = product);
        },
        beforeRouteUpdate(to, from, next) {
            this.getProduct(to.params.productId)
                .then(product => this.product = product);

            next();
        },
        methods: {
            getProduct(productId) {
                return this.$http.get('http://localhost:3000/products/{productId}', {
                    params: {
                        productId: productId
                    }
                }).then(
                    response => response.json(),
                    response => alert("Could not retrieve product!")
                );
            },
            goBack() {
                this.$router.history.go(-1);
            }
        }
    }
</script>

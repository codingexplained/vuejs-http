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
            this.product = this.getProduct(this.productId);
        },
        beforeRouteUpdate(to, from, next) {
            this.product = this.getProduct(to.params.productId);
            next();
        },
        methods: {
            getProduct(productId) {

            },
            goBack() {
                this.$router.history.go(-1);
            }
        }
    }
</script>

import ProductList from './ProductList.vue';
import ViewProduct from './ViewProduct.vue';
import Cart from './Cart.vue';
import ViewProfile from './ViewProfile.vue';

export const routes = [
    { path: '', component: ProductList },
    { path: '/products/:productId', name: 'viewProduct', props: true, component: ViewProduct },
    { path: '/cart', component: Cart },
    {
        path: '/user/profile',
        name: 'viewProfile',
        component: ViewProfile,
        meta: {
            isAuthRequired: true
        }
    },
    { path: '*', component: { template: '<h1>Page Not Found!</h1>' } }
];

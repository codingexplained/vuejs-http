const express = require('express');
const cors = require('cors');
const products = require('./products.js');
const bodyParser = require('body-parser');
const app = express();

function getProduct(productId) {
    let product = null;
    
    products.forEach((p) => {
        if (p.id == productId) {
            product = p;
        }
    });
    
    return product;
}

function deleteReview(productId, reviewId) {
    let product = getProduct(productId);
    
    if (product) {
        let index = -1;
        
        for (let i = 0; i < product.reviews.length && index == -1; i++) {
            if (product.reviews[i].id == reviewId) {
                index = i;
            }
        }
        
        if (index != -1) {
            product.reviews.splice(index, 1);
            return true;
        }
    }
    
    return false;
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    let product = getProduct(req.params.id);
    
    if (product) {
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

app.post('/products/:productId/reviews', (req, res) => {
    let product = getProduct(req.params.productId);
    
    if (product) {
        let newReview = req.body;
        newReview.id = uuid();
        product.reviews.push(newReview);
        res.json(newReview);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/products/:productId/reviews/:reviewId', (req, res) => {
    if (deleteReview(req.params.productId, req.params.reviewId)) {
        res.json({});
    } else {
        res.sendStatus(404);
    }
});
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const stripe = new Stripe('sk_test_51QPtVVFTT9Sko1HY73df2CBy2aP5oGwQTop1bsT9kEuqZr8SeWsgnlpVqHKc9jXSbmEpMaSirYKnGKFSh9yPhQmP005MZ90xoR'); // Replace with your actual Stripe Secret Key

app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a Payment Intent
app.post('/create-payment-intent', async (req, res) => {
    let { amount, currency } = req.body; // Get the amount and currency from the client

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
        res.status(400).send({ error: 'Invalid amount.' });
        return;
    }

    amount = parseInt(amount); // Ensure amount is an integer

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in the smallest currency unit (e.g., cents for USD)
            currency,
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css'; // Import the CSS file
import { Button } from '../Button';
import Footer from '../Footer';

const stripePromise = loadStripe('pk_test_51QPtVVFTT9Sko1HYSKBUrKYK4k1syDR7MA2iNQsGYQ4uqQreeV4OKJpRykl9LPO9AYCVxTdptwOud9T0D710STK4004vxj9aUm'); // Replace with your actual Stripe Publishable Key

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [amount, setAmount] = useState('');

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        if (!amount || isNaN(amount) || amount <= 0) {
            setErrorMessage('Please enter a valid amount.');
            return;
        }

        // Convert amount to cents (assuming USD)
        const amountInCents = Math.round(amount * 100);

        // Create Payment Intent
        let clientSecret = '';

        try {
            const response = await fetch('http://localhost:3001/create-payment-intent', { // Update the URL if needed
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amountInCents, currency: 'usd' }),
            });

            const data = await response.json();

            if (response.ok) {
                clientSecret = data.clientSecret;
            } else {
                throw new Error(data.error || 'Failed to create payment intent.');
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setErrorMessage('Error creating payment intent.');
            return;
        }

        // Confirm Card Payment
        const card = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setErrorMessage('');
            setSuccessMessage('Payment successful!');
            console.log('Payment Intent:', paymentIntent);
        }
    };

    return (
        <div className="payment-form-container">
            <h1>Secure Payment</h1>
            <form onSubmit={handlePayment}>
                {errorMessage && <div className="payment-error">{errorMessage}</div>}
                {successMessage && <div className="payment-success">{successMessage}</div>}
                <input
                    type="number"
                    placeholder="Enter amount in USD"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <CardElement />
                <Button type="submit" disabled={!stripe}>Pay ${amount || ''}</Button>
            </form>
        </div>
    );
}

function DisplayStripe() {
    return (
        <>
            <div className="center-container"> {/* Centering container */}
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </div>
            <Footer />
        </>
    );
}

export default DisplayStripe;

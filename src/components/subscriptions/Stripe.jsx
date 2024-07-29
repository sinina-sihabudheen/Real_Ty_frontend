import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './tailwind.output.css'; // Ensure you import your tailwind CSS

const stripePromise = loadStripe('your_stripe_publishable_key');

const SubscriptionForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('monthly');
    const [paymentPlan, setPaymentPlan] = useState('premium');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        const response = await fetch('/payments/create-subscription/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value, // Adjust for your CSRF setup
            },
            body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                subscription_type: subscriptionType,
                payment_plan: paymentPlan,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Subscription created:', result);
        } else {
            console.error('Subscription creation failed:', result);
            setErrorMessage(result.error || 'Subscription creation failed.');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Subscribe to a Plan</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Subscription Type</label>
                <select
                    value={subscriptionType}
                    onChange={(e) => setSubscriptionType(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Payment Plan</label>
                <select
                    value={paymentPlan}
                    onChange={(e) => setPaymentPlan(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Card Details</label>
                <div className="p-2 border border-gray-300 rounded-md">
                    <CardElement />
                </div>
            </div>

            {errorMessage && (
                <div className="mb-4 text-red-500">{errorMessage}</div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
                {loading ? 'Processing...' : 'Subscribe'}
            </button>
        </form>
    );
};

const App = () => (
    <Elements stripe={stripePromise}>
        <SubscriptionForm />
    </Elements>
);

export default App;

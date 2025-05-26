// pages/api/checkout_sessions.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const items = {
  '1': 'prod_SNfTDkHkxazsHn',
  '2': 'prod_SNfU1bc692Zwl8',
  '3' : 'prod_SNfUMqq0Pxav2p',
  '4':'prod_SNfUBwlhM7bZWP',
  '5':'prod_SNfVoHt8FGY3Zn',
  '6':'prod_SNfVSb45a5MuBp',
  '7':'prod_SNfVn1dZmJL62F',
  '8':'prod_SNfW3xKGAmuvxM',
  '9':'prod_SNfXWfUjzqoiB9',
  '10':'prod_SNfXl8vc0wBESZ',
  '11':'prod_SNfXfthGkCgjAR',
  '12':'prod_SNfYiIvl8j3loY',
  '13':'prod_SNfdehmcs3LI7T',
  '14':'prod_SNfd9aYNJqrIGB',
  '15':'prod_SNfexftrFTfDI4',
  '16':'prod_SNfetpXcpJnyK7',
  '17':'prod_SNfegBnmYIa5jw',
  '18':'prod_SNfeYlI6VQ28dF',
  '19':'prod_SNfgS3rQjmNmkw',
  '20':'prod_SNfgDPCCJYGdlp',
  '21':'prod_SNfhTRGINMAadz',
  '22':'prod_SNfhqos8amIFR8',
  '23':'prod_SNfh82QJ9qbtMT',
  '24':'prod_SNfhr4a0Tt136S',
  '25':'prod_SNfiYDcdQi7as2',
  '26':'prod_SNfiyjsZOqMkzB'

}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cartItems } = req.body;

      const lineItems = cartItems.map((item) => ({
        price: items[item.id], // Use the actual Stripe Price ID
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
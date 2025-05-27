// pages/api/checkout_sessions.js
'use server'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../stripeSetup/stripe'
const items = {
  '1': 'price_1RSu8ECLu6IA0uJm20v36YyC',
  '2': 'price_1RSu9CCLu6IA0uJmTh2gqwE7',
  '3' : 'price_1RSu9UCLu6IA0uJmUFU7qfjp',
  '4':'price_1RSu9tCLu6IA0uJmFwAAkpK6',
  '5':'price_1RSuAECLu6IA0uJmVsd1PugM',
  '6':'price_1RSuASCLu6IA0uJmJUjhpQLq',
  '7':'price_1RSuAkCLu6IA0uJmjsjQTwnd',
  '8':'price_1RSuAyCLu6IA0uJmgrlt0aN1',
  '9':'price_1RSuC2CLu6IA0uJm6IB72ESK',
  '10':'price_1RSuCNCLu6IA0uJmXUs5xo9J',
  '11':'price_1RSuCgCLu6IA0uJmqJV8A9L6',
  '12':'price_1RSuD3CLu6IA0uJmfviLA8ZE',
  '13':'price_1RSuINCLu6IA0uJmHT5TjLQv',
  '14':'price_1RSuIZCLu6IA0uJmnqVP22mR',
  '15':'price_1RSuImCLu6IA0uJm5BB8sarV',
  '16':'price_1RSuJ2CLu6IA0uJm5UUDFP2a',
  '17':'price_1RSuJKCLu6IA0uJmK4eXfqHJ',
  '18':'price_1RSuJdCLu6IA0uJmSrMZlbkG',
  '19':'price_1RSuLKCLu6IA0uJmsnVwbpT8',
  '20':'price_1RSuLWCLu6IA0uJmoSSJkM4Y',
  '21':'price_1RSuLmCLu6IA0uJm2NYYKkvp',
  '22':'price_1RSuM0CLu6IA0uJmlphS6Rl4',
  '23':'price_1RSuMJCLu6IA0uJmlJSLYyUv',
  '24':'price_1RSuMVCLu6IA0uJmO9vgFGq3',
  '25':'price_1RSuMkCLu6IA0uJmtrB9G8pH',
  '26':'price_1RSuNBCLu6IA0uJmkmBOxiYi'
}

export async function POST(request) {
  try {
      const jsonData = await request.json();
      const headersList = await headers()
      const origin = headersList.get('origin')
  
      const cartItems = jsonData;
  
      const lineItems = cartItems.map((item) => {
        if (!items[item.id]) {
          throw new Error(`Invalid product ID: ${item.id}`);
        }
        return {
          price: items[item.id],
          quantity: 1,
        };
      });
  npm 
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${origin}/pages/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      });
  
      return NextResponse.json(session);
    } catch (err) {
      console.error('Error creating checkout session:', err);
      return NextResponse.json(
        { error: err.message },
        { status: err.status || 500 },
      )
    }
}
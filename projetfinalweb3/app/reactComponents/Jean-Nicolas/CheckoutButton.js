'use client'// pages/checkout.js
import { useRouter } from "next/navigation"

export default function Checkout({cartItems}) {
  const router = useRouter();

  const handleCheckout = async () => {
    const response = await fetch('pages/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    console.log(response)
    if (response.ok) {
      router.push(response.url);
    } else {
      console.error('Checkout failed');
      console.log(response)
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
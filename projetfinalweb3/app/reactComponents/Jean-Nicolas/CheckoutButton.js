'use client'// pages/checkout.js
import { useRouter } from "next/navigation"

export default function Checkout({ cartItems }) {
  const router = useRouter();

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();

    if (data.url) {
      router.push(data.url);
    } else {
      console.error('Checkout failed');
    }
  };

  return (
    <div>
      {/* Display cart items */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
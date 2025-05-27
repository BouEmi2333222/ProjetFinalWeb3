'use client'// pages/checkout.js
import { useRouter } from "next/navigation"
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/carte.css"

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
      const checkoutSession = await response.json();
      router.push(checkoutSession.url);
    } else {
      console.error('Checkout failed');
      console.log(response)
    }
  };
  return (
    <div className="w-100 d-flex justify-content-center cs-component-div">
      <button onClick={handleCheckout} className="w-25 cs-carte-button">Checkout</button>
    </div>
  );
}
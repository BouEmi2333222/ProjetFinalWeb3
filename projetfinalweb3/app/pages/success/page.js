import { redirect } from 'next/navigation'

import { stripe } from '../api/lib/stripe'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/carte.css"


export default async function Success({ searchParams }) {

  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success" className='cs-employe-div'>
        <div className="cs-success-div">
          <p>
            We appreciate your business! A confirmation email will be sent to{' '}
            {customerEmail}. If you have any questions, please email{' '}
          </p>
          <a href="mailto:boucharde64@gmail.com">boucharde64@gmail.com</a>.
        </div>
      </section>
    )
  }
}
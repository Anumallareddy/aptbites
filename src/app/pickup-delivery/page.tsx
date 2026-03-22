import Link from 'next/link'

export default function PickupDeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Pickup & Delivery
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
            Need something from another store? We can pick it up and deliver it to your apartment.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">How it works</h2>
          <div className="space-y-3 text-gray-700">
            <p>1. Send the store name and item list.</p>
            <p>2. Share your apartment number and preferred delivery time.</p>
            <p>3. We confirm the fee and delivery window.</p>
            <p>4. We pick it up and deliver it to you.</p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-xl font-bold text-gray-800">Pricing</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Nearby pickup:</strong> starts at $5
              </p>
              <p>
                <strong>Longer or larger trips:</strong> $8 and up
              </p>
              <p className="text-sm text-gray-500">
                Final pricing depends on distance, wait time, and order size.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-xl font-bold text-gray-800">Best for</h3>
            <div className="space-y-2 text-gray-700">
              <p>Snacks and drinks</p>
              <p>Household essentials</p>
              <p>Small grocery orders</p>
              <p>Quick errands</p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-8">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Request Format</h3>
          <div className="whitespace-pre-line rounded-lg border border-blue-100 bg-white p-4 text-gray-700">
{`Pickup Request

Store:
Items needed:
Already paid: Yes / No
Apartment number:
Preferred delivery time:
Notes:`}
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-white p-8 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Notes</h3>
          <div className="space-y-3 text-gray-700">
            <p>Advance payment may be required for some orders.</p>
            <p>Service is currently limited to nearby stores and apartment-area delivery.</p>
            <p>Large, restricted, or special items may not be accepted.</p>
          </div>
        </div>

        <div className="rounded-xl bg-primary p-8 text-center text-white shadow-lg">
          <h3 className="mb-4 text-2xl font-bold">Ready to request pickup?</h3>
          <p className="mb-6 text-lg text-white/90">
            Send your store name, item list, and apartment number through Instagram or email.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://www.instagram.com/aptbites/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-primary transition hover:bg-gray-100"
            >
              Request via Instagram
            </a>

            <a
              href="mailto:getaptbites@gmail.com?subject=Pickup%20Delivery%20Request"
              className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary"
            >
              Request via Email
            </a>
          </div>

          <div className="mt-6">
            <Link
              href="/products"
              className="text-white/90 underline underline-offset-4 hover:text-white"
            >
              Or browse AptBites products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
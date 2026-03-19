import Link from 'next/link'

export default function PickupDeliveryPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Local Pickup & Delivery
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Need something from another store? AptBites can pick it up and deliver it to your apartment.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How it works
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>1. Send us the store name and item list.</p>
            <p>2. Tell us your apartment number and preferred delivery time.</p>
            <p>3. We confirm the pickup fee and delivery window.</p>
            <p>4. We pick it up and deliver it to your apartment.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pricing</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Nearby pickup:</strong> starts at $5</p>
              <p><strong>Larger or longer trips:</strong> $8 and up</p>
              <p className="text-sm text-gray-500">
                Final fee depends on distance, wait time, and order size.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Best for</h3>
            <div className="space-y-2 text-gray-700">
              <p>Snacks and drinks</p>
              <p>Household essentials</p>
              <p>Small grocery or convenience orders</p>
              <p>Quick apartment errands</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Send this request format
          </h3>
          <div className="bg-white rounded-lg p-4 border border-blue-100 text-gray-700 whitespace-pre-line">
{`Pickup Request

Store:
Items needed:
Already paid: Yes / No
Apartment number:
Preferred delivery time:
Notes:`}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Important notes
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>Orders may require advance payment if items are not already purchased.</p>
            <p>Pickup service is currently for nearby stores and apartment-area delivery only.</p>
            <p>Large, restricted, or special items may not be accepted.</p>
          </div>
        </div>

        <div className="bg-primary text-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to request pickup?
          </h3>
          <p className="text-lg text-white/90 mb-6">
            Send your store name, item list, and apartment number through Instagram or email.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.instagram.com/aptbites/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Request via Instagram
            </a>

            <a
              href="mailto:getaptbites@gmail.com?subject=Pickup%20Delivery%20Request"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              Request via Email
            </a>
          </div>

          <div className="mt-6">
            <Link
              href="/products"
              className="underline underline-offset-4 text-white/90 hover:text-white"
            >
              Or browse AptBites products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
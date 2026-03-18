export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <img
            src="/logo.png"
            alt="AptBites Logo"
            className="mx-auto w-40 h-40 object-contain mb-4"
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About AptBites</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple apartment community delivery store for everyday snacks, drinks,
            and essentials.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            A simple delivery store built for apartment living
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            AptBites is a simple community delivery store for everyday snacks, drinks,
            and essentials. Instead of driving to a store, you can order from inside
            your apartment and get items delivered right to your door.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            We are starting within our own apartment community and focusing on fast,
            reliable service. Order through Instagram, text, or email, choose your
            delivery time, and get what you need without leaving your building.
          </p>
          <p className="text-lg text-gray-700">
            Available items include drinks, snacks, instant food, and basic household essentials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="text-2xl font-bold mb-2">Local Delivery</h3>
            <p>
              Delivery within the apartment community with no extra fees.
              Choose a morning or evening slot based on your schedule.
            </p>
          </div>

          <div className="bg-gradient-to-br from-secondary to-primary text-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-2xl font-bold mb-2">Easy Ordering</h3>
            <p>
              Place your order in a few steps using Instagram DM, text, or email.
              Select items, share your apartment number, and we will confirm and deliver.
            </p>
          </div>

          <div className="bg-gradient-to-br from-accent to-yellow-500 text-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-3">💵</div>
            <h3 className="text-2xl font-bold mb-2">Flexible Payment</h3>
            <p>
              Pay with cash on delivery or use Zelle or Venmo.
              Choose the option that is easiest for you.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Fast Service</h3>
            <p>
              Order before 2 PM for evening delivery or before 10 PM for next morning delivery.
              Simple and reliable service within your apartment community.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Delivery Schedule</h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Morning Delivery:</strong> 8:00 AM - 10:00 AM</p>
            <p><strong>Evening Delivery:</strong> 6:00 PM - 8:00 PM</p>
            <div className="text-sm text-gray-600 mt-4 space-y-1">
              <p>Order before 2 PM for evening delivery.</p>
              <p>Order before 10 PM for next morning delivery.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Follow AptBites on Instagram</h3>
          <p className="text-gray-700 mb-6">
            Scan this QR code to follow AptBites on Instagram for updates, product posts,
            and offers.
          </p>

          <img
            src="/aptbites_qr.png"
            alt="AptBites Instagram QR"
            className="mx-auto w-64 h-64 object-contain rounded-lg mb-4"
          />

          <a
            href="https://www.instagram.com/aptbites/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary font-semibold hover:underline"
          >
            @aptbites
          </a>
        </div>

        <div className="bg-primary text-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Need something or have a request?</h3>
          <p className="text-lg mb-6">
            Reach out on Instagram for orders, product requests, or updates.
            You can also email us anytime with questions or special requests.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.instagram.com/aptbites/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Order via Instagram
            </a>

            <a
              href="mailto:getaptbites@gmail.com"
              className="inline-block border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              Email AptBites
            </a>
          </div>

          <p className="mt-6 text-sm opacity-90">
            📧 Email: getaptbites@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
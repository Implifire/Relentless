import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function Home() {
  const priceId = 'price_1YourPriceIDHere' // get from Stripe dashboard

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black">
      <div className="max-w-md w-full mx-4">
        <h1 className="text-5xl font-black text-center mb-8">RELENTLESS</h1>
        <p className="text-center text-xl mb-12">One AI That Runs Your Entire Life So You Don’t Have To</p>

        <form action="/api/checkout" method="POST" className="mb-6">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-xl rounded-xl">
            Join for $97/month
          </button>
        </form>

        <form action="/api/free-access" method="POST" className="mb-8">
          <input
            name="code"
            placeholder="Have a code? Enter here"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-4 mb-4"
          />
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-lg">
            Unlock with Code
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">Code “LI4” = free lifetime beta access</p>
      </div>
    </div>
  )
}

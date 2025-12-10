import { useState } from "react";
import { CreditCard, Check, X, Crown, Zap, Rocket } from "lucide-react";

export default function Payments() {
  const [plans] = useState([
    {
      id: 1,
      name: "Free",
      price: 0,
      features: [
        "Basic search",
        "Up to 10 watchlist items",
        "Basic statistics",
        "Limited API calls",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Pro",
      price: 29,
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Advanced search",
        "Unlimited watchlist items",
        "Advanced statistics",
        "AI Predictions",
        "Scouting packages",
        "10,000 API calls/month",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: 99,
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Everything from Pro",
        "Priority support",
        "Custom API integrations",
        "White-label options",
        "Unlimited API calls",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ]);

  const [subscription] = useState({
    plan: "Pro",
    status: "active",
    next_billing: "2025-02-15",
    payment_method: "**** **** **** 4242",
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Subscriptions & Payments</h1>
        <p className="text-gray-400">Manage your subscription and payment method</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Current Subscription */}
          <div className="card-premium p-6 mb-6 border-2 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Current Subscription</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-semibold text-white">{subscription.plan}</span>
                  <span className="px-3 py-1 bg-[#2a2a2a] text-sky-300 rounded-md text-sm font-semibold border border-sky-600">
                    {subscription.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-gray-400 mt-2">
                  Next billing: {subscription.next_billing}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Payment method: {subscription.payment_method}
                </p>
              </div>
              <button className="btn-secondary">Manage subscription</button>
            </div>
          </div>

          {/* Pricing Plans */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`card-premium p-6 relative ${
                    plan.popular
                      ? "border-2 border-yellow-500 shadow-xl"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-50 dark:bg-yellow-900/300 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                        <Crown className="w-4 h-4 mr-1" />
                        Recommended
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    {plan.icon && (
                      <div className="w-12 h-12 mx-auto mb-3 text-gray-400">
                        {plan.icon}
                      </div>
                    )}
                    <h3 className="text-2xl font-semibold mb-2 text-white">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-semibold text-white">€{plan.price}</span>
                      {plan.price > 0 && (
                        <span className="text-gray-400 ml-2">/month</span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {plan.price === 0 ? "Current plan" : "Select plan"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


import {
    Ticket,
    CheckCircle,
    Clock,
    XCircle,
    Wallet,
  } from "lucide-react";
  
  const cards = [
    {
      title: "Total Bookings",
      value: "1,248",
      change: "+12.5%",
      icon: Ticket,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Confirmed",
      value: "992",
      change: "+10.3%",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending",
      value: "156",
      change: "+8.1%",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Cancelled",
      value: "100",
      change: "-3.4%",
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Total Revenue",
      value: "Rs 1,248,550",
      change: "+14.6%",
      icon: Wallet,
      color: "bg-purple-100 text-purple-600",
    },
  ];
  
  export default function BookingCards() {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
  
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow-sm border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="text-xl font-semibold mt-1">
                    {card.value}
                  </h3>
                  <p className="text-green-500 text-sm mt-1">
                    {card.change} this month
                  </p>
                </div>
  
                <div
                  className={`p-3 rounded-lg ${card.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
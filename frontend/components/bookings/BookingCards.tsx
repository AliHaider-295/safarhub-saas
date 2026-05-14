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
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-blue-600",
    },
    {
      title: "Confirmed",
      value: "992",
      change: "+10.3%",
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-600",
    },
    {
      title: "Pending",
      value: "156",
      change: "+8.1%",
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      valueColor: "text-amber-600",
    },
    {
      title: "Cancelled",
      value: "100",
      change: "-3.4%",
      icon: XCircle,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      valueColor: "text-rose-600",
    },
    {
      title: "Total Revenue",
      value: "Rs 1,248,550",
      change: "+14.6%",
      icon: Wallet,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
    },
  ];
  
  export default function BookingCards() {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
  
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
  
                {/* TEXT CONTENT */}
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {card.title}
                  </p>
  
                  <h3
                    className={`text-lg font-semibold mt-1 ${card.valueColor}`}
                  >
                    {card.value}
                  </h3>
  
                  <p
                    className={`text-xs mt-1 font-medium ${
                      card.change.startsWith("+")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {card.change} this month
                  </p>
                </div>
  
                {/* ICON */}
                <div
                  className={`
                    ${card.iconBg}
                    ${card.iconColor}
                    p-2.5
                    rounded-lg
                  `}
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
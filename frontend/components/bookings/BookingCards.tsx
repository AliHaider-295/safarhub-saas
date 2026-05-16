import {
  Ticket,
  CheckCircle,
  Clock,
  XCircle,
  Wallet,
} from "lucide-react";

type BookingStats = {
  totalBookings: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  revenue: number;
};

type Props = {
  stats?: BookingStats | null;
};

export default function BookingCards({ stats }: Props) {

  const data = stats ?? {
    totalBookings: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0,
  };

  const cards = [
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: Ticket,
    },
    {
      title: "Confirmed",
      value: data.confirmed,
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: data.pending,
      icon: Clock,
    },
    {
      title: "Cancelled",
      value: data.cancelled,
      icon: XCircle,
    },
    {
      title: "Total Revenue",
      value: `Rs ${data.revenue}`,
      icon: Wallet,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{card.title}</p>
                <h3 className="text-lg font-semibold mt-1">
                  {card.value}
                </h3>
              </div>

              <div className="p-2.5 rounded-lg bg-gray-50">
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
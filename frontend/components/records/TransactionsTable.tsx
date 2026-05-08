"use client";

type Transaction = {
  id: string;

  type: string;
  category: string;

  amount: number;

  paymentMethod?: string;
  description?: string;

  date: string;

  bus?: {
    busNumber?: string;
    bus_number?: string;
    number?: string;
  };

  route?: {
    from?: string;
    to?: string;
    start?: string;
    end?: string;
  };
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionsTable({
  transactions,
}: Props) {

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      {/* TABLE HEADER */}
      <div className="p-5 border-b">

        <h2 className="text-lg font-semibold">
          Recent Transactions
        </h2>

      </div>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (

        <div className="p-10 text-center text-gray-500">
          No transactions found
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b">

              <tr className="text-left">

                <th className="p-4 font-medium">
                  Date
                </th>

                <th className="p-4 font-medium">
                  Type
                </th>

                <th className="p-4 font-medium">
                  Category
                </th>

                <th className="p-4 font-medium">
                  Amount
                </th>

                <th className="p-4 font-medium">
                  Bus
                </th>

                <th className="p-4 font-medium">
                  Route
                </th>

                <th className="p-4 font-medium">
                  Payment
                </th>

                <th className="p-4 font-medium">
                  Description
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* DATE */}
                  <td className="p-4 whitespace-nowrap">

                    {new Date(
                      transaction.date
                    ).toLocaleDateString()}

                  </td>

                  {/* TYPE */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>

                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 capitalize">

                    {transaction.category}

                  </td>

                  {/* AMOUNT */}
                  <td className="p-4 font-semibold">

                    Rs. {transaction.amount}

                  </td>

                  {/* BUS */}
                  <td className="p-4">

                    {transaction.bus?.busNumber ||
                      transaction.bus?.bus_number ||
                      transaction.bus?.number ||
                      "-"}

                  </td>

                  {/* ROUTE */}
                  <td className="p-4 whitespace-nowrap">

                    {transaction.route
                      ? `${
                          transaction.route.from ||
                          transaction.route.start ||
                          "From"
                        } → ${
                          transaction.route.to ||
                          transaction.route.end ||
                          "To"
                        }`
                      : "-"}

                  </td>

                  {/* PAYMENT */}
                  <td className="p-4 capitalize">

                    {transaction.paymentMethod || "-"}

                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-4 max-w-[250px] truncate">

                    {transaction.description || "-"}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}
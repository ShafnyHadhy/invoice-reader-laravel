export default function Index({ transactions }) {
  const items = transactions?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Transactions</h1>
            <p className="mt-1 text-sm text-gray-600">View all saved invoice transactions in one place.</p>
          </div>
          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
            {items.length} record{items.length === 1 ? '' : 's'}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[24%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Vendor</th>
                  <th className="w-[18%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Transaction Type</th>
                  <th className="w-[18%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
                  <th className="w-[14%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                  <th className="w-[10%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Currency</th>
                  <th className="w-[16%] px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {items.length > 0 ? (
                  items.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="truncate px-6 py-4 text-sm font-medium text-gray-900">{t.vendor || '-'}</td>
                      <td className="truncate text-center px-6 py-4 text-sm text-gray-700">{t.transaction_type || '-'}</td>
                      <td className="truncate text-center px-6 py-4 text-sm text-gray-700">{t.category || '-'}</td>
                      <td className="whitespace-nowrap text-center px-6 py-4 text-sm text-gray-700">{t.transaction_date || '-'}</td>
                      <td className="whitespace-nowrap text-center px-6 py-4 text-sm text-gray-700">{t.currency || '-'}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        {t.total ?? '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="mx-auto max-w-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                          ☐
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">No transactions yet</h2>
                        <p className="mt-2 text-sm text-gray-500">
                          Saved transactions will appear here after extraction and saving.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

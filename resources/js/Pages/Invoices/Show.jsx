import React from 'react';
import { useForm, router } from '@inertiajs/react';

export default function Show({ invoice }) {
  const extracted = invoice.extracted_data || {};

  const { data, setData, put, processing, errors } = useForm({
    vendor: extracted.vendor || '',
    invoice_date: extracted.invoice_date || '',
    currency: extracted.currency || '',
    subtotal: extracted.subtotal || '',
    tax: extracted.tax || '',
    total: extracted.total || '',
    transaction_type: extracted.transaction_type || 'expense',
    category: extracted.category || '',
    line_items: extracted.line_items || [],
  });

  const extract = () => {
    router.post(`/invoices/${invoice.id}/extract`);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    put(`/invoices/${invoice.id}/extracted-data`);
  };

  const saveTransaction = () => {
    router.post(`/invoices/${invoice.id}/save-transaction`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Invoice Details</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{invoice.title}</h1>
            <p className="mt-2 text-sm text-gray-600">
              Review extracted data, make edits, and save the invoice as a transaction.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={extract}
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Extract with Gemini
            </button>

            <button
              onClick={saveTransaction}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save as Transaction
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Extracted Information</h2>
                <p className="mt-1 text-sm text-gray-600">Edit the fields below before saving.</p>
              </div>
            </div>

            <form onSubmit={saveChanges} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Vendor</label>
                <input
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={data.vendor}
                  onChange={(e) => setData('vendor', e.target.value)}
                />
                {errors.vendor && <div className="mt-2 text-sm text-red-600">{errors.vendor}</div>}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Invoice Date</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.invoice_date}
                    onChange={(e) => setData('invoice_date', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Currency</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.currency}
                    onChange={(e) => setData('currency', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Subtotal</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.subtotal}
                    onChange={(e) => setData('subtotal', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Tax</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.tax}
                    onChange={(e) => setData('tax', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Total</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.total}
                    onChange={(e) => setData('total', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Transaction Type</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.transaction_type}
                    onChange={(e) => setData('transaction_type', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-200 pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Invoice Summary</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
                  <dt className="text-gray-500">File</dt>
                  <dd className="text-right font-medium text-gray-900">{invoice.original_name || '-'}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
                  <dt className="text-gray-500">Type</dt>
                  <dd className="text-right font-medium text-gray-900">{invoice.mime_type || '-'}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
                  <dt className="text-gray-500">Size</dt>
                  <dd className="text-right font-medium text-gray-900">
                    {invoice.file_size ? `${(invoice.file_size / 1024).toFixed(1)} KB` : '-'}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="text-right font-medium text-green-600">Ready</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Line Items</h2>
              <div className="mt-4 space-y-3">
                {Array.isArray(data.line_items) && data.line_items.length > 0 ? (
                  data.line_items.map((item, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
                      <div className="font-medium text-gray-900">{item.description || 'Item'}</div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-gray-600">
                        <span>Qty: {item.quantity ?? '-'}</span>
                        <span>Unit: {item.unit_price ?? '-'}</span>
                        <span>Amt: {item.amount ?? '-'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
                    No line items extracted yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

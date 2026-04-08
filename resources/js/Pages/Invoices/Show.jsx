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
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="text-2xl font-semibold text-gray-900">{invoice.title}</h1>

      <button
        onClick={extract}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm mt-4"
      >
        Extract with Gemini
      </button>

      <button
        onClick={saveTransaction}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm ml-2"
      >
        Save as Transaction
      </button>

      <form onSubmit={saveChanges} style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label>Vendor</label>
          <input
            className="w-full border p-2"
            value={data.vendor}
            onChange={(e) => setData('vendor', e.target.value)}
          />
          {errors.vendor && <div>{errors.vendor}</div>}
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Invoice Date</label>
          <input
            type="date"
            className="w-full border p-2"
            value={data.invoice_date}
            onChange={(e) => setData('invoice_date', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Currency</label>
          <input
            className="w-full border p-2"
            value={data.currency}
            onChange={(e) => setData('currency', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Subtotal</label>
          <input
            type="number"
            step="0.01"
            className="w-full border p-2"
            value={data.subtotal}
            onChange={(e) => setData('subtotal', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Tax</label>
          <input
            type="number"
            step="0.01"
            className="w-full border p-2"
            value={data.tax}
            onChange={(e) => setData('tax', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Total</label>
          <input
            type="number"
            step="0.01"
            className="w-full border p-2"
            value={data.total}
            onChange={(e) => setData('total', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Transaction Type</label>
          <input
            className="w-full border p-2"
            value={data.transaction_type}
            onChange={(e) => setData('transaction_type', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Category</label>
          <input
            className="w-full border p-2"
            value={data.category}
            onChange={(e) => setData('category', e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm mt-4"
        >
          {processing ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    file: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post('/invoices', {
      forceFormData: true,
      onSuccess: () => reset('title', 'file'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-gray-500">Invoice Upload</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Create New Invoice</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload an invoice image to extract details and save it for processing.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Upload Details</h2>
            <p className="mt-1 text-sm text-gray-600">Fill in the title and attach an invoice file.</p>
          </div>

          <form onSubmit={submit} encType="multipart/form-data" className="space-y-6 px-6 py-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Invoice Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="e.g. Office supplies invoice"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
              {errors.title && <div className="mt-2 text-sm text-red-600">{errors.title}</div>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Invoice File</label>
              <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition hover:border-green-400 hover:bg-green-50/40">
                <input
                  type="file"
                  onChange={(e) => setData('file', e.target.files[0])}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-700"
                />
                <p className="mt-3 text-xs text-gray-500">Accepted formats: JPG, JPEG, PNG, PDF</p>
              </div>
              {errors.file && <div className="mt-2 text-sm text-red-600">{errors.file}</div>}
            </div>

            <div className="flex items-center justify-end border-t border-gray-200 pt-4">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing ? 'Uploading...' : 'Upload Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

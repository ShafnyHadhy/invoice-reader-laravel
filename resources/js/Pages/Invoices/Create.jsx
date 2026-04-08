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
    <div className=" mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-900">Upload Invoice</h1>

      <form onSubmit={submit} encType="multipart/form-data" className="mt-6 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Invoice Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
          {errors.title && <div className="mt-2 text-sm text-red-600">{errors.title}</div>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Invoice File</label>
          <input
            type="file"
            onChange={(e) => setData('file', e.target.files[0])}
            className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
          />
          {errors.file && <div className="mt-2 text-sm text-red-600">{errors.file}</div>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm"
        >
          {processing ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

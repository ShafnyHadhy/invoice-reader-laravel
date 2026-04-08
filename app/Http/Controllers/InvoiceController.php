<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Transaction;
use App\Services\GeminiInvoiceExtractor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function create()
    {
        return Inertia::render('Invoices/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $file = $request->file('file');
        $path = $file->store('invoices', 'public');

        $invoice = Invoice::create([
        'title' => $validated['title'],
        'file_path' => $path,
        'original_name' => $file->getClientOriginalName(),
        'mime_type' => $file->getMimeType(),
        'file_size' => $file->getSize(),
    ]);

        return redirect()->route('invoices.show', $invoice);
    }

    public function show(Invoice $invoice)
    {
        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice->fresh(),
        ]);
    }

    public function extract(Invoice $invoice, GeminiInvoiceExtractor $extractor)
    {
        $data = $extractor->extract($invoice);

        $invoice->update([
            'extracted_data' => $data,
            'extracted_at' => now(),
        ]);

        return redirect()->route('invoices.show', $invoice->id);
    }

    public function saveAsTransaction(Invoice $invoice)
    {
        $data = $invoice->extracted_data;

        if (!$data) {
            return back()->with('error', 'No extracted data found.');
        }

        Transaction::updateOrCreate(
            ['invoice_id' => $invoice->id],
            [
                'vendor' => $data['vendor'] ?? null,
                'transaction_date' => $data['invoice_date'] ?? null,
                'currency' => $data['currency'] ?? null,
                'subtotal' => $data['subtotal'] ?? null,
                'tax' => $data['tax'] ?? null,
                'total' => $data['total'] ?? null,
                'transaction_type' => $data['transaction_type'] ?? null,
                'category' => $data['category'] ?? null,
                'line_items' => $data['line_items'] ?? null,
            ]
        );

        return redirect()->route('transactions.index')->with('success', 'Saved as transaction.');
    }

    public function updateExtractedData(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'vendor' => ['nullable', 'string', 'max:255'],
            'invoice_date' => ['nullable', 'date'],
            'currency' => ['nullable', 'string', 'max:10'],
            'subtotal' => ['nullable', 'numeric'],
            'tax' => ['nullable', 'numeric'],
            'total' => ['nullable', 'numeric'],
            'transaction_type' => ['nullable', 'string', 'max:50'],
            'category' => ['nullable', 'string', 'max:255'],
            'line_items' => ['nullable', 'array'],
        ]);

        $invoice->update([
            'extracted_data' => $validated,
        ]);

        return back()->with('success', 'Extracted data updated.');
    }
}

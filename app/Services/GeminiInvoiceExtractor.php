<?php

namespace App\Services;

use App\Models\Invoice;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class GeminiInvoiceExtractor
{
    public function extract(Invoice $invoice): array
    {
        $apiKey = config('services.gemini.key');

        if (!$apiKey) {
            throw new RuntimeException('Gemini API key is missing.');
        }

        $absolutePath = Storage::disk('public')->path($invoice->file_path);

        if (!file_exists($absolutePath)) {
            throw new RuntimeException('Invoice file not found.');
        }

        if (filesize($absolutePath) > 10 * 1024 * 1024) {
            throw new RuntimeException('File too large. Use a smaller image.');
        }

        $mimeType = $invoice->mime_type ?: mime_content_type($absolutePath);
        $content = file_get_contents($absolutePath);

        $prompt = <<<PROMPT
Extract invoice details from this document and return ONLY valid JSON with this shape:
{
  "vendor": "",
  "invoice_date": "YYYY-MM-DD",
  "currency": "",
  "subtotal": 0,
  "tax": 0,
  "total": 0,
  "transaction_type": "expense",
  "category": "",
  "line_items": [
    {
      "description": "",
      "quantity": 1,
      "unit_price": 0,
      "amount": 0
    }
  ]
}

Rules:
- Return only JSON
- Use null for unknown fields
- Do not add extra text
PROMPT;

        $response = Http::withoutVerifying()->post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}",
            [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt],
                            [
                                'inlineData' => [
                                    'mimeType' => $mimeType,
                                    'data' => base64_encode($content),
                                ],
                            ],
                        ],
                    ],
                ],
                'generationConfig' => [
                    'temperature' => 0,
                    'responseMimeType' => 'application/json',
                ],
            ]
        );

        if (!$response->successful()) {
            throw new RuntimeException('Gemini request failed: ' . $response->body());
        }

        $text = $response->json('candidates.0.content.parts.0.text');
        logger()->info('Gemini raw text', ['text' => $text]);
        $decoded = json_decode($text, true);

        if (!is_array($decoded)) {
            throw new RuntimeException('Invalid JSON returned by Gemini.');
        }

        return $decoded;
    }
}

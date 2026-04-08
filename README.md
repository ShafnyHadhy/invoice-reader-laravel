# Invoice Reader

Invoice Reader is a Laravel application for uploading invoice files, extracting invoice data with Google Gemini, and saving the results as structured transactions.

## Features

- Upload invoice images
- Extract invoice details using Gemini AI
- Review extracted data
- Save extracted records as transactions
- View transactions in a clean dashboard

## Tech Stack

- Laravel
- Inertia.js
- React
- MySQL
- Tailwind CSS
- Google Gemini API

## Setup

```bash
composer install
npm install
php artisan migrate
php artisan storage:link
```

Add your environment variables in `.env`, including:

- `DB_*`
- `GEMINI_API_KEY`

## Run the Project

```bash
php artisan serve
npm run dev
```

## License

This project is open source and available under the MIT license.

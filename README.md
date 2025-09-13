# Mini CRM Frontend

A React-based frontend for the Mini CRM Platform with customer segmentation and campaign management.

## Features

- Google OAuth Authentication
- Dynamic Audience Segmentation
- Real-time Campaign Analytics
- Modern UI 

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AjaiTiwarii/Mini-CRM-Backend.git
   cd Mini-CRM-Backend
   ```

2. Install dependencies:
```bash
npm install
```

3. Setup shadcn/ui components:
```bash
npx shadcn-ui@latest add button input card dialog
```

4. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

5. Start development server:
```bash
npm run dev
```

## Tech Stack

- React 18 + TypeScript
- Vite for fast development
- TailwindCSS + shadcn/ui


## Environment Variables

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `VITE_APP_NAME` - Application name

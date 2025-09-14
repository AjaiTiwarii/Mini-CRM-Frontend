# Mini CRM Frontend

A modern customer relationship management system built with React and TypeScript, featuring AI-powered campaign insights, customer segmentation, and comprehensive analytics.

## Features

### Core Functionality
- **Customer Management** - Add, view, and manage customer profiles with order history
- **Smart Segmentation** - Create dynamic customer segments using flexible rule-based criteria
- **Campaign Management** - Launch and track marketing campaigns with real-time analytics
- **AI-Powered Insights** - Get intelligent campaign analysis powered by Gemini
- **Real-time Analytics** - Comprehensive dashboard with key business metrics

### Authentication & Security
- Google OAuth integration for secure login
- Protected routes and session management
- Token-based authentication with automatic refresh

### AI Features
- Automated campaign insights generation
- Performance analysis and recommendations
- Gemini-powered text analysis

## Tech Stack

- **React 18** - Modern React with functional components
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started
### Prerequisites
- Node.js 16+ 
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mini-crm.git
   cd mini-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Campaign/        # Campaign-related components
│   ├── Data/            # Data management components
│   ├── Layout/          # Layout and navigation
│   ├── Segment/         # Customer segmentation
│   └── ui/              # Base UI components (shadcn/ui)
├── hooks/               # Custom React hooks
│   ├── useApi.ts        # API interaction hooks
│   └── useAuth.ts       # Authentication logic
├── pages/               # Route components/pages
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Login.tsx        # Authentication page
│   ├── CreateSegment.tsx # Segment creation
│   ├── CampaignHistory.tsx # Campaign listing
│   └── CampaignDetails.tsx # Campaign analytics
├── services/            # External service integrations
│   └── api.ts           # API client and endpoints
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

### Environment Variables

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `VITE_APP_NAME` - Application name


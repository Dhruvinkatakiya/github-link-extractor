# GitInsight - GitHub Link Extractor

GitInsight is a powerful tool that extracts and analyzes GitHub profiles from resumes, providing detailed developer insights and analytics.

## Features

### 1. Resume Analysis
- Upload PDF resumes securely
- Automatic GitHub profile link extraction
- Support for direct GitHub profile URL input

### 2. Developer Analytics
- Comprehensive GitHub profile analysis
- Repository statistics and metrics
- Contribution activity tracking
- Language usage breakdown
- Project impact assessment

### 3. Smart Insights
- AI-powered analysis of:
  - Code contributions
  - Repository engagement
  - Development patterns
  - Technical expertise

### 4. Real-time Processing
- Instant results display
- Interactive data visualization
- Secure data handling
- Mobile-responsive design

## Tech Stack

- **Frontend**: Next.js 13+ (App Router)
- **UI Libraries**: 
  - TailwindCSS
  - Framer Motion
  - Lucide React Icons
- **PDF Processing**: PDF.js
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-link-extractor.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your GitHub token:
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
github-link-extractor/
├── app/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── Navbar.tsx
│   │   └── Notification.tsx
│   ├── validate/
│   │   └── page.tsx
│   └── page.tsx
├── public/
├── styles/
└── package.json
```

## Configuration

### GitHub Token
To enable all features, add a GitHub personal access token to `.env.local`:
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

### Build Configuration
The project uses Next.js with custom TailwindCSS configuration:
```typescript
// next.config.js
module.exports = {
  // ... configuration
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
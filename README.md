# GitInsight - GitHub Link Extractor

GitInsight is a powerful web application that extracts and analyzes GitHub profiles from resumes, providing detailed developer insights and analytics. Transform static resumes into dynamic developer portfolios with comprehensive GitHub data visualization.

## ✨ Features

### 📄 Resume Analysis
- **PDF Upload**: Securely upload PDF resumes (up to 10MB)
- **Smart Extraction**: Automatic GitHub profile link detection from text and annotations
- **Direct URL Input**: Support for manual GitHub profile URL entry

### 📊 Developer Analytics
- **Profile Overview**: Complete GitHub profile information including bio, location, company
- **Repository Statistics**: Detailed metrics for stars, forks, and repository activity
- **Contribution Tracking**: Recent activity and contribution history
- **Language Breakdown**: Programming language usage statistics with visual charts
- **Social Links**: Automatic detection and display of LinkedIn, Twitter, email, and other profiles

### 🧠 Smart Insights
- **Smart Analysis**: Intelligent assessment of development patterns and expertise
- **Repository Filtering**: Advanced filtering by language, type (sources/forks/archived), and sorting options
- **Activity Timeline**: Recent GitHub events and contributions
- **Contribution Calendar**: Total contributions with optional GitHub token for exact data

### ⚡ Real-time Processing
- **Instant Results**: Fast PDF processing and GitHub API integration
- **Interactive UI**: Smooth animations and responsive design
- **Secure Handling**: Client-side processing with no data storage
- **Mobile Optimized**: Fully responsive design for all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Processing**: PDF.js
- **Type Safety**: TypeScript
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/github-link-extractor.git
cd github-link-extractor
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Setup:**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token_here
```

> **Note**: GitHub token is optional but recommended for higher rate limits and contribution data.

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Live Demo
Visit the live application at: [https://gitinsight.dhruvinkatakiya.me/](https://gitinsight.dhruvinkatakiya.me/)

## 📁 Project Structure

```
github-link-extractor/
├── app/
│   ├── components/
│   │   ├── Footer.tsx          # Site footer component
│   │   ├── HowItWorks.tsx      # How it works section
│   │   ├── InsightsPage.tsx    # Insights preview section
│   │   ├── Navbar.tsx          # Main navigation
│   │   ├── Navbar2.tsx         # Validation page navigation
│   │   └── Notification.tsx    # Toast notifications
│   ├── validate/
│   │   └── page.tsx            # GitHub profile analysis page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## ⚙️ Configuration

### GitHub Token Setup
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with `public_repo` scope
3. Add to `.env.local`:
```env
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
```

### Next.js Configuration
The app uses custom Next.js config for image domains:
```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
```

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
```bash
git checkout -b feature/amazing-feature
```
3. **Make your changes and commit:**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to your branch:**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for all new code
- Follow existing code style and patterns
- Add proper error handling
- Test on multiple devices/browsers
- Update documentation as needed


## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing
- [GitHub API](https://docs.github.com/en/rest) for developer data
- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Made with ❤️ for developers, by developers.**

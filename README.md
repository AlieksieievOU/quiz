# Quiz Training App 🎓

An interactive multi-level quiz application built with React, Vite, and Tailwind CSS. Features gamification elements including coins, diamonds, and progressive difficulty levels.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see Analytics Setup below)

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## 📊 Analytics Setup

This app includes Google Analytics 4 (GA4) tracking to monitor:

- ❌ **Error questions** - Track which questions users answer incorrectly
- 👥 **Unique visitors** - Monitor total and returning users
- ⏱️ **Time spent on quiz** - Track engagement duration
- 🎯 **Quiz performance** - Completion rates, rewards earned, and more

### Quick Setup

1. **Create a GA4 property** at [analytics.google.com](https://analytics.google.com)
2. **Get your Measurement ID** (format: `G-XXXXXXXXXX`)
3. **Update `.env`** file:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. **Restart your dev server**

📖 **For detailed setup instructions**, see [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)  
⚡ **For quick analytics tips**, see [ANALYTICS_QUICK_REFERENCE.md](./ANALYTICS_QUICK_REFERENCE.md)

## 🎮 Features

- **Multi-level difficulty** - Progress through 3 levels
- **Gamification** - Earn coins and diamonds
- **Image support** - Visual questions with images
- **Sound effects** - Audio feedback (can be muted)
- **Responsive design** - Works on mobile and desktop
- **Progress tracking** - View errors, coins, and diamonds in real-time

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React GA4** - Analytics tracking
- **Lucide React** - Icons

## 📁 Project Structure

```
quiz/
├── src/
│   ├── components/       # React components
│   ├── constants/        # Game configuration
│   ├── data/            # Quiz questions by level
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utilities (analytics, assets, etc.)
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/
│   └── assets/          # Images, sounds, icons
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment template
└── package.json
```

## 🎯 Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📈 Monitoring & Analytics

After setting up GA4, you can track:

- Which questions are most difficult (incorrect answers)
- User engagement and retention
- Average quiz completion time
- Level progression rates
- Reward distribution

Check your Google Analytics dashboard to see real-time data and historical trends.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and not licensed for public use.

---

**Questions or issues?** Check the analytics setup guides or create an issue in the repository.

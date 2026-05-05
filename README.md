# Movie Night Picker

A fun, interactive way to decide what to watch on movie night. No more endless scrolling and debates - just swipe right on movies you like, and let the app help you find the perfect pick!

## Vision

Movie Night Picker solves the age-old problem of "What should we watch?" When friends or family gather for movie night, choosing a film often takes longer than watching it. Our app makes this process engaging and decisive:

- **Create a room** and invite friends
- **Swipe through movies** (Tinder-style) to vote on what you want to watch
- **See real-time results** as everyone's preferences are collected
- **Make a decision** based on collective tastes, not just one person's choice

Whether it's a casual Friday night or a serious film club meeting, Movie Night Picker turns the tedious decision-making process into part of the fun.

## Features

- Swipe-based movie browsing with smooth animations
- Real-time room creation and joining
- Mock data included (works without API keys)
- TMDB API integration for fresh movie data
- Responsive design for mobile and desktop
- Toast notifications for feedback

## Getting Started

### Prerequisites

- Node.js 18+ installed
- (Optional) TMDB API key for live movie data

### Installation

1. Clone the repository:
```bash
git clone https://github.com/katharina0520/movie-night-picker.git
cd movie-night-picker
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up environment variables:
   - Copy `.env.example` to `.env` (if available) or create a `.env` file
   - Add your TMDB API key: `TMDB_API_KEY=your_key_here`
   - Without an API key, the app uses built-in mock data

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3007](http://localhost:3007) in your browser

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables (DATABASE_URL, TMDB_API_KEY)
4. Deploy - your app gets a live URL instantly

For the database, we recommend:
- [Neon](https://neon.tech) (free PostgreSQL)
- [Supabase](https://supabase.com) (free tier available)

## Scripts

- `npm run dev` - Start development server on port 3007
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database GUI

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Database:** Prisma + PostgreSQL
- **Icons:** Lucide React
- **Movies API:** TMDB

## Contributing

Feel free to open issues or submit pull requests. Movie night democracy depends on all of us!

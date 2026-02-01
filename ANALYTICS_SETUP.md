# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your quiz application to track user behavior, quiz performance, and engagement metrics.

## 📊 What Gets Tracked

Your quiz application now tracks the following events:

### 1. **Error/Incorrect Answers**

- Every time a user answers a question incorrectly
- Tracks which question was answered incorrectly
- Records what answer the user selected vs. the correct answer
- Helps identify difficult questions

### 2. **Unique Visitors**

- Automatically tracked by GA4 (no additional setup needed)
- Shows total users and new vs. returning users

### 3. **Time Spent on Quiz**

- Tracks total duration from quiz start to completion (win or game over)
- Measured in seconds and reported in events

### 4. **Additional Metrics**

- Correct answers
- Level progression (when users advance to levels 2 and 3)
- Rewards earned (coins, diamonds, trophies)
- Quiz completion status (win vs. game over)
- Total errors per session

## 🚀 Setup Instructions

### Step 1: Create a Google Analytics 4 Property

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Sign in** with your Google account
3. **Create a new property** (if you don't have one):
   - Click "Admin" (gear icon in bottom left)
   - In the "Property" column, click "Create Property"
   - Enter property name (e.g., "Quiz Training App")
   - Select your timezone and currency
   - Click "Next"
   - Fill in business details (optional)
   - Click "Create"
   - Accept the Terms of Service

### Step 2: Set Up a Web Data Stream

1. In your new property, you'll be prompted to set up a data stream
2. Click **"Web"**
3. Enter your website URL (e.g., `https://yourdomain.com`)
4. Enter stream name (e.g., "Quiz App - Production")
5. Click **"Create stream"**

### Step 3: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. **Copy this ID** - you'll need it in the next step

### Step 4: Configure Your Application

1. **Create a `.env` file** in your project root (same level as `package.json`):

   ```bash
   cp .env.example .env
   ```

2. **Open `.env`** and replace the placeholder with your actual Measurement ID:

   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   ⚠️ Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID

3. **Save the file**

### Step 5: Test Your Setup (Development)

1. **Run your app locally**:

   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173` (or your dev server URL)

3. **Check Google Analytics Real-Time reports**:
   - Go to your GA4 property
   - Click "Reports" → "Realtime"
   - You should see your visit appear within 30 seconds

4. **Test quiz events**:
   - Start a quiz
   - Answer some questions (both correct and incorrect)
   - Complete or fail the quiz
   - Check the Real-Time events in GA4 to see your custom events

### Step 6: Deploy to Production

When you deploy your app to production (e.g., GitHub Pages, Netlify, Vercel):

1. **Set the environment variable** in your hosting platform:
   - **GitHub Pages**: Use GitHub Secrets and modify your build workflow
   - **Netlify**: Settings → Build & deploy → Environment → Environment variables
   - **Vercel**: Settings → Environment Variables
   - Add: `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`

2. **Redeploy your application**

3. **Verify tracking** in GA4 Real-Time reports

## 📈 Viewing Your Analytics Data

### Real-Time Reports

View live user activity:

- **Reports** → **Realtime** → See active users and current events

### Events Report

See all tracked events:

- **Reports** → **Engagement** → **Events**
- Look for custom events like:
  - `incorrect_answer`
  - `correct_answer`
  - `quiz_start`
  - `quiz_complete`
  - `quiz_duration`
  - `level_progress`
  - `reward_earned`

### Custom Reports for Error Analysis

Create a custom report to analyze error questions:

1. Go to **Explore** → **Create a blank exploration**
2. Add **Dimensions**:
   - Event name
   - Event label (this contains the question text)
3. Add **Metrics**:
   - Event count
   - Total users
4. **Filter** by event name = `incorrect_answer`
5. This shows you which questions users get wrong most often

### Session Duration Report

To see time spent on quizzes:

1. Go to **Reports** → **Engagement** → **Events**
2. Click on `quiz_duration` event
3. View the "Value" column (time in seconds)
4. Create custom report in **Explore** for detailed analysis

### User Engagement

View unique visitors and session data:

- **Reports** → **Life cycle** → **Acquisition** → **User acquisition**
- **Reports** → **Life cycle** → **Engagement** → **Overview**

## 🎯 Tracked Events Reference

| Event Name         | Description              | When Triggered                    |
| ------------------ | ------------------------ | --------------------------------- |
| `quiz_start`       | User starts a quiz       | Level splash screen appears       |
| `correct_answer`   | User answers correctly   | After checking answer (correct)   |
| `incorrect_answer` | User answers incorrectly | After checking answer (incorrect) |
| `quiz_duration`    | Total time spent         | Quiz completion (win/game over)   |
| `quiz_complete`    | Quiz finished            | Win or game over screen           |
| `quiz_stats`       | Summary statistics       | Quiz completion                   |
| `level_progress`   | Level advancement        | User reaches new level            |
| `reward_earned`    | Reward obtained          | Coin, diamond, or trophy earned   |

## 🔒 Privacy & Data Protection

- ✅ IP anonymization is enabled by default
- ✅ `.env` file is in `.gitignore` (your GA ID won't be committed to git)
- ✅ No personally identifiable information (PII) is tracked
- ✅ Only quiz interaction events are collected

## 🛠️ Troubleshooting

### Events not showing in GA4?

1. **Check your Measurement ID**: Make sure it's correct in `.env`
2. **Restart dev server**: After changing `.env`, restart with `npm run dev`
3. **Wait a few minutes**: Real-time data can take 30-60 seconds to appear
4. **Check browser console**: Look for any GA initialization errors
5. **Ad blockers**: Disable ad blockers as they may block GA tracking
6. **Browser extensions**: Some privacy extensions block analytics

### `.env` file not working?

1. Make sure the file is named exactly `.env` (not `.env.txt`)
2. The file should be in the project root directory
3. Restart your dev server after creating/modifying `.env`
4. Check that the variable starts with `VITE_` (required for Vite)

### Production build not tracking?

1. Verify environment variables are set in your hosting platform
2. Check the browser console for errors in production
3. Make sure you're viewing the correct GA4 property
4. Verify the GA4 data stream URL matches your production URL

## 📚 Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [react-ga4 Package](https://github.com/PriceRunner/react-ga4)

## 🎓 Next Steps

1. ✅ Create custom audiences based on quiz performance
2. ✅ Set up conversion goals (e.g., completing a quiz)
3. ✅ Create custom dashboards for quick insights
4. ✅ Set up email alerts for significant changes in metrics
5. ✅ Export data for deeper analysis in Google Sheets or other tools

---

**Need help?** Check the [GA4 Help Center](https://support.google.com/analytics/) or open an issue in your project repository.

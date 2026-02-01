# Google Analytics Setup Checklist ✅

Use this checklist to ensure you've completed all the necessary steps for analytics tracking.

## Prerequisites

- [ ] Google account
- [ ] Access to the quiz application code
- [ ] Ability to deploy/update the application

---

## Part 1: Google Analytics Setup

### Create GA4 Property

- [ ] Go to https://analytics.google.com/
- [ ] Sign in with your Google account
- [ ] Click "Admin" (gear icon)
- [ ] Create a new property or select existing one
- [ ] Note down your property name: ******\_\_\_\_******

### Set Up Web Data Stream

- [ ] In GA4 property, create a Web data stream
- [ ] Enter your website URL
- [ ] Name the stream (e.g., "Quiz App - Production")
- [ ] Copy your Measurement ID: `G-________________`

---

## Part 2: Application Configuration

### Local Development Setup

- [ ] Open `.env` file in project root
- [ ] Replace `G-XXXXXXXXXX` with your actual Measurement ID
- [ ] Save the file
- [ ] Restart development server: `npm run dev`

### Test Locally

- [ ] Open http://localhost:5173 in browser
- [ ] Go to GA4 → Reports → Realtime
- [ ] Confirm your visit appears (within 30-60 seconds)
- [ ] Start a quiz and answer some questions
- [ ] Check that custom events appear in Realtime report

### Events to Test

- [ ] `quiz_start` - Start a quiz level
- [ ] `correct_answer` - Answer a question correctly
- [ ] `incorrect_answer` - Answer a question incorrectly
- [ ] `level_progress` - Advance to next level (if applicable)
- [ ] `reward_earned` - Earn a coin or diamond
- [ ] `quiz_complete` - Complete quiz (win or game over)
- [ ] `quiz_duration` - Time tracking on completion

---

## Part 3: Production Deployment

### Environment Variables

**If using GitHub Pages:**

- [ ] Add secret in repository: Settings → Secrets → Actions
- [ ] Name: `VITE_GA_MEASUREMENT_ID`
- [ ] Value: Your GA4 Measurement ID
- [ ] Update GitHub Actions workflow to use the secret

**If using Netlify:**

- [ ] Go to Site settings → Build & deploy → Environment
- [ ] Add variable: `VITE_GA_MEASUREMENT_ID`
- [ ] Set value to your GA4 Measurement ID
- [ ] Save and redeploy

**If using Vercel:**

- [ ] Go to Project Settings → Environment Variables
- [ ] Add variable: `VITE_GA_MEASUREMENT_ID`
- [ ] Set value to your GA4 Measurement ID
- [ ] Save and redeploy

### Deploy & Verify

- [ ] Deploy application to production
- [ ] Visit your live site
- [ ] Check GA4 Realtime reports
- [ ] Confirm tracking is working
- [ ] Test all quiz flows (correct/incorrect answers, completion)

---

## Part 4: GA4 Configuration (Optional but Recommended)

### Create Custom Reports

- [ ] Go to GA4 → Explore
- [ ] Create "Error Questions Analysis" report
  - [ ] Add dimension: Event name (filter by `incorrect_answer`)
  - [ ] Add dimension: Event label
  - [ ] Add metric: Event count
- [ ] Create "Quiz Performance" report
  - [ ] Add metrics for quiz completions
  - [ ] Add average session duration
  - [ ] Add completion rates

### Set Up Alerts (Optional)

- [ ] Go to Admin → Custom Alerts
- [ ] Create alert for unusual traffic spikes
- [ ] Create alert for high error rates
- [ ] Set notification preferences

### Create Custom Audiences (Optional)

- [ ] Create audience: "Quiz Completers"
  - Filter: Users who trigger `quiz_complete` event
- [ ] Create audience: "High Error Rate Users"
  - Filter: Users with >5 `incorrect_answer` events

---

## Part 5: Documentation & Team Setup

### Share Access (if working with a team)

- [ ] Go to GA4 Admin → Property Access Management
- [ ] Add team members' email addresses
- [ ] Set appropriate permissions (Viewer, Analyst, Editor, Admin)

### Document Your Setup

- [ ] Record GA4 Measurement ID in team docs
- [ ] Share analytics dashboard links with stakeholders
- [ ] Document custom reports and their purposes
- [ ] Set up regular reporting cadence (weekly/monthly)

---

## Part 6: Ongoing Monitoring

### Daily/Weekly Checks

- [ ] Monitor Realtime reports for active users
- [ ] Check for tracking errors in console
- [ ] Review top error questions
- [ ] Monitor completion rates

### Monthly Reviews

- [ ] Analyze user growth trends
- [ ] Review most difficult questions
- [ ] Check average quiz duration trends
- [ ] Identify opportunities for improvement

### Quarterly Analysis

- [ ] Export data for in-depth analysis
- [ ] Compare performance across time periods
- [ ] Adjust quiz difficulty if needed
- [ ] Update questions based on error patterns

---

## Troubleshooting Checklist

If analytics isn't working:

- [ ] Verify Measurement ID is correct (no typos)
- [ ] Check that `.env` file exists and has correct format
- [ ] Confirm environment variable starts with `VITE_`
- [ ] Restart dev server after changing `.env`
- [ ] Disable browser ad blockers
- [ ] Check browser console for errors
- [ ] Verify GA4 data stream URL matches your site URL
- [ ] Wait 24-48 hours for full data processing
- [ ] Check that Real-time reports show activity

---

## Resources

- [ ] Read [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) for detailed instructions
- [ ] Bookmark [ANALYTICS_QUICK_REFERENCE.md](./ANALYTICS_QUICK_REFERENCE.md)
- [ ] Download Google Analytics mobile app for monitoring on the go
- [ ] Join Google Analytics community: https://support.google.com/analytics/community

---

## 🎉 Completion

Once all items are checked:

- ✅ Analytics is fully set up
- ✅ Tracking is working in production
- ✅ Reports are configured
- ✅ Team has access (if applicable)
- ✅ Documentation is complete

**Congratulations!** Your quiz app analytics are ready to provide valuable insights! 🎊

---

**Last updated:** ****\_\_\_\_****  
**Completed by:** ****\_\_\_\_****  
**Next review date:** ****\_\_\_\_****

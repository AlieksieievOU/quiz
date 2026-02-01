# 📚 Analytics Documentation - Table of Contents

Welcome! This folder contains everything you need to set up and use Google Analytics for your quiz application.

---

## 🚀 Start Here

### New to Google Analytics?

**👉 [QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide (no experience needed!)

### Want Step-by-Step Instructions?

**👉 [ANALYTICS_CHECKLIST.md](./ANALYTICS_CHECKLIST.md)** - Complete checklist to ensure nothing is missed

---

## 📖 Complete Documentation

### Full Setup Guide

**[ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)** - Detailed instructions for:

- Creating GA4 property
- Configuring your app
- Testing locally
- Deploying to production
- Viewing your data
- Troubleshooting

### Quick Reference

**[ANALYTICS_QUICK_REFERENCE.md](./ANALYTICS_QUICK_REFERENCE.md)** - Fast access to:

- Key metrics locations
- GA4 navigation paths
- Event reference
- Mobile app info

### Summary

**[ANALYTICS_SUMMARY.md](./ANALYTICS_SUMMARY.md)** - Overview of:

- What gets tracked
- All features included
- Files created
- Custom reports
- Pro tips

### Data Flow

**[ANALYTICS_DATAFLOW.md](./ANALYTICS_DATAFLOW.md)** - Visual diagrams showing:

- How data flows from app to GA4
- Event timeline examples
- Architecture overview
- How to find your three key metrics

---

## 📂 File Structure

```
quiz/
├── 📄 QUICKSTART.md ............................ 5-minute beginner guide ⭐
├── 📄 ANALYTICS_SETUP.md ....................... Complete setup instructions
├── 📄 ANALYTICS_QUICK_REFERENCE.md ............. Quick tips & paths
├── 📄 ANALYTICS_SUMMARY.md ..................... Feature overview
├── 📄 ANALYTICS_CHECKLIST.md ................... Step-by-step checklist
├── 📄 ANALYTICS_DATAFLOW.md .................... Visual diagrams
├── 📄 README.md ................................ Project README
│
├── 📁 src/
│   ├── 📁 utils/
│   │   ├── analytics.js ........................ Analytics functions 🔧
│   │   └── analyticsTest.js .................... Testing utilities 🧪
│   └── App.jsx ................................. Updated with tracking
│
├── .env ........................................ Your GA ID (not in git) 🔐
└── .env.example ................................ Template for team
```

---

## 🎯 Your Three Key Metrics

### 1. Track Error Questions ❌

**Document:** [ANALYTICS_SUMMARY.md - Error Questions](./ANALYTICS_SUMMARY.md#1-track-error-questions)  
**GA4 Path:** Reports → Engagement → Events → `incorrect_answer`

### 2. Track Unique Visitors 👥

**Document:** [ANALYTICS_SUMMARY.md - Unique Visitors](./ANALYTICS_SUMMARY.md#2-track-unique-visitors)  
**GA4 Path:** Reports → Life cycle → Acquisition → Overview

### 3. Track Time Spent ⏱️

**Document:** [ANALYTICS_SUMMARY.md - Time Spent](./ANALYTICS_SUMMARY.md#3-track-time-spent-on-quiz)  
**GA4 Path:** Reports → Engagement → Events → `quiz_duration`

---

## 🔍 Find What You Need

### I want to...

#### ... Set up analytics for the first time

→ Start with **[QUICKSTART.md](./QUICKSTART.md)** (5 minutes)

#### ... Check if I did everything correctly

→ Use **[ANALYTICS_CHECKLIST.md](./ANALYTICS_CHECKLIST.md)**

#### ... Understand what data is being tracked

→ Read **[ANALYTICS_SUMMARY.md](./ANALYTICS_SUMMARY.md)**

#### ... Find where to view specific metrics in GA4

→ Check **[ANALYTICS_QUICK_REFERENCE.md](./ANALYTICS_QUICK_REFERENCE.md)**

#### ... See how the tracking works technically

→ View **[ANALYTICS_DATAFLOW.md](./ANALYTICS_DATAFLOW.md)**

#### ... Deploy to production (Netlify, Vercel, etc.)

→ See **[ANALYTICS_SETUP.md - Step 6](./ANALYTICS_SETUP.md#step-6-deploy-to-production)**

#### ... Create custom reports in GA4

→ Read **[ANALYTICS_SUMMARY.md - Custom Reports](./ANALYTICS_SUMMARY.md#creating-custom-reports)**

#### ... Troubleshoot issues

→ See **[ANALYTICS_SETUP.md - Troubleshooting](./ANALYTICS_SETUP.md#troubleshooting)**

#### ... Test my setup

→ Use the test utility (see **[ANALYTICS_SUMMARY.md - Testing](./ANALYTICS_SUMMARY.md#testing-your-setup)**)

---

## 🎓 Recommended Reading Order

### For Beginners

1. **QUICKSTART.md** - Get up and running
2. **ANALYTICS_QUICK_REFERENCE.md** - Learn where to find things
3. **ANALYTICS_SUMMARY.md** - Understand what you're tracking

### For Technical Users

1. **ANALYTICS_SETUP.md** - Complete documentation
2. **ANALYTICS_DATAFLOW.md** - Technical architecture
3. **ANALYTICS_SUMMARY.md** - Advanced features

### For Team Leads

1. **ANALYTICS_SUMMARY.md** - Overview of capabilities
2. **ANALYTICS_CHECKLIST.md** - Ensure complete setup
3. **ANALYTICS_SETUP.md** - Reference for team members

---

## 📊 Tracked Events Reference

| Event Name         | Description             | Document                            |
| ------------------ | ----------------------- | ----------------------------------- |
| `incorrect_answer` | **Error questions** ⭐  | [Summary](./ANALYTICS_SUMMARY.md)   |
| `quiz_duration`    | **Time spent** ⭐       | [Summary](./ANALYTICS_SUMMARY.md)   |
| `quiz_start`       | Quiz session starts     | [DataFlow](./ANALYTICS_DATAFLOW.md) |
| `correct_answer`   | Correct answer selected | [Setup](./ANALYTICS_SETUP.md)       |
| `quiz_complete`    | Quiz finished           | [Setup](./ANALYTICS_SETUP.md)       |
| `level_progress`   | Level advancement       | [Setup](./ANALYTICS_SETUP.md)       |
| `reward_earned`    | Reward obtained         | [Setup](./ANALYTICS_SETUP.md)       |

⭐ = Your specifically requested metrics

---

## 🛠️ Technical Files

### Implementation Files

- **`src/utils/analytics.js`** - Core tracking functions
- **`src/utils/analyticsTest.js`** - Configuration testing
- **`src/App.jsx`** - Integration point

### Configuration Files

- **`.env`** - Your GA Measurement ID (add to `.gitignore`)
- **`.env.example`** - Template for team members

### Documentation Files

- All the `.md` files in the project root

---

## 🆘 Need Help?

### Quick Answers

1. **Can't see events?** → [Troubleshooting Guide](./ANALYTICS_SETUP.md#troubleshooting)
2. **How to find metrics?** → [Quick Reference](./ANALYTICS_QUICK_REFERENCE.md)
3. **Setup questions?** → [Complete Setup](./ANALYTICS_SETUP.md)
4. **Testing?** → Run `window.testGA.runAllTests()` in browser console

### External Resources

- [Google Analytics Help](https://support.google.com/analytics/)
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [React GA4 Package](https://github.com/PriceRunner/react-ga4)

---

## ✅ Quick Status Check

Run through this to verify your setup:

- [ ] Google Analytics property created
- [ ] Measurement ID copied
- [ ] `.env` file updated
- [ ] Dev server restarted
- [ ] Events showing in GA4 Realtime
- [ ] Production environment variable set (if deployed)

If all checked: **You're all set! 🎉**

---

## 📱 Mobile Monitoring

Download the **Google Analytics app** to monitor your quiz on the go:

- [iOS App Store](https://apps.apple.com/app/google-analytics/id881599038)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.google.android.apps.giant)

---

## 🎯 Next Steps

1. ✅ Complete the **[QUICKSTART.md](./QUICKSTART.md)** guide
2. ✅ Test your setup with real quiz sessions
3. ✅ Check **[ANALYTICS_QUICK_REFERENCE.md](./ANALYTICS_QUICK_REFERENCE.md)** for daily use
4. ✅ Create custom reports (see **[ANALYTICS_SUMMARY.md](./ANALYTICS_SUMMARY.md)**)
5. ✅ Set up alerts for important metrics

---

**Happy tracking! 📊✨**

Have questions? All the answers are in these documents!

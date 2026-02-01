# Analytics Quick Reference 📊

## 🎯 Your Key Metrics

### 1. Track Error Questions

**Where to find it:** Reports → Engagement → Events → Filter by `incorrect_answer`

**What you see:**

- Which questions users answer incorrectly most often
- The selected wrong answer vs. correct answer
- Question difficulty patterns

**Use it to:**

- Identify questions that need better wording
- Spot concepts that need more explanation
- Improve question quality

---

### 2. Unique Visitors

**Where to find it:** Reports → Life cycle → Acquisition → Overview

**What you see:**

- Total users
- New vs. returning users
- User growth over time

**Use it to:**

- Track your app's reach
- Measure user retention
- Understand audience growth

---

### 3. Time Spent on Quiz

**Where to find it:** Reports → Engagement → Events → Click on `quiz_duration`

**What you see:**

- Average time per quiz session (in seconds)
- Distribution of session lengths
- Engagement patterns

**Use it to:**

- Understand user engagement depth
- Optimize quiz length
- Identify if users are rushing or taking their time

---

## 🔥 Quick GA4 Paths

### See Real-Time Activity

```
Reports → Realtime
```

- See who's using your quiz right now
- Watch events happen live

### View All Events

```
Reports → Engagement → Events
```

- See all tracked events
- Click any event for details

### Error Analysis

```
Explore → Template Gallery → Free Form
Add dimension: Event name = "incorrect_answer"
Add dimension: Event label (question text)
Add metric: Event count
```

### Session Duration Analysis

```
Explore → Template Gallery → Free Form
Add dimension: Event name = "quiz_duration"
Add metric: Event count
Add metric: Average value
```

---

## 📱 Mobile App (Optional)

Download the **Google Analytics** app:

- [iOS App Store](https://apps.apple.com/app/google-analytics/id881599038)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.google.android.apps.giant)

Monitor your quiz analytics on the go!

---

## ⚡ Quick Tips

1. **Check Real-Time first** - Verify tracking is working
2. **Wait 24-48 hours** - Full reports need time to populate
3. **Create custom dashboards** - Pin your favorite metrics
4. **Set up alerts** - Get notified of unusual activity
5. **Export data** - Download reports for presentations

---

## 🎨 Custom Event Details

### Events You Can Track

| Event              | Category | What It Tracks         |
| ------------------ | -------- | ---------------------- |
| `quiz_start`       | Quiz     | Quiz session initiated |
| `incorrect_answer` | Quiz     | Wrong answer selected  |
| `correct_answer`   | Quiz     | Right answer selected  |
| `quiz_duration`    | Quiz     | Total time in seconds  |
| `quiz_complete`    | Quiz     | Win or game over       |
| `level_progress`   | Quiz     | Level advancement      |
| `reward_earned`    | Quiz     | Coin/diamond/trophy    |

---

**Need the full guide?** See `ANALYTICS_SETUP.md`

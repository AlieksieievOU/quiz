# Analytics Dashboard

We've added a **Real-time Analytics Dashboard** accessible via a dedicated route.

## 🔗 Accessing the Dashboard

1. **Direct Link**: `/quiz/#/analytics` (e.g., `https://yourname.github.io/quiz/#/analytics`)
2. **In-Game Shortcut**: On the Start Screen, look for a small stats icon in the top-left area.

## 📊 Features

### 1. "Real-time" Activity Feed

- Simulates a live feed of user actions
- Shows (Mock) Quiz Starts, Answers, and Level Progress
- _Note: To connect real-global data, you would need a backend service._

### 2. Session Stats

- **Active Users**: Current count (1 for tracking session)
- **Time**: Average session time
- **Error Rate**: Simplified metric

### 3. GA4 Status Check

- Verifies that your **Measurement ID** is connected
- Confirms the Data Stream is active
- Provides a quick link to the official Google Analytics portal

## 🛠️ Technical Implementation

- **Routing**: Uses `react-router-dom` (HashRouter) for compatibility with GitHub Pages.
- **Route**: `/#/analytics`
- **Component**: `src/components/AnalyticsDashboard.jsx`

## 🔮 Future Improvements

To show **actual global real-time data**, you would need:

1. Google Analytics Data API enabled in Google Cloud Console.
2. A Service Account with permissions to read your GA property.
3. A backend proxy (Firebase Functions or Node.js) to securely fetch data.
4. Frontend fetching that data from your proxy.

For now, this dashboard serves as a **Session Monitor** and connectivity checker!

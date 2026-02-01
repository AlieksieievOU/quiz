# Why "Get Error Stats" Is Local Only

You noticed that the Dashboard displays strictly **local data** (your own session) rather than **global data** (all users). This is by design for a Client-Side Application (GitHub Pages).

## 🔒 The Security Constraint

Google Analytics 4 (GA4) has two distinct APIs:

1.  **Collection API** (Sending Data):
    - **Public**: Safe to use in frontend code.
    - **Method**: `react-ga4` uses this to _push_ events to Google.
    - **Status**: ✅ Implemented & Working.

2.  **Data API** (Fetching Data):
    - **Private**: Requires high-privilege credentials (Service Account Key).
    - **Method**: Requires a server to authenticate.
    - **Status**: ❌ **Cannot be used safely in React** without a backend.

## 🚫 Why we can't fetch directly

If we put the credentials in your React code (`src/utils...`):

1.  **Exposure**: Hackers can view "View Source", steal your credentials, and delete your Analytics data.
2.  **CORS Errors**: Browsers block direct requests to Google's Data API from a webpage to prevent this exact security risk.

## 🛠️ The Solution (If you need Global Data)

To display Global Stats (e.g., "1,000 Total Users") inside your app, you must implement a specific architecture:

1.  **Backend Proxy**: Set up a server (Firebase Cloud Functions, AWS Lambda, or a Node.js server).
2.  **Secure Storage**: Store your `service-account.json` on that server.
3.  **API Endpoint**: Create a simplistic endpoint (e.g., `GET /api/stats`).
4.  **Frontend**: Update `getErrorStats` to fetch from `https://your-backend.com/api/stats`.

## 📊 Recommended Alternative

For a quiz application hosted on GitHub Pages (Serverless), the standard best practice is:

1.  **Track Locally**: Show the user _their_ progress (Current Dashboard).
2.  **View Globally**: Use the **Google Analytics Console** to view aggregate world-wide data.

_We have added a direct link to the GA4 Console in your Dashboard for this purpose._

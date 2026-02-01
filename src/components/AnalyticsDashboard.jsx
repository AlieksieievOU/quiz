import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, Activity, Users, Clock, AlertCircle, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getErrorStats } from '../utils/analytics';

const AnalyticsDashboard = () => {
  const [activeUsers] = useState(1);
  const [events, setEvents] = useState([]);
  const [errorStats] = useState(() => getErrorStats());
  const [sessionStartTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState('0m 0s');

  useEffect(() => {
    // Update timer
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - sessionStartTime) / 1000);
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      setElapsedTime(`${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime]);
  
  // Real-time Event Listener
  useEffect(() => {
    const handleEvent = (e) => {
      const { type, ...detail } = e.detail;
      
      let icon = Activity;
      let color = 'text-blue-500';
      
      switch(type) {
        case 'correct_answer':
          icon = CheckCircle;
          color = 'text-green-500';
          break;
        case 'incorrect_answer':
          icon = AlertCircle;
          color = 'text-red-500';
          break;
        case 'level_progress':
          icon = BarChart3;
          color = 'text-purple-500';
          break;
        default:
          break;
      }

      setEvents(prev => [{
        id: Date.now(),
        type,
        color,
        Icon: icon,
        time: new Date().toLocaleTimeString(),
        user: 'You' // It's local data
      }, ...prev].slice(0, 20));
    };

    window.addEventListener('quiz-analytics-event', handleEvent);
    return () => window.removeEventListener('quiz-analytics-event', handleEvent);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-slate-200 rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label="Return to Game"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="w-6 h-6 text-indigo-600" />
                Analytics Dashboard
              </h1>
              <p className="text-slate-500 text-sm">Real-time Session Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Live
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Active Users" value={activeUsers} icon={Users} color="bg-blue-500" />
          <Card title="Session Time" value={elapsedTime} icon={Clock} color="bg-orange-500" />
          <Card 
            title="Avg Errors" 
            value={errorStats.reduce((acc, curr) => acc + curr.count, 0)} 
            icon={AlertCircle} 
            color="bg-red-500" 
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Live Events Feed */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden order-2 lg:order-1">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Live Event Feed</h3>
              <span className="text-xs text-slate-400">Updating...</span>
            </div>
            <div className="divide-y divide-slate-50">
              {events.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Waiting for events...</div>
              ) : (
                events.map(event => (
                  <Motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-slate-100 ${event.color}`}>
                      <event.Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">{event.type}</p>
                      <p className="text-xs text-slate-400">{event.user}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{event.time}</span>
                  </Motion.div>
                ))
              )}
            </div>
          </div>

          
          {/* Top Failed Questions */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-fit order-1 lg:order-2">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-slate-800">Hardest Questions</h3>
            </div>
            <div className="p-0">
              {errorStats.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-sm">
                  No errors recorded in this session yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {errorStats.slice(0, 5).map((stat, idx) => (
                    <div key={stat.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">
                          {stat.count} fails
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 line-clamp-2" title={stat.text}>
                        {stat.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errorStats.length > 5 && (
              <div className="p-3 border-t border-slate-50 text-center">
                <span className="text-xs text-slate-500">and {errorStats.length - 5} more...</span>
              </div>
            )}
          </div>

          {/* GA4 Integration Info */}
          <div className="bg-linear-to-br from-indigo-900 to-slate-900 rounded-xl shadow-lg p-6 text-white h-fit">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              GA4 Connection
            </h3>
            
            <div className="space-y-4">
              <StatusRow label="Measurement ID" value={import.meta.env.VITE_GA_MEASUREMENT_ID ? 'Connected' : 'Missing'} status={!!import.meta.env.VITE_GA_MEASUREMENT_ID} />
              <StatusRow label="Data Stream" value="Active" status={true} />
              <StatusRow label="Real-time API" value="Server Required" status={false} warning />
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-slate-300">
              <p className="mb-2">To view full global stats:</p>
              <a 
                href="https://analytics.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-center font-medium transition-colors"
              >
                Open Google Analytics
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.replace('bg-', '')}`}>
      {/* Note: Tailwind dynamic class extraction limitation might require literal classes, 
          but usually simplistic maps work if classes are used elsewhere. 
          For safety, I'll use a fixed style or simpler logic if needed. 
          Using inline style for specific color opacity if needed. */}
      <Icon className={`w-8 h-8 text-white ${color.replace('bg-', 'text-').replace('500', '600')}`} style={{ color: 'inherit' }} />
    </div>
  </div>
);

const StatusRow = ({ label, value, status, warning }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-400">{label}</span>
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
      warning ? 'bg-yellow-500/20 text-yellow-300' :
      status ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
    }`}>
      {value}
    </span>
  </div>
);

export default AnalyticsDashboard;

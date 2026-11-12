import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Trash2, 
  Droplets, 
  Layers, 
  Bug, 
  CloudRain, 
  Sun, 
  Clock, 
  AlertTriangle, 
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { FarmNotification } from '../../types/farm';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationCompleted, dismissNotification, markAllNotificationsRead } = useFarm();
  const [filter, setFilter] = useState<'all' | 'unread' | 'completed'>('all');
  const [browserPermStatus, setBrowserPermStatus] = useState<string>(() => {
    return 'Notification' in window ? Notification.permission : 'unsupported';
  });

  const requestBrowserPermission = async () => {
    if (!('Notification' in window)) {
      alert('Browser notifications not supported.');
      return;
    }
    const perm = await Notification.requestPermission();
    setBrowserPermStatus(perm);
    if (perm === 'granted') {
      new Notification('Digital Farming Notifications Enabled', {
        body: 'You will receive timely alerts for rain forecasts, fertilizer windows, and pest inspections.',
        icon: '/favicon.ico'
      });
    }
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return n.status === 'unread';
    if (filter === 'completed') return n.status === 'completed';
    return true;
  });

  const getCategoryIcon = (cat: FarmNotification['category']) => {
    switch (cat) {
      case 'watering': return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'fertilizer': return <Layers className="w-5 h-5 text-amber-500" />;
      case 'pest': return <Bug className="w-5 h-5 text-rose-500" />;
      case 'weather': return <CloudRain className="w-5 h-5 text-cyan-500" />;
      case 'harvest': return <Clock className="w-5 h-5 text-lime-500" />;
      default: return <Bell className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Smart Farming Notifications & Reminders
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Automated alerts for irrigation schedules, fertilizer splits, pest checkpoints, and severe weather warnings
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {browserPermStatus !== 'granted' && (
            <button
              type="button"
              onClick={requestBrowserPermission}
              className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Enable Push Alerts</span>
            </button>
          )}

          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 transition flex items-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-2">
        {(['all', 'unread', 'completed'] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
              filter === st
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {st} ({notifications.filter(n => st === 'all' ? true : n.status === st).length})
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            className={`p-6 rounded-3xl border transition flex flex-col md:flex-row md:items-start justify-between gap-4 ${
              notif.status === 'unread'
                ? 'bg-gradient-to-r from-amber-50/70 via-white to-white dark:from-amber-950/20 dark:via-stone-900 dark:to-stone-900 border-amber-300 dark:border-amber-800 shadow-sm'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-90'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0 border border-stone-200 dark:border-stone-700">
                {getCategoryIcon(notif.category)}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {notif.cropName}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    notif.priority === 'urgent' || notif.priority === 'high'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : notif.priority === 'medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {notif.priority} Priority
                  </span>
                  <span className="text-[10px] text-stone-400">{notif.date}</span>
                </div>

                <h3 className="font-extrabold text-base text-stone-900 dark:text-white mt-1 font-serif">
                  {notif.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  <strong>Reason:</strong> {notif.reason}
                </p>

                <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                  <strong>Recommended Action:</strong> {notif.recommendedAction}
                </div>
              </div>
            </div>

            {/* Actions: Mark Done / Dismiss */}
            <div className="flex items-center gap-2 self-end md:self-start shrink-0 pt-2 md:pt-0">
              {notif.status !== 'completed' && (
                <button
                  type="button"
                  onClick={() => markNotificationCompleted(notif.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Done</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => dismissNotification(notif.id)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                title="Dismiss"
                aria-label="Dismiss notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-bold text-base text-stone-800 dark:text-stone-200">
              All caught up! No pending notifications.
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Your farm operations and crop growth schedules are completely up to date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

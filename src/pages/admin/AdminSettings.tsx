import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settingsService';
import { SiteSettings } from '../../types';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Sliders, Save, CheckCircle2, Globe, Share2, Users, Calendar, MapPin, Sparkles } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    settingsService.getSettings().then((s) => setSettings(s));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    await settingsService.updateSettings(settings);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-primary">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="System & Website Settings Configuration" />

        <main className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg max-w-5xl">
          {success && (
            <div className="p-space-md rounded-2xl bg-primary-container text-on-primary-container font-label-md text-sm font-bold flex items-center gap-2 shadow-gold-glow animate-in fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span>Settings successfully persisted to repository!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="flex flex-col gap-space-xl">
            {/* 1. Core Event Metadata */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
              <div className="flex items-center gap-2 pb-space-xs border-b border-surface-variant/40">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Core Event Identity & Schedule
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Event Title</label>
                  <input
                    type="text"
                    value={settings.eventName}
                    onChange={(e) => setSettings({ ...settings, eventName: e.target.value })}
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Presented By</label>
                  <input
                    type="text"
                    value={settings.presentedBy}
                    onChange={(e) => setSettings({ ...settings, presentedBy: e.target.value })}
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Event Date</label>
                  <input
                    type="text"
                    value={settings.eventDate}
                    onChange={(e) => setSettings({ ...settings, eventDate: e.target.value })}
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Event Timings</label>
                  <input
                    type="text"
                    value={settings.eventTime}
                    onChange={(e) => setSettings({ ...settings, eventTime: e.target.value })}
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs uppercase text-outline">Venue / Location Description</label>
                  <input
                    type="text"
                    value={settings.eventLocation}
                    onChange={(e) => setSettings({ ...settings, eventLocation: e.target.value })}
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
              </div>
            </div>

            {/* 2. Organizers & Celebrity */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
              <div className="flex items-center gap-2 pb-space-xs border-b border-surface-variant/40">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Organizers & Celebrity Guest
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Organizer 1 Name</label>
                  <input
                    type="text"
                    value={settings.organizers.devenJha.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        organizers: {
                          ...settings.organizers,
                          devenJha: { ...settings.organizers.devenJha, name: e.target.value },
                        },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Organizer 2 Name</label>
                  <input
                    type="text"
                    value={settings.organizers.rituJha.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        organizers: {
                          ...settings.organizers,
                          rituJha: { ...settings.organizers.rituJha, name: e.target.value },
                        },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs uppercase text-outline">Celebrity Guest of Honour</label>
                  <input
                    type="text"
                    value={settings.celebrityGuest.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        celebrityGuest: { ...settings.celebrityGuest, name: e.target.value },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
              </div>
            </div>

            {/* 3. Social Handles & Partner URLs */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
              <div className="flex items-center gap-2 pb-space-xs border-b border-surface-variant/40">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                  External Company & Social Links
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Janta Live News Website URL</label>
                  <input
                    type="url"
                    value={settings.partnerWebsites.jantaLiveNews}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        partnerWebsites: { ...settings.partnerWebsites, jantaLiveNews: e.target.value },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Deven Jha Productions URL</label>
                  <input
                    type="url"
                    value={settings.partnerWebsites.devenJhaProductions}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        partnerWebsites: { ...settings.partnerWebsites, devenJhaProductions: e.target.value },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Instagram @jantalivenews</label>
                  <input
                    type="url"
                    value={settings.socialHandles.instagramJantaLive}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialHandles: { ...settings.socialHandles, instagramJantaLive: e.target.value },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Instagram @devenjhaproductions</label>
                  <input
                    type="url"
                    value={settings.socialHandles.instagramDevenJha}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialHandles: { ...settings.socialHandles, instagramDevenJha: e.target.value },
                      })
                    }
                    className="p-3 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-outline-variant/30"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-space-xl py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-sm uppercase font-bold hover:bg-primary shadow-gold-glow flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Persisting Configuration...' : 'Save Website Settings'}</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

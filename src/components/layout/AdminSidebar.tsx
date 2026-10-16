import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  FileCheck2, 
  MessageSquare, 
  Sliders, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { BRAND_ASSETS } from '../../assets/constants';

interface AdminSidebarProps {
  pendingRegistrations?: number;
  pendingEnquiries?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  pendingRegistrations = 0,
  pendingEnquiries = 0,
}) => {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Registrations',
      path: '/admin/registrations',
      icon: Users,
      badge: pendingRegistrations > 0 ? pendingRegistrations : undefined,
    },
    {
      label: 'Certificates',
      path: '/admin/certificates',
      icon: FileCheck2,
    },
    {
      label: 'Awards Crypt',
      path: '/admin/awards',
      icon: Award,
    },
    {
      label: 'Enquiries',
      path: '/admin/enquiries',
      icon: MessageSquare,
      badge: pendingEnquiries > 0 ? pendingEnquiries : undefined,
    },
    {
      label: 'Website Settings',
      path: '/admin/settings',
      icon: Sliders,
    },
  ];

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col justify-between shrink-0 min-h-screen text-on-surface">
      <div className="flex flex-col">
        {/* Admin Brand Crest */}
        <div className="p-space-lg border-b border-outline-variant/20 flex items-center gap-space-sm">
          <img
            alt="ICG Crest"
            className="h-8 w-auto object-contain"
            src={BRAND_ASSETS.emblem}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
              ICG Secretariat
            </span>
            <span className="text-[11px] text-on-surface-variant uppercase tracking-widest">
              Executive Console
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-space-sm flex flex-col gap-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-space-md py-3 rounded-xl font-label-md text-label-md uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`
                }
              >
                <div className="flex items-center gap-space-sm">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-secondary-container text-on-secondary-container">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Public Site Quick Preview Link */}
      <div className="p-space-md border-t border-outline-variant/20">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-space-xs w-full py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
        </Link>
      </div>
    </aside>
  );
};

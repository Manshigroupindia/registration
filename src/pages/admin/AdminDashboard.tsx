import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registrationService } from '../../services/registrationService';
import { certificateService } from '../../services/certificateService';
import { awardService } from '../../services/awardService';
import { enquiryService } from '../../services/enquiryService';
import { isFirebaseConfigured } from '../../services/firebase';
import { Registration, CertificateRecord, AwardRecord, ContactEnquiry } from '../../types';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { 
  Users, 
  FileCheck2, 
  Award, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  Database,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [awards, setAwards] = useState<AwardRecord[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [regs, certs, awds, enqs] = await Promise.all([
        registrationService.getAll(),
        certificateService.getAll(),
        awardService.getAll(),
        enquiryService.getAll(),
      ]);
      setRegistrations(regs);
      setCertificates(certs);
      setAwards(awds);
      setEnquiries(enqs);
      setLoading(false);
    };

    fetchData();
  }, []);

  const totalRegistrations = registrations.length;
  const pendingRegistrations = registrations.filter((r) => r.status === 'pending').length;
  const approvedRegistrations = registrations.filter((r) => r.status === 'approved').length;
  const totalCertificates = certificates.length;
  const totalAwards = awards.length;
  const totalEnquiries = enquiries.length;
  const pendingEnquiries = enquiries.filter((e) => e.status === 'pending').length;

  const firebaseActive = isFirebaseConfigured();

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar
        pendingRegistrations={pendingRegistrations}
        pendingEnquiries={pendingEnquiries}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Executive Secretariat Dashboard" />

        <main className="p-space-lg lg:p-space-xl flex flex-col gap-space-xl max-w-7xl">
          {/* Top Banner Notice */}
          <div className="p-space-md rounded-2xl bg-surface-container-high border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <Database className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="font-label-md text-label-md text-on-surface font-semibold block">
                  Data Synchronization Node: {firebaseActive ? 'Google Cloud Firestore Connected' : 'Local Storage Engine Active'}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {firebaseActive 
                    ? 'All applicant and certificate records sync directly to cloud collections.' 
                    : 'Running in zero-latency local database mode. Connect Firebase environment variables in .env for production.'}
                </span>
              </div>
            </div>
            <Link
              to="/admin/settings"
              className="px-space-md py-1.5 rounded-full bg-surface-container border border-outline-variant/30 hover:border-primary text-xs uppercase font-bold text-primary transition-colors shrink-0"
            >
              Configure Settings
            </Link>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-md">
            {/* Total Regs */}
            <div className="p-space-md rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-sm text-[11px] uppercase tracking-wider">Total Enrolments</span>
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">
                {totalRegistrations}
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">Contestant Dossiers</span>
            </div>

            {/* Pending Regs */}
            <div className="p-space-md rounded-2xl bg-surface-container border border-secondary/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-secondary">
                <span className="font-label-sm text-[11px] uppercase tracking-wider font-bold">Pending Review</span>
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-headline-lg text-headline-lg font-bold text-secondary mt-2">
                {pendingRegistrations}
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">Awaiting Approval</span>
            </div>

            {/* Approved Regs */}
            <div className="p-space-md rounded-2xl bg-surface-container border border-primary/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-primary">
                <span className="font-label-sm text-[11px] uppercase tracking-wider font-bold">Approved</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="font-headline-lg text-headline-lg font-bold text-primary mt-2">
                {approvedRegistrations}
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">Stage Qualified</span>
            </div>

            {/* Certificates */}
            <div className="p-space-md rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-sm text-[11px] uppercase tracking-wider">Certificates</span>
                <FileCheck2 className="w-4 h-4 text-tertiary" />
              </div>
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">
                {totalCertificates}
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">Ledger Indexed</span>
            </div>

            {/* Awards */}
            <div className="p-space-md rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-sm text-[11px] uppercase tracking-wider">Trophies & Awards</span>
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div className="font-headline-lg text-headline-lg font-bold text-primary mt-2">
                {totalAwards}
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">Conferred Laurels</span>
            </div>

            {/* Enquiries */}
            <div className="p-space-md rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-sm text-[11px] uppercase tracking-wider">Enquiries</span>
                <MessageSquare className="w-4 h-4 text-outline" />
              </div>
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">
                {totalEnquiries}
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">{pendingEnquiries} Pending</span>
            </div>
          </div>

          {/* Dual Table Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Recent Registrations Table */}
            <div className="lg:col-span-7 bg-surface-container rounded-3xl p-space-lg border border-outline-variant/30 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-surface-variant/40">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                    Recent Enrolments
                  </h2>
                </div>
                <Link
                  to="/admin/registrations"
                  className="text-primary hover:underline text-xs font-label-sm uppercase font-bold flex items-center gap-1"
                >
                  <span>Manage All</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {registrations.length === 0 ? (
                <div className="py-8 text-center text-outline">No candidate registrations logged yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-body-sm">
                    <thead>
                      <tr className="border-b border-surface-variant/40 text-outline uppercase font-label-sm text-[11px]">
                        <th className="py-2">Candidate</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Contact</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant/30">
                      {registrations.slice(0, 5).map((reg) => (
                        <tr key={reg.id} className="hover:bg-surface-container-high transition-colors">
                          <td className="py-3 font-semibold text-on-surface">
                            <div>{reg.fullName}</div>
                            <span className="font-mono text-[11px] text-outline">{reg.id}</span>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-xs font-semibold">
                              {reg.category}
                            </span>
                          </td>
                          <td className="py-3 text-on-surface-variant text-xs">
                            <div>+91 {reg.phone}</div>
                            <div className="text-outline truncate max-w-[140px]">{reg.email}</div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                                reg.status === 'approved'
                                  ? 'bg-primary/20 text-primary'
                                  : reg.status === 'pending'
                                  ? 'bg-secondary-container/60 text-secondary'
                                  : 'bg-surface-variant text-outline'
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Enquiries & Fast Actions */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              {/* Quick Actions */}
              <div className="bg-surface-container rounded-3xl p-space-lg border border-primary/20 shadow-xl flex flex-col gap-space-sm">
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Secretariat Fast Triggers
                </h3>
                <div className="grid grid-cols-2 gap-space-sm pt-1">
                  <Link
                    to="/admin/certificates"
                    className="p-3 rounded-2xl bg-surface-container-high border border-outline-variant/30 hover:border-primary text-on-surface transition-colors flex flex-col gap-1"
                  >
                    <FileCheck2 className="w-5 h-5 text-primary" />
                    <span className="font-label-sm text-xs font-bold uppercase">Issue Certificate</span>
                  </Link>

                  <Link
                    to="/admin/awards"
                    className="p-3 rounded-2xl bg-surface-container-high border border-outline-variant/30 hover:border-primary text-on-surface transition-colors flex flex-col gap-1"
                  >
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-label-sm text-xs font-bold uppercase">Register Award</span>
                  </Link>
                </div>
              </div>

              {/* Recent Enquiries */}
              <div className="bg-surface-container rounded-3xl p-space-lg border border-outline-variant/30 shadow-xl flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-space-sm pb-space-xs border-b border-surface-variant/40">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                      Latest Messages
                    </h3>
                  </div>
                  <Link
                    to="/admin/enquiries"
                    className="text-primary hover:underline text-xs font-label-sm uppercase font-bold flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {enquiries.length === 0 ? (
                  <div className="py-6 text-center text-outline text-body-sm">No enquiries recorded yet.</div>
                ) : (
                  <div className="flex flex-col gap-space-xs mt-2">
                    {enquiries.slice(0, 3).map((enq) => (
                      <div
                        key={enq.id}
                        className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-on-surface text-body-sm">{enq.fullName}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-surface-container text-primary">
                            {enq.enquiryType}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2">
                          {enq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { registrationService } from '../../services/registrationService';
import { Registration, RegistrationStatus, PageantCategory } from '../../types';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  X,
  ExternalLink
} from 'lucide-react';

export const AdminRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<Registration | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    const data = await registrationService.getAll();
    setRegistrations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleStatusChange = async (id: string, status: RegistrationStatus) => {
    await registrationService.updateStatus(id, status);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, status });
    }
    fetchRecords();
  };

  const handleDelete = async (id: string) => {
    await registrationService.delete(id);
    setDeleteConfirmId(null);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord(null);
    }
    fetchRecords();
  };

  const filtered = registrations.filter((r) => {
    const query = search.toLowerCase();
    const matchQuery =
      r.id.toLowerCase().includes(query) ||
      r.fullName.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.phone.includes(query) ||
      r.city.toLowerCase().includes(query);

    const matchCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchQuery && matchCategory && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar
        pendingRegistrations={registrations.filter((r) => r.status === 'pending').length}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Candidate Dossier & Registration Management" />

        <main className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg max-w-7xl">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md bg-surface-container rounded-3xl p-space-md border border-outline-variant/30 shadow-lg">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, Name, Email, WhatsApp, City..."
                className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-high rounded-xl text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
              />
            </div>

            {/* Filter Dropdowns & Export */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-sm text-xs uppercase focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
              >
                <option value="All">All Categories</option>
                <option value="Mr">Mr Category</option>
                <option value="Miss">Miss Category</option>
                <option value="Mrs">Mrs Category</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-sm text-xs uppercase focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => registrationService.exportToCSV(filtered)}
                className="px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-xs uppercase font-bold hover:bg-primary shadow-sm flex items-center gap-1.5 transition-colors"
                title="Export filtered records to CSV"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead>
                  <tr className="bg-surface-container-high border-b border-surface-variant/40 text-outline uppercase font-label-sm text-xs">
                    <th className="py-3 px-space-md">Registration ID</th>
                    <th className="py-3 px-space-md">Candidate Name</th>
                    <th className="py-3 px-space-md">Category</th>
                    <th className="py-3 px-space-md">Contact</th>
                    <th className="py-3 px-space-md">Tracks</th>
                    <th className="py-3 px-space-md">Status</th>
                    <th className="py-3 px-space-md text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-outline">
                        No registrations match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-container-high/60 transition-colors">
                        <td className="py-3.5 px-space-md font-mono text-primary font-bold">
                          {r.id}
                        </td>
                        <td className="py-3.5 px-space-md">
                          <div className="font-semibold text-on-surface">{r.fullName}</div>
                          <div className="text-xs text-outline">{r.city}, {r.state}</div>
                        </td>
                        <td className="py-3.5 px-space-md">
                          <span className="px-2.5 py-1 rounded-full bg-surface-container-high border border-primary/20 text-primary font-bold text-xs uppercase">
                            {r.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-space-md text-xs">
                          <div>+91 {r.phone}</div>
                          <div className="text-outline truncate max-w-[130px]">{r.email}</div>
                        </td>
                        <td className="py-3.5 px-space-md text-xs">
                          <span className="text-on-surface-variant font-medium">
                            {r.interestedIn.slice(0, 2).join(', ')}
                            {r.interestedIn.length > 2 && ` +${r.interestedIn.length - 2}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-space-md">
                          <select
                            value={r.status}
                            onChange={(e) => handleStatusChange(r.id, e.target.value as RegistrationStatus)}
                            className={`px-2 py-1 rounded-full text-xs font-bold uppercase cursor-pointer border ${
                              r.status === 'approved'
                                ? 'bg-primary/20 text-primary border-primary/30'
                                : r.status === 'pending'
                                ? 'bg-secondary-container/60 text-secondary border-secondary/30'
                                : 'bg-surface-variant text-outline border-outline/30'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-space-md text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedRecord(r)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface hover:text-primary transition-colors"
                              title="Inspect Full Dossier"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(r.id)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error-container text-outline hover:text-on-error-container transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-surface-container rounded-3xl border border-primary/40 shadow-2xl p-space-lg lg:p-space-xl flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high text-outline hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-space-md pb-space-sm border-b border-surface-variant/40">
              {selectedRecord.photoUrl ? (
                <img
                  src={selectedRecord.photoUrl}
                  alt={selectedRecord.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/40 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-surface-container-high text-primary font-bold flex items-center justify-center text-xl">
                  {selectedRecord.fullName.charAt(0)}
                </div>
              )}
              <div>
                <span className="font-mono text-xs text-primary font-bold">{selectedRecord.id}</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {selectedRecord.fullName}
                </h3>
                <span className="font-label-sm text-xs text-tertiary uppercase font-bold">
                  {selectedRecord.category} Category • {selectedRecord.experienceLevel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-sm font-body-sm text-body-sm">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-xs text-outline uppercase block">Date of Birth</span>
                <span className="font-semibold text-on-surface">{selectedRecord.dob}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-xs text-outline uppercase block">Location</span>
                <span className="font-semibold text-on-surface">{selectedRecord.city}, {selectedRecord.state}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-xs text-outline uppercase block">Email Address</span>
                <span className="font-semibold text-on-surface">{selectedRecord.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-xs text-outline uppercase block">WhatsApp Mobile</span>
                <span className="font-semibold text-on-surface">+91 {selectedRecord.phone}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <span className="text-xs text-outline uppercase block">Interested Tracks</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedRecord.interestedIn.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {selectedRecord.portfolioUrl && (
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-outline uppercase block">Portfolio / Instagram</span>
                  <span className="text-primary font-mono text-xs">{selectedRecord.portfolioUrl}</span>
                </div>
                <a
                  href={selectedRecord.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {selectedRecord.shortIntroduction && (
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-xs text-outline uppercase block">Introduction</span>
                <p className="mt-1 text-on-surface leading-relaxed text-xs">
                  {selectedRecord.shortIntroduction}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-space-sm border-t border-surface-variant/40">
              <span className="text-xs text-outline">
                Submitted on: {new Date(selectedRecord.createdAt).toLocaleString()}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedRecord.id, 'approved')}
                  className="px-space-md py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs uppercase font-bold hover:bg-primary"
                >
                  Approve Entry
                </button>
                <button
                  onClick={() => handleStatusChange(selectedRecord.id, 'rejected')}
                  className="px-space-md py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs uppercase font-bold"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-container rounded-3xl border border-error/50 p-space-lg shadow-2xl flex flex-col gap-space-md text-center">
            <h3 className="font-headline-md text-headline-md text-error font-bold">
              Confirm Record Deletion
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Are you sure you want to permanently delete registration dossier <code className="text-primary font-mono">{deleteConfirmId}</code>? This action cannot be reversed.
            </p>
            <div className="flex justify-center gap-space-sm mt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-space-lg py-2 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-sm text-xs uppercase font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-space-lg py-2 rounded-full bg-error-container text-on-error-container font-label-sm text-xs uppercase font-bold hover:brightness-110"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

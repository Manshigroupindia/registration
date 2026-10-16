import React, { useState, useEffect } from 'react';
import { awardService } from '../../services/awardService';
import { AwardRecord, VerificationStatus } from '../../types';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { 
  Award, 
  Search, 
  Plus, 
  Trash2, 
  Ban, 
  RotateCcw, 
  Eye, 
  Link as LinkIcon, 
  X,
  AlertCircle
} from 'lucide-react';

export const AdminAwards: React.FC = () => {
  const [awards, setAwards] = useState<AwardRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<AwardRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [revokeModalId, setRevokeModalId] = useState<string | null>(null);
  const [revocationReason, setRevocationReason] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New award form state
  const [newAward, setNewAward] = useState({
    id: `ICG-AWD-2026-${Math.floor(100 + Math.random() * 900)}`,
    recipientName: '',
    awardTitle: '',
    associatedCertificateNumber: '',
    category: 'Makeup Competition & Seminar',
    eventName: 'Iconic Creation Of God 2026',
    eventDate: '21 December 2026',
    issueDate: '21 December 2026',
    guestOfHonour: 'Jividha Sharma — Acclaimed Bollywood Actress',
    organizers: 'Deven Jha & Ritu Jha',
    presenters: 'Janta Live News & Deven Jha Productions',
    status: 'verified' as VerificationStatus,
  });

  const [createError, setCreateError] = useState<string | null>(null);

  const fetchRecords = async () => {
    const data = await awardService.getAll();
    setAwards(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const res = await awardService.create({
      ...newAward,
      associatedCertificateNumber: newAward.associatedCertificateNumber.trim() || undefined,
    });

    if (res.success) {
      setCreateModalOpen(false);
      setNewAward({
        id: `ICG-AWD-2026-${Math.floor(100 + Math.random() * 900)}`,
        recipientName: '',
        awardTitle: '',
        associatedCertificateNumber: '',
        category: 'Makeup Competition & Seminar',
        eventName: 'Iconic Creation Of God 2026',
        eventDate: '21 December 2026',
        issueDate: '21 December 2026',
        guestOfHonour: 'Jividha Sharma — Acclaimed Bollywood Actress',
        organizers: 'Deven Jha & Ritu Jha',
        presenters: 'Janta Live News & Deven Jha Productions',
        status: 'verified',
      });
      fetchRecords();
    } else {
      setCreateError(res.error || 'Failed to register award record.');
    }
  };

  const handleRevoke = async () => {
    if (!revokeModalId) return;
    await awardService.revoke(revokeModalId, revocationReason || 'Administrative revocation by Secretariat.');
    setRevokeModalId(null);
    setRevocationReason('');
    fetchRecords();
  };

  const handleRestore = async (id: string) => {
    await awardService.restore(id);
    fetchRecords();
  };

  const handleDelete = async (id: string) => {
    await awardService.delete(id);
    setDeleteConfirmId(null);
    fetchRecords();
  };

  const filtered = awards.filter((a) => {
    const q = search.toLowerCase();
    const matchQ =
      a.id.toLowerCase().includes(q) ||
      a.recipientName.toLowerCase().includes(q) ||
      a.awardTitle.toLowerCase().includes(q) ||
      (a.associatedCertificateNumber && a.associatedCertificateNumber.toLowerCase().includes(q));

    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Grand Laurels & Award Registry" />

        <main className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg max-w-7xl">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md bg-surface-container rounded-3xl p-space-md border border-outline-variant/30 shadow-lg">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search award reference, recipient, certificate link..."
                className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-high rounded-xl text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
              />
            </div>

            <div className="flex items-center gap-space-sm">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-space-md py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-sm text-xs uppercase border border-outline-variant/30"
              >
                <option value="All">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="revoked">Revoked</option>
              </select>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-xs uppercase font-bold hover:bg-primary shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Award</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead>
                  <tr className="bg-surface-container-high border-b border-surface-variant/40 text-outline uppercase font-label-sm text-xs">
                    <th className="py-3 px-space-md">Award No</th>
                    <th className="py-3 px-space-md">Recipient</th>
                    <th className="py-3 px-space-md">Award Distinction Title</th>
                    <th className="py-3 px-space-md">Linked Certificate</th>
                    <th className="py-3 px-space-md">Status</th>
                    <th className="py-3 px-space-md text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-outline">
                        No award records match the criteria.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((a) => (
                      <tr key={a.id} className="hover:bg-surface-container-high/60 transition-colors">
                        <td className="py-3.5 px-space-md font-mono text-primary font-bold">
                          {a.id}
                        </td>
                        <td className="py-3.5 px-space-md font-semibold text-on-surface">
                          {a.recipientName}
                        </td>
                        <td className="py-3.5 px-space-md text-on-surface-variant text-xs">
                          {a.awardTitle}
                        </td>
                        <td className="py-3.5 px-space-md font-mono text-xs text-outline">
                          {a.associatedCertificateNumber || '—'}
                        </td>
                        <td className="py-3.5 px-space-md">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                              a.status === 'verified'
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : 'bg-error-container text-on-error-container'
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-space-md text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedRecord(a)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface hover:text-primary transition-colors"
                              title="Inspect Citation"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Revoke or Restore */}
                            {a.status === 'revoked' ? (
                              <button
                                onClick={() => handleRestore(a.id)}
                                className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary"
                                title="Restore Award"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setRevokeModalId(a.id);
                                  setRevocationReason('');
                                }}
                                className="p-1.5 rounded-lg bg-surface-container-high hover:bg-secondary-container text-secondary"
                                title="Revoke Award"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirmId(a.id)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error-container text-outline hover:text-on-error-container"
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

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-surface-container rounded-3xl border border-primary/40 shadow-2xl p-space-lg lg:p-space-xl flex flex-col gap-space-md">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high text-outline hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Laurels Registry
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                Confer Official Award Trophy
              </h2>
            </div>

            {createError && (
              <div className="p-3 rounded-xl bg-secondary-container text-on-secondary-container text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-space-md">
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Award Identifier *</label>
                  <input
                    type="text"
                    required
                    value={newAward.id}
                    onChange={(e) => setNewAward({ ...newAward, id: e.target.value.toUpperCase() })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface font-mono font-bold text-xs border border-outline-variant/30 uppercase"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Linked Certificate Number</label>
                  <input
                    type="text"
                    value={newAward.associatedCertificateNumber}
                    onChange={(e) => setNewAward({ ...newAward, associatedCertificateNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. ICG-2026-CERT-0412"
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface font-mono text-xs border border-outline-variant/30 uppercase"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase text-outline">Recipient Laureate *</label>
                <input
                  type="text"
                  required
                  value={newAward.recipientName}
                  onChange={(e) => setNewAward({ ...newAward, recipientName: e.target.value })}
                  placeholder="e.g. Pooja Kashyap"
                  className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase text-outline">Grand Award Title *</label>
                <input
                  type="text"
                  required
                  value={newAward.awardTitle}
                  onChange={(e) => setNewAward({ ...newAward, awardTitle: e.target.value })}
                  placeholder="e.g. Best Makeup Artist & Creative Transformation of the Year"
                  className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Guest of Honour</label>
                  <input
                    type="text"
                    required
                    value={newAward.guestOfHonour}
                    onChange={(e) => setNewAward({ ...newAward, guestOfHonour: e.target.value })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Conferment Date</label>
                  <input
                    type="text"
                    required
                    value={newAward.issueDate}
                    onChange={(e) => setNewAward({ ...newAward, issueDate: e.target.value })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs uppercase font-bold hover:bg-primary shadow-gold-glow transition-all"
              >
                Concur Laurels into Registry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-surface-container rounded-3xl border border-primary/40 shadow-2xl p-space-lg flex flex-col gap-space-md">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high text-outline hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-space-sm">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <span className="font-mono text-xs text-primary font-bold">{selectedRecord.id}</span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{selectedRecord.awardTitle}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Recipient</span>
                <span className="font-bold text-on-surface">{selectedRecord.recipientName}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Linked Certificate</span>
                <span className="font-bold text-primary font-mono">{selectedRecord.associatedCertificateNumber || 'None'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Guest of Honour</span>
                <span className="font-bold text-on-surface">{selectedRecord.guestOfHonour}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Conferred Date</span>
                <span className="font-bold text-on-surface">{selectedRecord.issueDate}</span>
              </div>
            </div>
            {selectedRecord.status === 'revoked' && (
              <div className="p-2.5 rounded-xl bg-error-container text-on-error-container text-xs">
                <strong>Revocation Notice:</strong> {selectedRecord.revocationReason || 'Nullified by Secretariat'}
              </div>
            )}
            <div className="flex justify-end pt-2 border-t border-surface-variant/40">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-space-md py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs font-bold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVOKE MODAL */}
      {revokeModalId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-container rounded-3xl border border-secondary/50 p-space-lg shadow-2xl flex flex-col gap-space-md">
            <h3 className="font-headline-md text-headline-md text-secondary font-bold">
              Revoke Award Laurels
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Confirm revocation of award reference <code className="text-primary font-mono">{revokeModalId}</code>?
            </p>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase text-outline">Revocation Reason *</label>
              <textarea
                rows={2}
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                placeholder="e.g. Disciplinary board finding..."
                className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setRevokeModalId(null)}
                className="px-space-md py-2 rounded-full bg-surface-container-high text-on-surface text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleRevoke}
                className="px-space-md py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase"
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-container rounded-3xl border border-error/50 p-space-lg text-center flex flex-col gap-space-md shadow-2xl">
            <h3 className="font-headline-md text-headline-md text-error font-bold">
              Purge Award Record
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              Permanently purge award <code className="text-primary font-mono">{deleteConfirmId}</code>? This action cannot be reversed.
            </p>
            <div className="flex justify-center gap-space-sm mt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-space-lg py-2 rounded-full bg-surface-container-high text-on-surface text-xs uppercase font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-space-lg py-2 rounded-full bg-error-container text-on-error-container text-xs uppercase font-bold"
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

import React, { useState, useEffect } from 'react';
import { certificateService } from '../../services/certificateService';
import { CertificateRecord, VerificationStatus } from '../../types';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { QRCodeDisplay } from '../../components/common/QRCodeDisplay';
import { PrintableCertificate } from '../../components/certificate/PrintableCertificate';
import { pdfService } from '../../services/pdfService';
import { 
  FileCheck2, 
  Search, 
  Plus, 
  Trash2, 
  Ban, 
  RotateCcw, 
  Eye, 
  QrCode, 
  Printer, 
  Download, 
  X,
  AlertCircle
} from 'lucide-react';

export const AdminCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<CertificateRecord | null>(null);
  const [qrModalRecord, setQrModalRecord] = useState<CertificateRecord | null>(null);
  const [previewCert, setPreviewCert] = useState<CertificateRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [revokeModalId, setRevokeModalId] = useState<string | null>(null);
  const [revocationReason, setRevocationReason] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New certificate form state
  const [newCert, setNewCert] = useState({
    id: `ICG-2026-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
    recipientName: '',
    title: 'Runners-Up — Miss Iconic Category',
    category: 'Miss Iconic Pageant',
    eventName: 'Iconic Creation Of God 2026',
    eventDate: '21 December 2026',
    issueDate: '22 December 2026',
    organizers: 'Deven Jha & Ritu Jha',
    presenters: 'Janta Live News & Deven Jha Productions',
    status: 'verified' as VerificationStatus,
    hashSeal: `SHA256: ${Math.random().toString(36).substring(2, 15)}`,
  });

  const [createError, setCreateError] = useState<string | null>(null);

  const fetchRecords = async () => {
    const data = await certificateService.getAll();
    setCertificates(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const res = await certificateService.create(newCert);
    if (res.success) {
      setCreateModalOpen(false);
      setNewCert({
        id: `ICG-2026-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
        recipientName: '',
        title: 'Runners-Up — Miss Iconic Category',
        category: 'Miss Iconic Pageant',
        eventName: 'Iconic Creation Of God 2026',
        eventDate: '21 December 2026',
        issueDate: '22 December 2026',
        organizers: 'Deven Jha & Ritu Jha',
        presenters: 'Janta Live News & Deven Jha Productions',
        status: 'verified',
        hashSeal: `SHA256: ${Math.random().toString(36).substring(2, 15)}`,
      });
      fetchRecords();
    } else {
      setCreateError(res.error || 'Failed to create certificate record.');
    }
  };

  const handleRevoke = async () => {
    if (!revokeModalId) return;
    await certificateService.revoke(revokeModalId, revocationReason || 'Administrative revocation by Secretariat.');
    setRevokeModalId(null);
    setRevocationReason('');
    fetchRecords();
  };

  const handleRestore = async (id: string) => {
    await certificateService.restore(id);
    fetchRecords();
  };

  const handleDelete = async (id: string) => {
    await certificateService.delete(id);
    setDeleteConfirmId(null);
    fetchRecords();
  };

  const filtered = certificates.filter((c) => {
    const q = search.toLowerCase();
    const matchQ =
      c.id.toLowerCase().includes(q) ||
      c.recipientName.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Certificate Ledger Registry & Issuance" />

        <main className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg max-w-7xl">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md bg-surface-container rounded-3xl p-space-md border border-outline-variant/30 shadow-lg">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search certificate ID, recipient name, or title..."
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
                <option value="under_review">Under Review</option>
                <option value="revoked">Revoked</option>
              </select>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-xs uppercase font-bold hover:bg-primary shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Issue New Certificate</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead>
                  <tr className="bg-surface-container-high border-b border-surface-variant/40 text-outline uppercase font-label-sm text-xs">
                    <th className="py-3 px-space-md">Certificate ID</th>
                    <th className="py-3 px-space-md">Recipient</th>
                    <th className="py-3 px-space-md">Conferred Title</th>
                    <th className="py-3 px-space-md">Conferred Date</th>
                    <th className="py-3 px-space-md">Status</th>
                    <th className="py-3 px-space-md text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-outline">
                        No certificates match the criteria.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-surface-container-high/60 transition-colors">
                        <td className="py-3.5 px-space-md font-mono text-primary font-bold">
                          {c.id}
                        </td>
                        <td className="py-3.5 px-space-md font-semibold text-on-surface">
                          {c.recipientName}
                        </td>
                        <td className="py-3.5 px-space-md text-on-surface-variant text-xs">
                          {c.title}
                        </td>
                        <td className="py-3.5 px-space-md text-xs text-outline font-mono">
                          {c.issueDate}
                        </td>
                        <td className="py-3.5 px-space-md">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                              c.status === 'verified'
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : c.status === 'under_review'
                                ? 'bg-secondary-container/60 text-secondary border border-secondary/30'
                                : 'bg-error-container text-on-error-container'
                            }`}
                          >
                            {c.status === 'under_review' ? 'In Review' : c.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-space-md text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View / Print Preview */}
                            <button
                              onClick={() => setPreviewCert(c)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface hover:text-primary transition-colors"
                              title="Render Live Certificate"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* QR Code */}
                            <button
                              onClick={() => setQrModalRecord(c)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface hover:text-primary transition-colors"
                              title="View Cryptographic QR"
                            >
                              <QrCode className="w-4 h-4" />
                            </button>

                            {/* Revoke or Restore */}
                            {c.status === 'revoked' ? (
                              <button
                                onClick={() => handleRestore(c.id)}
                                className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary"
                                title="Restore Certificate"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setRevokeModalId(c.id);
                                  setRevocationReason('');
                                }}
                                className="p-1.5 rounded-lg bg-surface-container-high hover:bg-secondary-container text-secondary"
                                title="Revoke Certificate"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirmId(c.id)}
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

      {/* CREATE CERTIFICATE MODAL */}
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
                Registry Issuance
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                Confer New Official Certificate
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
                  <label className="text-xs uppercase text-outline">Certificate Number *</label>
                  <input
                    type="text"
                    required
                    value={newCert.id}
                    onChange={(e) => setNewCert({ ...newCert, id: e.target.value.toUpperCase() })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface font-mono font-bold text-xs border border-outline-variant/30 uppercase"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Initial Status</label>
                  <select
                    value={newCert.status}
                    onChange={(e) => setNewCert({ ...newCert, status: e.target.value as VerificationStatus })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                  >
                    <option value="verified">Verified & Conferred</option>
                    <option value="under_review">Under Review</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase text-outline">Recipient Full Name *</label>
                <input
                  type="text"
                  required
                  value={newCert.recipientName}
                  onChange={(e) => setNewCert({ ...newCert, recipientName: e.target.value })}
                  placeholder="e.g. Ananya Roy"
                  className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase text-outline">Accolade / Distinction Title *</label>
                <input
                  type="text"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="e.g. Winner — Miss Iconic Category 2026"
                  className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Category</label>
                  <input
                    type="text"
                    required
                    value={newCert.category}
                    onChange={(e) => setNewCert({ ...newCert, category: e.target.value })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-outline">Conferment Date</label>
                  <input
                    type="text"
                    required
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    className="p-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs border border-outline-variant/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs uppercase font-bold hover:bg-primary shadow-gold-glow transition-all"
              >
                Sign & Concur into Ledger
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {qrModalRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-surface-container rounded-3xl border border-primary/40 p-space-lg text-center flex flex-col items-center gap-space-sm shadow-2xl">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Cryptographic QR Seal
            </h3>
            <span className="font-mono text-xs text-outline">{qrModalRecord.id}</span>
            <div className="p-3 bg-white rounded-2xl shadow-md my-2">
              <QRCodeDisplay
                value={`${window.location.origin}/verify-certificate?id=${qrModalRecord.id}`}
                size={180}
                darkColor="#090604"
                lightColor="#ffffff"
              />
            </div>
            <p className="text-xs text-on-surface-variant">
              Scanning directly opens public verification for <strong>{qrModalRecord.recipientName}</strong>.
            </p>
            <button
              onClick={() => setQrModalRecord(null)}
              className="mt-2 px-space-lg py-2 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-bold uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* LIVE CERTIFICATE PREVIEW MODAL */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full flex flex-col gap-4 my-8">
            <div className="flex items-center justify-between text-on-surface">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg">Specimen Preview: {previewCert.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => pdfService.downloadElementAsPdf('admin-preview-cert', `${previewCert.id}_Certificate.pdf`)}
                  className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container text-xs uppercase font-bold hover:bg-primary shadow-sm flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => pdfService.printPage()}
                  className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-xs uppercase font-bold hover:bg-surface-variant flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-2 rounded-full bg-surface-container-high text-outline hover:text-on-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <PrintableCertificate certificate={previewCert} id="admin-preview-cert" />
          </div>
        </div>
      )}

      {/* REVOKE MODAL */}
      {revokeModalId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-container rounded-3xl border border-secondary/50 p-space-lg shadow-2xl flex flex-col gap-space-md">
            <h3 className="font-headline-md text-headline-md text-secondary font-bold">
              Revoke Official Certificate
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              You are about to officially void certificate <code className="text-primary font-mono">{revokeModalId}</code> in the public ledger.
            </p>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase text-outline">Reason for Revocation *</label>
              <textarea
                rows={2}
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                placeholder="e.g. Failure to comply with participation covenant..."
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
              Delete Certificate Record
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              Permanently purge certificate <code className="text-primary font-mono">{deleteConfirmId}</code> from the database? This cannot be undone.
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

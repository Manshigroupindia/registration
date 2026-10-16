import React, { useState, useEffect } from 'react';
import { enquiryService } from '../../services/enquiryService';
import { ContactEnquiry, EnquiryStatus } from '../../types';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  X,
  Mail,
  Phone
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<ContactEnquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchRecords = async () => {
    const data = await enquiryService.getAll();
    setEnquiries(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    await enquiryService.updateStatus(id, status);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, status });
    }
    fetchRecords();
  };

  const handleDelete = async (id: string) => {
    await enquiryService.delete(id);
    setDeleteConfirmId(null);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord(null);
    }
    fetchRecords();
  };

  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const matchQ =
      e.id.toLowerCase().includes(q) ||
      e.fullName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar
        pendingEnquiries={enquiries.filter((e) => e.status === 'pending').length}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Communications & Enquiry Management" />

        <main className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg max-w-7xl">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md bg-surface-container rounded-3xl p-space-md border border-outline-variant/30 shadow-lg">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket ID, name, email, subject..."
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
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead>
                  <tr className="bg-surface-container-high border-b border-surface-variant/40 text-outline uppercase font-label-sm text-xs">
                    <th className="py-3 px-space-md">Ticket ID</th>
                    <th className="py-3 px-space-md">Sender Name</th>
                    <th className="py-3 px-space-md">Type & Subject</th>
                    <th className="py-3 px-space-md">Contact</th>
                    <th className="py-3 px-space-md">Status</th>
                    <th className="py-3 px-space-md text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-outline">
                        No enquiry messages logged.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((e) => (
                      <tr key={e.id} className="hover:bg-surface-container-high/60 transition-colors">
                        <td className="py-3.5 px-space-md font-mono text-primary font-bold">
                          {e.id}
                        </td>
                        <td className="py-3.5 px-space-md font-semibold text-on-surface">
                          {e.fullName}
                        </td>
                        <td className="py-3.5 px-space-md max-w-[240px]">
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-primary mr-2">
                            {e.enquiryType}
                          </span>
                          <span className="text-on-surface truncate">{e.subject}</span>
                        </td>
                        <td className="py-3.5 px-space-md text-xs text-outline">
                          <div>+91 {e.phone}</div>
                          <div className="truncate max-w-[140px]">{e.email}</div>
                        </td>
                        <td className="py-3.5 px-space-md">
                          <select
                            value={e.status}
                            onChange={(ev) => handleStatusChange(e.id, ev.target.value as EnquiryStatus)}
                            className={`px-2 py-1 rounded-full text-xs font-bold uppercase cursor-pointer border ${
                              e.status === 'resolved'
                                ? 'bg-primary/20 text-primary border-primary/30'
                                : e.status === 'in_progress'
                                ? 'bg-secondary-container/60 text-secondary border-secondary/30'
                                : 'bg-surface-variant text-outline border-outline/30'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-space-md text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedRecord(e)}
                              className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs font-bold uppercase"
                            >
                              Read
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(e.id)}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error-container text-outline hover:text-on-error-container"
                              title="Delete Ticket"
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
          <div className="relative max-w-lg w-full bg-surface-container rounded-3xl border border-primary/40 shadow-2xl p-space-lg flex flex-col gap-space-md">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high text-outline hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-space-sm">
              <MessageSquare className="w-8 h-8 text-primary" />
              <div>
                <span className="font-mono text-xs text-primary font-bold">{selectedRecord.id}</span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{selectedRecord.subject}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Sender</span>
                <span className="font-bold text-on-surface">{selectedRecord.fullName}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Enquiry Type</span>
                <span className="font-bold text-primary">{selectedRecord.enquiryType}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">Email</span>
                <span className="font-semibold text-on-surface truncate block">{selectedRecord.email}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-outline uppercase block">WhatsApp</span>
                <span className="font-semibold text-on-surface">+91 {selectedRecord.phone}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <span className="text-xs text-outline uppercase block mb-1">Message Content</span>
              <p className="text-xs text-on-surface leading-relaxed whitespace-pre-wrap">
                {selectedRecord.message}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-surface-variant/40">
              <span className="text-xs text-outline">
                Status: <strong className="uppercase text-primary">{selectedRecord.status}</strong>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedRecord.id, 'resolved')}
                  className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase hover:bg-primary"
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-container rounded-3xl border border-error/50 p-space-lg text-center flex flex-col gap-space-md shadow-2xl">
            <h3 className="font-headline-md text-headline-md text-error font-bold">
              Delete Enquiry Message
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              Permanently delete enquiry ticket <code className="text-primary font-mono">{deleteConfirmId}</code>?
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

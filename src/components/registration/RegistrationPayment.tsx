import React, { useState } from 'react';
import { Copy, Check, QrCode, Building, AlertTriangle } from 'lucide-react';

interface RegistrationPaymentProps {
  category: string;
  fee: number | null;
  qrUrl: string | null;
}

export const BANK_DETAILS = {
  bankName: 'Bank of Baroda',
  branch: 'Parliament-New Delhi',
  accountNumber: '05860200001973',
  ifscCode: 'BARB0PARLIA',
  accountHolder: 'Janta Live Press Network Private Limited',
};

export const RegistrationPayment: React.FC<RegistrationPaymentProps> = ({
  category,
  fee,
  qrUrl,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-surface-container border border-outline-variant/60 p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-primary">
          {category && fee
            ? `Registration Fee: ₹${fee.toLocaleString('en-IN')}`
            : 'Select a Category to View Registration Fees'}
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Pay the registration fee for your selected category using the UPI QR code or bank account details below.
        </p>
      </div>

      {/* Grid: QR Code & Bank Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* QR Section */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-high border border-outline-variant/40">
          {qrUrl ? (
            <div className="relative group">
              <img
                src={qrUrl}
                alt={`UPI QR Code for ${category} fee ₹${fee}`}
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain bg-white rounded-xl p-2.5 shadow-md border-2 border-primary/40"
              />
              <span className="block text-center mt-3 text-xs font-bold uppercase tracking-wider text-primary">
                Scan QR Code to Pay ₹{fee?.toLocaleString('en-IN')}
              </span>
            </div>
          ) : (
            <div className="w-48 h-48 sm:w-52 sm:h-52 flex flex-col items-center justify-center text-center p-4 border border-dashed border-outline-variant/60 rounded-xl bg-surface-container">
              <QrCode className="w-12 h-12 text-on-surface-variant/40 mb-2" />
              <span className="text-xs text-on-surface-variant">
                Select your category above to generate official UPI QR Code
              </span>
            </div>
          )}
        </div>

        {/* Bank Account Details */}
        <div className="md:col-span-7 flex flex-col rounded-xl bg-surface border border-outline-variant/50 p-4 sm:p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/30 mb-3">
            <Building className="w-4 h-4 text-primary" />
            <h4 className="font-serif font-bold text-sm sm:text-base text-on-surface">
              Direct Bank Transfer (NEFT / RTGS / IMPS)
            </h4>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            {/* Bank Name */}
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
                Bank Name
              </span>
              <span className="font-bold text-on-surface text-right">{BANK_DETAILS.bankName}</span>
            </div>

            {/* Branch */}
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
                Branch
              </span>
              <span className="font-semibold text-on-surface text-right">{BANK_DETAILS.branch}</span>
            </div>

            {/* Account Number with Copy */}
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
                Account Number
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary sm:text-base">
                  {BANK_DETAILS.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'acc')}
                  className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                  title="Copy account number"
                  aria-label="Copy account number"
                >
                  {copiedField === 'acc' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* IFSC Code with Copy */}
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
                IFSC Code
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-on-surface sm:text-base">
                  {BANK_DETAILS.ifscCode}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(BANK_DETAILS.ifscCode, 'ifsc')}
                  className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                  title="Copy IFSC code"
                  aria-label="Copy IFSC code"
                >
                  {copiedField === 'ifsc' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1">
              <span className="text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
                Account Holder
              </span>
              <span className="font-semibold text-on-surface text-right break-words text-xs sm:text-sm">
                {BANK_DETAILS.accountHolder}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-2 text-xs text-on-surface">
        <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>
          <strong>Important Verification Notice:</strong> After completing the transfer or scanning the QR code, please capture a clear screenshot of the transaction reference / UTR number and attach it below.
        </span>
      </div>
    </div>
  );
};

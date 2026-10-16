import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';

interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  accept: string;
  helpText: string;
  name: string;
  value: string;
  onChange: (url: string) => void;
  onError?: (msg: string) => void;
  isPhoto?: boolean;
}

const CLOUD_NAME = 'o89vqxup';
const UPLOAD_PRESET = 'rha registration 2026';
const UPLOAD_FOLDER = 'rha registration 2026';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  required = false,
  accept,
  helpText,
  name,
  value,
  onChange,
  onError,
  isPhoto = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [fileExtension, setFileExtension] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusType, setStatusType] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(formatSize(file.size));
    const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
    setFileExtension(ext);

    // Validate Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const err = `File "${file.name}" exceeds the 10 MB limit.`;
      setStatusType('error');
      setStatusMessage(err);
      onError?.(err);
      return;
    }

    // Validate MIME Type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      const err = `Unsupported file type (${file.type || ext}). Please upload JPG, PNG, WEBP, PDF, or Word DOC.`;
      setStatusType('error');
      setStatusMessage(err);
      onError?.(err);
      return;
    }

    // Preview
    if (file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewSrc(objectUrl);
    } else {
      setPreviewSrc('');
    }

    // Upload via XHR to Cloudinary to preserve progress events
    setIsUploading(true);
    setProgress(0);
    setStatusType('uploading');
    setStatusMessage('Uploading to secure server...');

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    data.append('folder', UPLOAD_FOLDER);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.secure_url) {
            setProgress(100);
            setStatusType('success');
            setStatusMessage('Upload completed successfully.');
            onChange(res.secure_url);
            setPreviewSrc(res.secure_url);
          } else {
            throw new Error('Upload succeeded but no secure URL was returned.');
          }
        } catch (err: any) {
          setStatusType('error');
          setStatusMessage('Failed to parse upload response.');
          onError?.('Failed to process upload response.');
        }
      } else {
        let errorMsg = 'Upload failed.';
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.error?.message) {
            errorMsg = res.error.message;
          }
        } catch {}
        setStatusType('error');
        setStatusMessage(errorMsg);
        onError?.(errorMsg);
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setStatusType('error');
      const networkErr = 'Network error during upload. Please check connection and retry.';
      setStatusMessage(networkErr);
      onError?.(networkErr);
    };

    xhr.send(data);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-bold text-on-surface">
          {label} {required && <span className="text-primary font-bold">*</span>}
        </label>
        {value && statusType === 'success' && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
            <CheckCircle2 className="w-3.5 h-3.5" /> Attached
          </span>
        )}
      </div>

      <div className="relative border-2 border-dashed border-outline-variant/60 hover:border-primary/60 rounded-xl p-3 sm:p-4 bg-surface-container/50 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label={label}
        />

        {/* Hidden input to preserve standard form submission & naming */}
        <input type="hidden" name={name} value={value} />

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center shrink-0 text-primary">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : statusType === 'success' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : isPhoto ? (
              <ImageIcon className="w-6 h-6" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-on-surface truncate">
              {fileName || 'Click or drag file to upload'}
            </p>
            <p className="text-[11px] text-on-surface-variant">{helpText}</p>
          </div>

          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/50 text-[11px] font-bold uppercase tracking-wider text-primary hover:border-primary shrink-0 transition-colors pointer-events-none"
          >
            {value ? 'Replace' : 'Browse'}
          </button>
        </div>

        {/* Upload Progress Status */}
        {statusType === 'uploading' && (
          <div className="mt-3 pt-3 border-t border-outline-variant/30">
            <div className="flex justify-between text-[11px] text-on-surface-variant mb-1">
              <span>Uploading {fileName}</span>
              <span className="font-bold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-container transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success or Error Indicator */}
        {statusMessage && statusType !== 'uploading' && (
          <div
            className={`mt-2.5 text-xs flex items-center gap-1.5 ${
              statusType === 'success' ? 'text-emerald-500 font-medium' : 'text-rose-500 font-semibold'
            }`}
          >
            {statusType === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="truncate">{statusMessage}</span>
          </div>
        )}

        {/* Preview Drawer */}
        {previewSrc && (
          <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center gap-3">
            <img
              src={previewSrc}
              alt="Uploaded Preview"
              className={`object-cover rounded-lg border border-outline-variant/40 ${
                isPhoto ? 'w-16 h-16 rounded-full' : 'w-20 h-14'
              }`}
            />
            <div className="text-xs text-on-surface-variant truncate">
              <span className="font-bold text-on-surface block truncate">{fileName}</span>
              <span>{fileSize} • Preview available</span>
            </div>
          </div>
        )}

        {!previewSrc && fileName && statusType === 'success' && (
          <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-[10px] text-primary">
              {fileExtension}
            </div>
            <div className="text-xs text-on-surface-variant truncate">
              <span className="font-bold text-on-surface block truncate">{fileName}</span>
              <span>{fileSize} • Attached document</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

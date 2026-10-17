import React, { useState, useId } from 'react';
import emailjs from '@emailjs/browser';
import { FileUploadField } from './FileUploadField';
import { RegistrationPayment } from './RegistrationPayment';
import { registrationService } from '../../services/registrationService';
import { PageantCategory } from '../../types';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Video
} from 'lucide-react';

interface SocialRow {
  id: string;
  platform: string;
  link: string;
  otherName: string;
}

const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/nCnCGy8b_DQ';
const EMAILJS_PUBLIC_KEY = 'EumEBVWl0H9x_zmxs';
const EMAILJS_SERVICE_ID = 'service_vp0w4j6';
const EMAILJS_TEMPLATE_ID = 'template_p9t0mfl';

const CATEGORY_CONFIG: Record<string, { fee: number; qr: string }> = {
  'Seminar': {
    fee: 1500,
    qr: 'https://jantalive.in/wp-content/uploads/2026/10/Screenshot_14-10-2026_204735_moviq.in_.jpeg',
  },
  'Award Show': {
    fee: 3000,
    qr: 'https://jantalive.in/wp-content/uploads/2026/10/Screenshot_14-10-2026_204929_moviq.in_.jpeg',
  },
  'Makeup Competition': {
    fee: 3500,
    qr: 'https://jantalive.in/wp-content/uploads/2026/10/Screenshot_14-10-2026_205842_moviq.in_.jpeg',
  },
  'VIP Guest': {
    fee: 5000,
    qr: 'https://jantalive.in/wp-content/uploads/2026/10/Screenshot_14-10-2026_205625_moviq.in_.jpeg',
  },
};

const SOCIAL_PLATFORMS = [
  'Instagram',
  'Facebook',
  'YouTube',
  'LinkedIn',
  'X (Twitter)',
  'Threads',
  'Snapchat',
  'Telegram',
  'WhatsApp',
  'Pinterest',
  'Others',
];

export const RegistrationForm: React.FC = () => {
  // Form fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [aboutYourself, setAboutYourself] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [infoConfirmation, setInfoConfirmation] = useState(false);
  const [videoConfirmation, setVideoConfirmation] = useState(false);

  // File Upload URLs from Cloudinary
  const [photoUrl, setPhotoUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [idProofUrl, setIdProofUrl] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  // Social Links dynamic rows
  const [socialLinks, setSocialLinks] = useState<SocialRow[]>([]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    candidateName: string;
    category: string;
    emailSent: boolean;
  } | null>(null);

  // Word counter calculation
  const wordCount = aboutYourself.trim()
    ? aboutYourself.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(cleaned);
  };

  const addSocialRow = () => {
    setSocialLinks((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        platform: 'Instagram',
        link: '',
        otherName: '',
      },
    ]);
  };

  const removeSocialRow = (id: string) => {
    setSocialLinks((prev) => prev.filter((row) => row.id !== id));
  };

  const updateSocialRow = (id: string, updates: Partial<SocialRow>) => {
    setSocialLinks((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...updates } : row))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Basic validation
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setFormError('Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!category) {
      setFormError('Please select a registration category.');
      return;
    }

    // 2. Upload checks
    if (!photoUrl) {
      setFormError('Please wait for the Photograph upload to complete.');
      return;
    }
    if (!portfolioUrl) {
      setFormError('Please wait for the Profile / Portfolio upload to complete.');
      return;
    }
    if (!idProofUrl) {
      setFormError('Please wait for the ID Proof upload to complete.');
      return;
    }
    if (!paymentUrl) {
      setFormError('Please wait for the Registration Fees Screenshot upload to complete.');
      return;
    }

    // 3. 100 Word count check
    if (wordCount < 100) {
      setFormError(`"About Yourself" currently has ${wordCount} words. At least 100 words are required.`);
      return;
    }

    // 4. Declaration check
    if (!infoConfirmation) {
      setFormError('Please confirm the accuracy of the provided information by checking the declaration box.');
      return;
    }

    const currentFee = CATEGORY_CONFIG[category]?.fee || 0;

    setIsSubmitting(true);

    try {
      // 5. Submit to Formcarry
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('mobile', mobile.trim());
      formData.append('email', email.trim());
      formData.append('registration_type', category);
      formData.append('registration_fee', String(currentFee));
      formData.append('photo_url', photoUrl);
      formData.append('portfolio_url', portfolioUrl);
      formData.append('id_proof_url', idProofUrl);
      formData.append('nomination_fees_screenshot_url', paymentUrl);
      formData.append('about_yourself', aboutYourself.trim());
      formData.append('video_link', videoLink.trim());
      formData.append(
        'information_confirmation',
        infoConfirmation
          ? 'I confirm that all the information provided in this registration form is true and correct.'
          : 'Not confirmed'
      );
      formData.append(
        'video_access_confirmation',
        videoConfirmation
          ? 'If provided, I confirm that the submitted video link is accessible and can be viewed by the event team.'
          : 'Not confirmed'
      );

      // Append social links to FormData
      socialLinks.forEach((row, idx) => {
        const num = idx + 1;
        formData.append(`social_media_platform_${num}`, row.platform);
        formData.append(`social_media_link_${num}`, row.link);
        if (row.platform === 'Others') {
          formData.append(`social_media_name_${num}`, row.otherName);
        }
      });

      const fcResponse = await fetch(FORMCARRY_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!fcResponse.ok) {
        let errDesc = 'Unable to complete registration. Please check your details and try again.';
        try {
          const fcJson = await fcResponse.json();
          if (fcJson?.message || fcJson?.error) {
            const rawMsg = fcJson.message || fcJson.error;
            errDesc = typeof rawMsg === 'string'
              ? rawMsg.replace(/formcarry/gi, 'registration service').replace(/emailjs/gi, 'notification service')
              : 'Unable to complete registration. Please check your details and try again.';
          }
        } catch {}
        throw new Error(errDesc);
      }

      // 6. Send EmailJS confirmation notification
      let emailSuccess = false;
      try {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        const formattedSocials = socialLinks
          .map((r) => `${r.platform === 'Others' ? r.otherName : r.platform}: ${r.link}`)
          .filter(Boolean)
          .join('\n');

        const emailParams = {
          to_email: email.trim(),
          email: email.trim(),
          name: name.trim(),
          mobile: mobile.trim(),
          registration_type: category,
          registration_fee: String(currentFee),
          photo_url: photoUrl,
          video_link: videoLink.trim(),
          information_confirmation: infoConfirmation ? 'Confirmed' : 'Not confirmed',
          video_access_confirmation: videoConfirmation ? 'Confirmed' : 'Not confirmed',
          portfolio_url: portfolioUrl,
          id_proof_url: idProofUrl,
          nomination_fees_screenshot_url: paymentUrl,
          about_yourself: aboutYourself.trim(),
          social_media_links: formattedSocials,
          submission_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams);
        emailSuccess = true;
      } catch (eje) {
        console.warn('EmailJS Notification Notice (Formcarry saved):', eje);
      }

      // 7. Save in local/Firebase registry for Admin Dashboard persistence
      const pageantCategory: PageantCategory = category.toLowerCase().includes('mr') 
        ? 'Mr' 
        : category.toLowerCase().includes('mrs') 
        ? 'Mrs' 
        : 'Miss';

      const registryResult = await registrationService.submit({
        fullName: name.trim(),
        dob: '2000-01-01',
        category: pageantCategory,
        email: email.trim(),
        phone: mobile.trim(),
        city: 'Delhi NCR',
        state: 'Delhi',
        interestedIn: [category.includes('Makeup') ? 'Makeup Competition' : category.includes('Seminar') ? 'Makeup Artist' : 'Modeling'],
        experienceLevel: 'Professional',
        portfolioUrl: portfolioUrl,
        shortIntroduction: aboutYourself.trim(),
        photoUrl: photoUrl,
        termsAccepted: true,
      });

      const refId = registryResult.registration?.id || `ICG-2026-REG-${Math.floor(1000 + Math.random() * 9000)}`;

      setSubmittedData({
        referenceId: refId,
        candidateName: name.trim(),
        category,
        emailSent: emailSuccess,
      });
    } catch (err: any) {
      console.error('Registration Submission Error:', err);
      const cleanMsg = err?.message
        ? String(err.message).replace(/formcarry/gi, 'registration service').replace(/emailjs/gi, 'notification service')
        : 'Registration could not be completed. Please check your connection and retry.';
      setFormError(cleanMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (submittedData) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl bg-surface-container border border-primary/40 p-6 sm:p-12 text-center shadow-gold-high animate-in fade-in zoom-in-95 duration-300">
        <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center">
          <img
            src="https://jantalive.in/wp-content/uploads/2026/07/channels4_profile-1.jpg"
            alt="Janta Live Official"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary border border-primary/40 font-bold text-xs uppercase tracking-widest mb-3">
          Official Dossier Confirmed
        </span>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-on-surface mb-3">
          Your Registration Has Been Submitted Successfully
        </h2>

        <p className="text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <strong className="text-primary">{submittedData.candidateName}</strong>! Your registration for{' '}
          <strong className="text-on-surface">Iconic Creation Of God — Mr/Miss/Mrs</strong> has been received successfully.
        </p>

        {/* Reference Code Card */}
        <div className="inline-flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-surface border border-outline-variant/60 mb-6 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            Official Reference ID
          </span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-primary tracking-wider mt-1">
            {submittedData.referenceId}
          </span>
          {submittedData.category && (
            <span className="mt-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide">
              {submittedData.category}
            </span>
          )}
        </div>

        <div className="text-xs text-on-surface-variant space-y-2 mb-8 text-left max-w-md mx-auto">
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
            <span>Your registration details have been submitted successfully.</span>
          </p>
          <p className="flex items-start gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                submittedData.emailSent ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span>
              {submittedData.emailSent
                ? 'A confirmation email has been sent to your registered email address.'
                : 'A confirmation email will be sent if email delivery is successful.'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span>Our event coordination team will contact you regarding the next steps.</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmittedData(null);
            setName('');
            setMobile('');
            setEmail('');
            setCategory('');
            setAboutYourself('');
            setVideoLink('');
            setPhotoUrl('');
            setPortfolioUrl('');
            setIdProofUrl('');
            setPaymentUrl('');
            setSocialLinks([]);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-black font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all duration-200 shadow-md"
        >
          <span>Submit Another Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const selectedCategoryData = category ? CATEGORY_CONFIG[category] : null;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-surface-container/70 backdrop-blur-md border border-outline-variant/60 p-5 sm:p-10 shadow-xl">
      {/* Title Header */}
      <div className="text-center mb-8 pb-6 border-b border-outline-variant/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Audition & Participation Form</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-primary">
          Mr / Miss / Mrs Iconic Creation Of God
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-xl mx-auto">
          Please fill in all the required details carefully. Upload all required credentials and proof of payment before submission.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: PERSONAL INFORMATION */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/30 mb-5">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-on-surface">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your complete legal name"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-on-surface">
                Mobile Number <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                />
                <span className="absolute right-3.5 top-3.5 text-xs text-on-surface-variant/60">
                  {mobile.length}/10
                </span>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs sm:text-sm font-bold text-on-surface">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your active email for official correspondence"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs sm:text-sm font-bold text-on-surface">
                Select Registration Category <span className="text-primary">*</span>
              </label>
              <select
                name="registration_type"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              >
                <option value="">Select a category</option>
                <option value="Seminar">Seminar (₹1,500)</option>
                <option value="Award Show">Award Show (₹3,000)</option>
                <option value="Makeup Competition">Makeup Competition (₹3,500)</option>
                <option value="VIP Guest">VIP Guest (₹5,000)</option>
              </select>
              {/* Hidden field for Formcarry fee */}
              <input
                type="hidden"
                name="registration_fee"
                value={selectedCategoryData?.fee || ''}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: PHOTOGRAPH UPLOAD */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/30 mb-5">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Attach Photograph
            </h2>
          </div>

          <FileUploadField
            label="Profile / Portrait Photograph"
            required={true}
            accept=".jpg,.jpeg,.png,.webp"
            helpText="JPG, JPEG, PNG, or WEBP • High-resolution portrait recommended"
            name="photo_url"
            value={photoUrl}
            onChange={setPhotoUrl}
            onError={(msg) => setFormError(msg)}
            isPhoto={true}
          />
        </div>

        {/* SECTION 3: ATTACHMENTS (PORTFOLIO & ID PROOF) */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/30 mb-5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Mandatory Attachments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FileUploadField
              label="Attach Profile / Portfolio"
              required={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
              helpText="PDF, DOC, DOCX, JPG, PNG or WEBP"
              name="portfolio_url"
              value={portfolioUrl}
              onChange={setPortfolioUrl}
              onError={(msg) => setFormError(msg)}
            />

            <FileUploadField
              label="Attach ID Proof (Aadhaar / Passport / DL)"
              required={true}
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              helpText="PDF, JPG, PNG or WEBP"
              name="id_proof_url"
              value={idProofUrl}
              onChange={setIdProofUrl}
              onError={(msg) => setFormError(msg)}
            />
          </div>
        </div>

        {/* SECTION 4: REGISTRATION FEES & PAYMENT DETAILS */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/30 mb-5">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Registration Fees & Payment
            </h2>
          </div>

          <RegistrationPayment
            category={category}
            fee={selectedCategoryData?.fee || null}
            qrUrl={selectedCategoryData?.qr || null}
          />

          {/* Payment Screenshot Upload */}
          <div className="mt-5">
            <FileUploadField
              label="Attach Registration Fees Screenshot"
              required={true}
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              helpText="Upload the transaction receipt or payment confirmation screenshot"
              name="nomination_fees_screenshot_url"
              value={paymentUrl}
              onChange={setPaymentUrl}
              onError={(msg) => setFormError(msg)}
            />
          </div>
        </div>

        {/* SECTION 5: ABOUT YOURSELF (MIN 100 WORDS) */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-5">
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
                About Yourself
              </h2>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                wordCount >= 100
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
              }`}
            >
              {wordCount} / 100 words {wordCount >= 100 ? '✓' : '(Required: 100)'}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-bold text-on-surface">
              Candidate Biography & Background <span className="text-primary">*</span>
            </label>
            <textarea
              name="about_yourself"
              value={aboutYourself}
              onChange={(e) => setAboutYourself(e.target.value)}
              placeholder="Tell us about yourself, your artistic journey, achievements, and aspirations in at least 100 words..."
              rows={6}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm leading-relaxed transition-all resize-y"
            ></textarea>

            <p className="text-[11px] text-on-surface-variant">
              The jury assesses your passion, poise, and background from this statement. Must contain at least 100 words.
            </p>
          </div>
        </div>

        {/* SECTION 6: SOCIAL MEDIA LINKS (DYNAMIC) */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-5">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Social Media Links <span className="text-xs text-on-surface-variant font-normal">(Optional)</span>
            </h2>
            <button
              type="button"
              onClick={addSocialRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/60 text-xs font-semibold text-primary hover:border-primary transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Link</span>
            </button>
          </div>

          {socialLinks.length === 0 ? (
            <p className="text-xs text-on-surface-variant italic">
              No social media profiles added yet. Click &quot;Add Link&quot; to include your Instagram, YouTube, or portfolio channels.
            </p>
          ) : (
            <div className="space-y-3">
              {socialLinks.map((row, idx) => (
                <div
                  key={row.id}
                  className="p-3.5 rounded-xl bg-surface border border-outline-variant/50 flex flex-col sm:flex-row items-center gap-3"
                >
                  {/* Platform Select */}
                  <div className="w-full sm:w-44 shrink-0">
                    <select
                      value={row.platform}
                      onChange={(e) => updateSocialRow(row.id, { platform: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/60 text-on-surface text-xs focus:outline-none focus:border-primary"
                    >
                      {SOCIAL_PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Profile URL */}
                  <div className="w-full flex-1">
                    <input
                      type="url"
                      value={row.link}
                      onChange={(e) => updateSocialRow(row.id, { link: e.target.value })}
                      placeholder="https://instagram.com/yourhandle"
                      className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/60 text-on-surface text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Other name input if Others selected */}
                  {row.platform === 'Others' && (
                    <div className="w-full sm:w-36">
                      <input
                        type="text"
                        value={row.otherName}
                        onChange={(e) => updateSocialRow(row.id, { otherName: e.target.value })}
                        placeholder="Platform Name *"
                        required
                        className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/60 text-on-surface text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeSocialRow(row.id)}
                    className="p-2 text-on-surface-variant hover:text-rose-500 rounded-lg transition-colors self-end sm:self-center"
                    title="Remove social link"
                    aria-label="Remove social link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 7: VIDEO OF WORK */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/30 mb-5">
            <Video className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Upload Video of Work <span className="text-xs text-on-surface-variant font-normal">(Optional)</span>
            </h2>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-bold text-on-surface">
              Video Link (Google Drive / YouTube / Vimeo)
            </label>
            <input
              type="url"
              name="video_link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />
            <p className="text-[11px] text-on-surface-variant">
              If providing Google Drive, ensure link sharing is set to: <strong>&quot;Anyone with the link can view&quot;</strong>.
            </p>
          </div>
        </div>

        {/* SECTION 8: DECLARATIONS & CONFIRMATIONS */}
        <div className="pt-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/30 mb-5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
              Confirmation & Declaration
            </h2>
          </div>

          <div className="space-y-3">
            {/* Accuracy declaration */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-outline-variant/50 cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                name="information_confirmation"
                checked={infoConfirmation}
                onChange={(e) => setInfoConfirmation(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
              />
              <span className="text-xs sm:text-sm text-on-surface leading-snug">
                I confirm that all the information provided in this registration form is true, correct, and complete to the best of my knowledge. <span className="text-primary font-bold">*</span>
              </span>
            </label>

            {/* Video access confirmation */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-outline-variant/50 cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                name="video_access_confirmation"
                checked={videoConfirmation}
                onChange={(e) => setVideoConfirmation(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
              />
              <span className="text-xs sm:text-sm text-on-surface leading-snug">
                If I have provided a video link, I confirm that it is accessible and has the required viewing permission for the event selection team.
              </span>
            </label>
          </div>
        </div>

        {/* Error Box */}
        {formError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-500 text-xs sm:text-sm animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-gradient-to-r from-primary-container via-primary to-primary-container text-black font-serif font-bold text-base sm:text-lg tracking-wider uppercase shadow-gold-high hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Official Registration</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-on-surface-variant mt-3">
            Secure 256-bit encrypted submission. Official reference verification provided immediately upon registration.
          </p>
        </div>
      </form>
    </div>
  );
};

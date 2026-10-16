import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const pdfService = {
  async downloadElementAsPdf(elementId: string, filename: string): Promise<boolean> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found.`);
      return false;
    }

    try {
      // Capture at high resolution scale 2 for crisp print quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#110d0a',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
      return true;
    } catch (err) {
      console.error('PDF generation failed:', err);
      // Fallback: window.print()
      window.print();
      return false;
    }
  },

  printPage(): void {
    window.print();
  },
};

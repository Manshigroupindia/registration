import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 120,
  className = '',
  darkColor = '#17130f',
  lightColor = '#f2c148',
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor,
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [value, size, darkColor, lightColor]);

  if (!dataUrl) {
    return <div style={{ width: size, height: size }} className={`bg-surface-container animate-pulse ${className}`} />;
  }

  return (
    <img
      src={dataUrl}
      alt={`QR Code verification for ${value}`}
      width={size}
      height={size}
      className={`rounded shadow-sm ${className}`}
    />
  );
};

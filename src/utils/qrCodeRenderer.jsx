import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const QRCodeRenderer = ({ value, size = 190, level = "H", className = "" }) => {
  return (
    <div className={`qr-code-container ${className}`} style={{ background: '#ffffff', padding: '12px', borderRadius: '16px', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
      <QRCodeSVG
        value={value}
        size={size}
        level={level}
        includeMargin={true}
        imageSettings={{
          src: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍱</text></svg>",
          x: undefined,
          y: undefined,
          height: 28,
          width: 28,
          excavate: true,
        }}
      />
    </div>
  );
};

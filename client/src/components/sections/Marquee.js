import React from 'react';

const WORDS = ['Vastu Plans', '3D Elevation', 'Interior Design', 'Approvals', 'Construction', 'Structural Design', 'Turnkey Projects'];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="s-marquee" aria-hidden="true">
      <div className="s-marquee-track">
        {[0, 1].map(k => (
          <div className="s-marquee-row" key={k}>
            {row.map((w, i) => <span key={i}>{w}<i /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

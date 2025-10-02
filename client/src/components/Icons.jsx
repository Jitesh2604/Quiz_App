import React from "react";

export const BrainIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.38a2 2 0 0 1 1.94 2.52c-.22.64-.46 1.25-.73 1.82" />
    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5v1.2a1 1 0 0 1-1 1h-.38a2 2 0 0 0-1.94 2.52c.22.64.46 1.25.73 1.82" />
    <path d="M4.5 10.5a2.5 2.5 0 0 1 0-5" />
    <path d="M19.5 10.5a2.5 2.5 0 0 0 0-5" />
    <path d="M12 13a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H9a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h1.5" />
    <path d="M12 13a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-1.5" />
    <path d="M12 13v8" />
    <path d="M9 21h6" />
  </svg>
);

export const UserIcon = ({ className }) => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
  >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
  </svg>
);

export const MailIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);    
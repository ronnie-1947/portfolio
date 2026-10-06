// Home content column: 1280px (1440px from 1920), gutters per tier, and extra
// left padding while the fixed side dock would otherwise overlap the content.
export default function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rb-container ${className}`}>{children}</div>;
}

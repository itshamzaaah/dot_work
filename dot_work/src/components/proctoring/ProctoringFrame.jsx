export default function ProctoringFrame({ children }) {
  return (
    <div
      className="min-h-screen bg-white"
      style={{
        boxShadow: "inset 0 0 0 4px #ef4444", // Tailwind red-500
      }}
    >
      {children}
    </div>
  );
}

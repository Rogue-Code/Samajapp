import logo from "@/assets/sangath-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Sangath"
      className={className}
    />
  );
}

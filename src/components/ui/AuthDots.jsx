
export function AuthDots() {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: 0.12, backgroundImage: "radial-gradient(rgba(16,185,129,0.3) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
      <div style={{ position: "absolute", top: "25%", left: "25%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "25%", right: "25%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)", filter: "blur(40px)" }} />
    </>
  );
}
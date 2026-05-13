const particles = [
  { left: "6%", top: "22%", size: "10px", delay: "0s", duration: "8s" },
  { left: "14%", top: "68%", size: "9px", delay: "1.1s", duration: "10s" },
  { left: "24%", top: "36%", size: "11px", delay: "2s", duration: "9s" },
  { left: "34%", top: "78%", size: "8px", delay: "0.5s", duration: "11s" },
  { left: "46%", top: "26%", size: "10px", delay: "1.7s", duration: "10s" },
  { left: "58%", top: "64%", size: "9px", delay: "2.4s", duration: "12s" },
  { left: "69%", top: "31%", size: "11px", delay: "1.3s", duration: "9s" },
  { left: "78%", top: "74%", size: "8px", delay: "3s", duration: "13s" },
  { left: "87%", top: "28%", size: "10px", delay: "1.9s", duration: "10s" },
  { left: "94%", top: "62%", size: "9px", delay: "2.8s", duration: "12s" },
];

export default function FloatingHachiHeader() {
  return (
    <div className="header-hachi-layer" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="header-hachi"
          style={
            {
              "--left": particle.left,
              "--top": particle.top,
              "--size": particle.size,
              "--delay": particle.delay,
              "--duration": particle.duration,
            } as React.CSSProperties
          }
        >
          はち
        </span>
      ))}
    </div>
  );
}

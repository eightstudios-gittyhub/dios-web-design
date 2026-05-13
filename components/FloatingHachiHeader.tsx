const particles = [
  { left: "6%", top: "22%", size: "12px", delay: "0s", duration: "10s", flyX1: "42px", flyY1: "-16px", flyX2: "18px", flyY2: "24px", flyX3: "-30px", flyY3: "-20px" },
  { left: "14%", top: "68%", size: "8px", delay: "1.1s", duration: "13s", flyX1: "-28px", flyY1: "-32px", flyX2: "38px", flyY2: "-12px", flyX3: "20px", flyY3: "30px" },
  { left: "24%", top: "36%", size: "15px", delay: "2s", duration: "11s", flyX1: "56px", flyY1: "22px", flyX2: "-30px", flyY2: "-26px", flyX3: "-40px", flyY3: "18px" },
  { left: "34%", top: "78%", size: "9px", delay: "0.5s", duration: "14s", flyX1: "-48px", flyY1: "-24px", flyX2: "24px", flyY2: "-38px", flyX3: "34px", flyY3: "26px" },
  { left: "46%", top: "26%", size: "13px", delay: "1.7s", duration: "12s", flyX1: "34px", flyY1: "34px", flyX2: "-42px", flyY2: "12px", flyX3: "-24px", flyY3: "-28px" },
  { left: "58%", top: "64%", size: "10px", delay: "2.4s", duration: "15s", flyX1: "-36px", flyY1: "18px", flyX2: "46px", flyY2: "-30px", flyX3: "28px", flyY3: "24px" },
  { left: "69%", top: "31%", size: "16px", delay: "1.3s", duration: "11.5s", flyX1: "50px", flyY1: "-28px", flyX2: "-24px", flyY2: "30px", flyX3: "-36px", flyY3: "-22px" },
  { left: "78%", top: "74%", size: "8px", delay: "3s", duration: "16s", flyX1: "-42px", flyY1: "-34px", flyX2: "32px", flyY2: "-8px", flyX3: "30px", flyY3: "18px" },
  { left: "87%", top: "28%", size: "14px", delay: "1.9s", duration: "12.5s", flyX1: "28px", flyY1: "30px", flyX2: "-50px", flyY2: "-22px", flyX3: "-20px", flyY3: "24px" },
  { left: "94%", top: "62%", size: "11px", delay: "2.8s", duration: "15.5s", flyX1: "-54px", flyY1: "14px", flyX2: "22px", flyY2: "-36px", flyX3: "38px", flyY3: "28px" },
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
              "--fly-x-1": particle.flyX1,
              "--fly-y-1": particle.flyY1,
              "--fly-x-2": particle.flyX2,
              "--fly-y-2": particle.flyY2,
              "--fly-x-3": particle.flyX3,
              "--fly-y-3": particle.flyY3,
            } as React.CSSProperties
          }
        >
          はち
        </span>
      ))}
    </div>
  );
}

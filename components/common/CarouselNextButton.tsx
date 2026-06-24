interface CarouselNextButtonProps {
  top?: string;
  onClick?: () => void;
}

export function CarouselNextButton({ top = "40%", onClick }: Readonly<CarouselNextButtonProps>) {
  return (
    <button
      aria-label="Next"
      onClick={onClick}
      className="absolute hidden lg:flex items-center justify-center"
      style={{
        top,
        right: "-24px",
        transform: "translateY(-50%)",
        width: "73px",
        height: "197px",
        borderRadius: "12px",
        background: "rgba(35, 23, 6, 0.40)",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="28"
          viewBox="0 0 16 28"
          fill="none"
        >
          <path
            d="M2 26L14 14L2 2"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

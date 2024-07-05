import { FC } from "react";

interface Props {
  items: any[];
  animate?: boolean;
  shadows?: boolean;
}

const LogoCarousel: FC<Props> = ({
  items,
  animate = true,
  shadows = false,
}) => {
  return (
    <div
      className="flex  overflow-hidden h-7 w-full "
      style={{
        maskImage: `${
          shadows &&
          "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)"
        }`,
      }}
    >
      {/* If your text don't fit entirely on your screen, try increasing the length of the array below. */}

      <div className={`flex shrink-0  ${animate && " animate-logo-carousel"}`}>
        {items.map(({ text, classes }) => (
          <p
            key={text}
            className={`text-4xl ml-4 rounded-sm font-bold tracking-tight leading-[5rem] px-[0.8rem] text-red-600 ${classes}`}
          >
            {text}asdasd
          </p>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;

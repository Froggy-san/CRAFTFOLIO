type element =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "div"
  | undefined;

interface TruncateTextProps {
  text: string;
  textLenght?: number;
  element?: element;
  className?: string;
  ariaLabel?: string;
}
const TruncateText = ({
  text,
  textLenght = 500,
  element,
  className,
  ariaLabel,
}: TruncateTextProps) => {
  function handleTruncateText() {
    return text.length < textLenght ? text : text.slice(0, textLenght) + "...";
  }

  switch (element) {
    case "h1":
      return (
        <h1 aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </h1>
      );
    case "h2":
      return (
        <h2 aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </h2>
      );
    case "h3":
      return (
        <h3 aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </h3>
      );
    case "h4":
      return (
        <h4 aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </h4>
      );
    case "h5":
      return (
        <h5 aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </h5>
      );
    case "h6":
      return (
        <h6 aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </h6>
      );
    case "p":
      return (
        <p aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </p>
      );
    case "div":
      return (
        <div aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </div>
      );
    default:
      return (
        <p aria-label={ariaLabel} className={className}>
          {handleTruncateText()}
        </p>
      );
  }
};

export default TruncateText;

import { Link } from "react-router-dom";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link to="/" className={`flex flex-col leading-5  ${className}`}>
      <p>CRAFT</p>
      <p>FOLIO</p>
    </Link>
  );
};

export default Logo;

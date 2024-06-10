import Loading from "./Loading";

const FullSnLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`h-[91dvb] flex items-center justify-center overflow-hidden ${className}`}
    >
      <Loading size={30} />
    </div>
  );
};

export default FullSnLoading;

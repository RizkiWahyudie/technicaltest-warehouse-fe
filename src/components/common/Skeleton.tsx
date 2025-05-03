interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;

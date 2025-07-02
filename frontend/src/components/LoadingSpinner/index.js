const LoadingSpinner = ({ size = 'md', color = 'indigo' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };
  
  const colorClasses = {
    indigo: 'border-indigo-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };
  
  return (
    <div className="flex justify-center items-center py-12">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
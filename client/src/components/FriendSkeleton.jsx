const FriendSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="card bg-base-200 p-5 animate-pulse"
        >
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 rounded-full bg-base-300"></div>

            <div className="flex-1">
              <div className="h-4 w-24 bg-base-300 rounded mb-2"></div>
              <div className="h-3 w-16 bg-base-300 rounded"></div>
            </div>
          </div>

          <div className="h-8 mt-5 bg-base-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default FriendSkeleton;
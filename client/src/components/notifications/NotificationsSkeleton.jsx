const NotificationsSkeleton = () => {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-10">
        <div className="h-8 w-60 bg-base-300 rounded animate-pulse"></div>
        <div className="h-4 w-96 bg-base-300 rounded animate-pulse mt-3"></div>
      </div>

      <div className="space-y-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-base-300 animate-pulse"></div>

                  <div className="space-y-3">
                    <div className="h-5 w-36 rounded bg-base-300 animate-pulse"></div>

                    <div className="h-4 w-24 rounded bg-base-300 animate-pulse"></div>

                    <div className="h-4 w-44 rounded bg-base-300 animate-pulse"></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-10 w-24 rounded bg-base-300 animate-pulse"></div>

                  <div className="h-10 w-24 rounded bg-base-300 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSkeleton;

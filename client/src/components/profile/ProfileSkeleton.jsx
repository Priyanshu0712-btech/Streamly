const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto max-w-6xl p-4 space-y-6 animate-pulse">
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-base-300"></div>

            <div className="flex-1 space-y-4 w-full">
              <div className="h-8 w-56 bg-base-300 rounded"></div>

              <div className="h-5 w-72 bg-base-300 rounded"></div>

              <div className="h-5 w-44 bg-base-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="card bg-base-200">
            <div className="card-body space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-12 rounded bg-base-300" />
              ))}
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-12 rounded bg-base-300" />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-200">
            <div className="card-body space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-4 rounded bg-base-300" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

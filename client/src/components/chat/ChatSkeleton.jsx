const ChatSkeleton = () => {
  return (
    <div className="flex flex-col">
      {/* Header Skeleton */}
      <div className="border-b p-4">
        <div className="h-6 w-32 animate-pulse rounded bg-base-300"></div>
      </div>

      {/* Search Skeleton */}
      <div className="border-b p-4">
        <div className="h-12 w-full animate-pulse rounded-lg bg-base-300"></div>
      </div>

      {/* Conversation Skeleton */}
      <div className="flex-1 space-y-2 p-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg p-3"
          >
            {/* Avatar */}
            <div className="h-12 w-12 animate-pulse rounded-full bg-base-300"></div>

            {/* Name & Last Message */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-base-300"></div>
              <div className="h-3 w-24 animate-pulse rounded bg-base-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSkeleton;
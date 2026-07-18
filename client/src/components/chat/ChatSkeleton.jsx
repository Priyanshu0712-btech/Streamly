const ChatSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-lg bg-base-200"
        />
      ))}
    </div>
  );
};

export default ChatSkeleton;
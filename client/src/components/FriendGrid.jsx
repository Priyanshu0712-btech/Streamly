import FriendCard from "./FriendCard";

const FriendGrid = ({ friends }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {friends.map((friend) => (
        <FriendCard
          key={friend._id}
          friend={friend}
        />
      ))}
    </div>
  );
};

export default FriendGrid;
import useAuthUser from "../hooks/useAuthUser";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";

const ProfilePage = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-base-100">
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <ProfileHeader user={authUser} />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="space-y-6">
            <ProfileInfoCard user={authUser} />

            <ProfileStats user={authUser} />
          </div>

          <div className="lg:col-span-2">
            <ProfileBio user={authUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

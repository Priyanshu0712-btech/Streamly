import { GlobeIcon, LanguagesIcon, MailIcon, MapPinIcon } from "lucide-react";

const ProfileInfoCard = ({ user }) => {
  return (
    <div className="card bg-base-200 border border-base-300 shadow-md">
      <div className="card-body">
        <h2 className="card-title mb-2">Personal Information</h2>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <MailIcon className="size-5 text-primary" />

            <div>
              <p className="text-xs text-base-content/60">Email</p>

              <p className="font-medium break-all">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPinIcon className="size-5 text-primary" />

            <div>
              <p className="text-xs text-base-content/60">Location</p>

              <p className="font-medium">{user?.location || "Not Added"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguagesIcon className="size-5 text-primary" />

            <div>
              <p className="text-xs text-base-content/60">Native Language</p>

              <p className="font-medium">
                {user?.nativeLanguage || "Not Added"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GlobeIcon className="size-5 text-primary" />

            <div>
              <p className="text-xs text-base-content/60">Learning Language</p>

              <p className="font-medium">
                {user?.learningLanguage || "Not Added"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;

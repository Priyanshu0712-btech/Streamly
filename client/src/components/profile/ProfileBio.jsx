import { FileTextIcon } from "lucide-react";

const ProfileBio = ({ user }) => {
  return (
    <div className="card bg-base-200 border border-base-300 shadow-md h-full">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <FileTextIcon className="size-5 text-primary" />

          <h2 className="card-title">About Me</h2>
        </div>

        {user?.bio ? (
          <div className="rounded-xl bg-base-100 p-5 leading-8 text-base-content/80">
            {user.bio}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-base-300 bg-base-100 py-12">
            <FileTextIcon className="size-12 text-base-content/30 mb-3" />

            <h3 className="text-lg font-semibold">No Bio Yet</h3>

            <p className="text-center text-sm text-base-content/60 mt-2 max-w-sm">
              This user hasn't added a bio yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;

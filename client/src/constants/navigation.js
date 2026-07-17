import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

export const navigation = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    id: 2,
    label: "Friends",
    path: "/friends",
    icon: UsersIcon,
  },
  {
    id: 3,
    label: "Notifications",
    path: "/notifications",
    icon: BellIcon,
  },
];

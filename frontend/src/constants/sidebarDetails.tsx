import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { SidebarDetails } from "../@types/sidebar.types";

export const SIDEBAR_DETAILS: SidebarDetails[] = [
  {
    label: "Dashboard",
    redirection_link: "/",
    icon: () => <DashboardIcon />,
  },
  {
    label: "Users",
    redirection_link: "/users",
    icon: () => <PeopleAltIcon />,
  },
];

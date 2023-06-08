import { ServiceScope } from "@microsoft/sp-core-library";
export interface IPersonalDashboardProps {
  hasTeamsContext: boolean;
  serviceScope: ServiceScope;
  userLoginName: string;
  siteUrl: string;
}

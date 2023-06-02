import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient } from "@microsoft/sp-http";
export interface IPersonalDashboardProps {
  hasTeamsContext: boolean;
  serviceScope: ServiceScope;
  httpClient: HttpClient;
}

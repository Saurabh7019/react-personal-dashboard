import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClientV3, AadHttpClientFactory, AadHttpClient, HttpClient, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IListItem } from '../models/IListItem';

export interface IDataFetcherService {
    getSelectedWidgets(userName: string, baseUrl: string): Promise<string>;
    getOrgWidgets(baseUrl: string): Promise<IListItem[]>
    executeMSGraphAPIRequest(api: string): Promise<JSON>;
    executeADSecureAPIRequest(api: string, clientId: string): Promise<JSON>;
    executePublicAPIRequest(api: string): Promise<JSON>;
}

export class DataFetcherService implements IDataFetcherService {

    public static readonly serviceKey: ServiceKey<IDataFetcherService> = ServiceKey.create<IDataFetcherService>('mpd:IDataFetcherService', DataFetcherService);

    private _msGraphClientFactory: MSGraphClientFactory;
    private _aadHttpClientFactory: AadHttpClientFactory;
    private _httpClient: HttpClient;
    private _spHttpClient: SPHttpClient;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
            this._aadHttpClientFactory = serviceScope.consume(AadHttpClientFactory.serviceKey);
            this._httpClient = serviceScope.consume(HttpClient.serviceKey);
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
        });
    }

    public async getSelectedWidgets(userName: string, baseUrl: string): Promise<string> {
        let selectWidgets: string;
        const encodedUserName = encodeURIComponent('i:0#.f|membership|' + userName);
        const response: SPHttpClientResponse = await this._spHttpClient.get(
            baseUrl + "/_api/sp.userprofiles.peoplemanager/getuserprofilepropertyfor(accountName=@v,%20propertyname='SelectedApps')?@v=%27" + encodedUserName + "%27",
            SPHttpClient.configurations.v1
        );
        if (response.ok) {
            const data = await response.json();
            selectWidgets = data.value;
        }
        return selectWidgets;
    }

    public async setSelectedWidgets(userName: string, baseUrl: string, ids: string[]): Promise<void> {
        await this._spHttpClient.post(
            baseUrl + "/_api/SP.UserProfiles.PeopleManager/SetSingleValueProfileProperty",
            SPHttpClient.configurations.v1,
            {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': '',
                },
                body: JSON.stringify(
                    {
                        'accountName': `i:0#.f|membership|${userName}`,
                        'propertyName': "SelectedApps",
                        'propertyValue': ids.join(',')
                    }
                )
            }
        );
    }

    public async getOrgWidgets(baseUrl: string): Promise<IListItem[]> {
        const widgets: IListItem[] = [];
        try {
            const tenantAppCatalogUrl = await this._getTenantAppcatalogUrl(baseUrl);
            const response: SPHttpClientResponse = await this._spHttpClient.get(
                tenantAppCatalogUrl +
                `/_api/web/lists/GetByTitle('Dashobard Widgets')/Items?$select=Id,WidgetTitle,IconName,AADClientId,DisplayTemplate,ErrorTemplate,ResourceEndpoint,HelpURL,ViewDetails`,
                SPHttpClient.configurations.v1
            );

            if (response.ok) {
                const data = await response.json();
                data.value.forEach((item) => {
                    widgets.push({
                        id: item.Id,
                        title: item.WidgetTitle,
                        icon: item.IconName,
                        clientId: item.AADClientId,
                        display: item.DisplayTemplate,
                        error: item.ErrorTemplate,
                        api: item.ResourceEndpoint,
                        selected: false,
                        help: item.HelpURL,
                        details: item.ViewDetails
                    });
                });
            } else {
                throw new Error(`Failed to fetch org widgets. Status: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        return widgets;
    }

    private async _getTenantAppcatalogUrl(url): Promise<string> {
        const requestUrl = url.concat("/_api/SP_TenantSettings_Current");
        const result: SPHttpClientResponse = await this._spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
        const response = await result.json();
        return response?.CorporateCatalogUrl;
    }

    public async executeMSGraphAPIRequest(api: string): Promise<JSON> {
        try {
            const client: MSGraphClientV3 = await this._msGraphClientFactory.getClient('3');
            const response = await client.api(api).get();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async executeADSecureAPIRequest(api: string, clientId: string): Promise<JSON> {
        try {
            const client = await this._aadHttpClientFactory.getClient(clientId);
            const response = await client.get(api, AadHttpClient.configurations.v1);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async executePublicAPIRequest(api: string): Promise<JSON> {
        try {
            const response = await this._httpClient.get(api, HttpClient.configurations.v1);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
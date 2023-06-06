import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { AadHttpClientFactory, AadHttpClient, HttpClient } from '@microsoft/sp-http';

export interface IDataFetcherService {
    executeADSecureAPIRequest(api: string, clientId: string): Promise<JSON>;
    executePublicAPIRequest(api: string): Promise<JSON>;
}

export class DataFetcherService implements IDataFetcherService {

    public static readonly serviceKey: ServiceKey<IDataFetcherService> = ServiceKey.create<IDataFetcherService>('mpd:IDataFetcherService', DataFetcherService);

    private _aadHttpClientFactory: AadHttpClientFactory;
    private _httpClient: HttpClient;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._aadHttpClientFactory = serviceScope.consume(AadHttpClientFactory.serviceKey);
            this._httpClient = serviceScope.consume(HttpClient.serviceKey);
        });
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
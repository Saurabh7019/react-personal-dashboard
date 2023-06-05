import { SPFI, spfi, SPBrowser } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/profiles";
import "@pnp/sp/site-users";
import { IListItem } from "../models/IListItem";

export class SharePointService {
    private _sp: SPFI;

    public constructor(siteUrl: string,) {
        this._sp = spfi().using(SPBrowser({ baseUrl: siteUrl }));
    }

    public async getOrgWidgets(): Promise<IListItem[]> {
        const widgets: IListItem[] = [];

        const listItems = await this._sp.web.lists
            .getByTitle('Dashobard Widgets').items
            .select(
                'Id',
                'WidgetTitle',
                'IconName',
                'AADClientId',
                'DisplayTemplate',
                'ErrorTemplate',
                'ResourceEndpoint'
            )
            .orderBy('WidgetTitle', true)
            .getAll();

        listItems.forEach((item) => {
            widgets.push({
                id: item.Id,
                title: item.WidgetTitle,
                icon: item.IconName,
                clientId: item.AADClientId,
                display: item.DisplayTemplate,
                error: item.ErrorTemplate,
                api: item.ResourceEndpoint,
                selected: false
            });
        });

        return widgets;
    }

    public async getSelectedWidgets(): Promise<string> {
        const currentUser = await this._sp.web.currentUser.select('LoginName')();
        const selectedApps = await this._sp.profiles.getUserProfilePropertyFor(currentUser.LoginName, 'SelectedApps');
        return selectedApps;
    }

    public async setSelectedWidgets(ids: string[]): Promise<void> {
        const currentUser = await this._sp.web.currentUser.select('LoginName')();
        await this._sp.profiles.setSingleValueProfileProperty(currentUser.LoginName, "SelectedApps", ids.join(','))
    }
}
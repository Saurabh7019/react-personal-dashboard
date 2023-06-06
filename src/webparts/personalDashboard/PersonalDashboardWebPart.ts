import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import * as strings from 'PersonalDashboardWebPartStrings';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PersonalDashboard from './components/PersonalDashboard';
import { IPersonalDashboardProps } from './components/IPersonalDashboardProps';

export interface IPersonalDashboardWebPartProps {
  widgetsSiteUrl: string;
}

export default class PersonalDashboardWebPart extends BaseClientSideWebPart<IPersonalDashboardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalDashboardProps> = React.createElement(
      PersonalDashboard,
      {
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        serviceScope: this.context.serviceScope,
        widgetSiteUrl: this.properties.widgetsSiteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('widgetsSiteUrl', {
                  label: strings.WidgetsSiteUrlURLFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

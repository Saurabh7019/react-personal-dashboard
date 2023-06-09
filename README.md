# react-personal-dashboard

## Summary

The Personal Dashboard app, built using the SharePoint framework, offers a versatile solution for organizations across various platforms such as Teams, Outlook, and Office. This app enables seamless integration with both public and enterprise APIs, allowing users to effortlessly consume and leverage their desired APIs within their personalized workspace.

With the Personal Dashboard app, users have the flexibility to handpick and configure org-wide widgets that align with their specific needs and preferences. They can easily select and arrange these widgets in their personal dashboard, ensuring a customized and tailored experience.

In action this looks like:

Configuration:

![Configuring a widget with MS Graph API](./assets/Configuration.gif)

Selection:

![Setting up user's personal dashboard](./assets/selection.gif)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.15.0](https://img.shields.io/badge/version-1.15-green.svg)
![Node.js v16 | v14 | v12](https://img.shields.io/badge/Node.js-v16%20%7C%20v12%20%7C%20v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-gre

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Widgets list in tenant app catalog site, with the Title "Dashboard Widgets" and the below columns:

Column Internal Name|Type|Required| comments
--------------------|----|--------|----------
WidgetTitle | Text| Yes
IconName | Text | No
DisplayTemplate | Note | No
ErrorTemplate | Note | No
ResourceEndpoint | Text | No
AADClientId | Text | No
HelpURL | Text | No
ViewDetails | Text | No

> Deploy the list using script [create-dashboard-list.ps](./scripts/create-dashboard-list.ps1)

## Contributors

* [Saurabh Tripathi](https://github.com/saurabh7019
## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | June 9, 2023 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add and Deploy Package to AppCatalog
- Go to API Management - from SharePoint Admin Center new experience, and Approve the Permission Require to Use Graph API SCOPES
- Deploy Widget Dashboard list using script [create-dashboard-list.ps](./scripts/create-dashboard-list.ps1)

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This app illustrates the following concepts on top of the SharePoint Framework:

- Enables organizations to consume APIs (public and enterprise) easily
- Allows configuration of org-wide widgets
- Users can select and arrange apps in their personal dashboard
- Utilizes handlebars templates for visually appealing UI without complex deployment
- Easy customization of templates to adapt to different data formats

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

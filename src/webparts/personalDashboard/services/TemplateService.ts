import { ITemplateService } from './ITemplateService';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import * as Handlebars from 'handlebars';

export class TemplateService implements ITemplateService {
    private _handlebars: typeof Handlebars;
    get Handlebars(): typeof Handlebars {
        return this._handlebars;
    }

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._handlebars = Handlebars.create();
        });
    }

    public async renderTemplate(template: string, data: any): Promise<string> {
        try {
            const compiledTemplate = this._handlebars.compile(template, {
                noEscape: true
            });
            const html = compiledTemplate(data);
            return html;
        } catch (err) {
            throw err;
        }
    }
}
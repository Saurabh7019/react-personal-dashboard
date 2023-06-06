import * as Handlebars from 'handlebars';

export class TemplateService {
    private _handlebars: typeof Handlebars;

    public constructor() {
        this._handlebars = Handlebars.create();
    }

    public async renderTemplate(template: string, data: object): Promise<string> {
        const compiledTemplate = this._handlebars.compile(template, {
            noEscape: true
        });
        const html = compiledTemplate(data);
        return html;
    }
}
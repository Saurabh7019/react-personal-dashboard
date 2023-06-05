export interface ITemplateService {
    renderTemplate(template: string, data: object): Promise<string>;
}
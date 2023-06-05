export interface ITemplateService {
    renderTemplate(template: string, data: any): Promise<string>;
}
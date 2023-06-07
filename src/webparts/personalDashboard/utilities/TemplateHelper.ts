import * as Handlebars from 'handlebars';

export default class TemplateHelper {

    public static registerHelpers(handlebars: typeof Handlebars): void {
        handlebars.registerHelper('log', TemplateHelper.logHelper);
        handlebars.registerHelper('dateFormat', TemplateHelper.dateFormatHelper);
        handlebars.registerHelper('isDueDatePassed', TemplateHelper.isDueDatePassedHelper);
    }

    public static logHelper(data: string): string {
        // console.log(data);
        const jsonString = JSON.stringify(data, null, 2);
        return jsonString;
    }

    public static dateFormatHelper(date: string): string {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    public static isDueDatePassedHelper(date: string): boolean {
        const dueDate = new Date(date);
        const currentDate = new Date();
        return dueDate < currentDate;
    }
}
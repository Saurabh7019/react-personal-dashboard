import * as React from 'react';
import styles from './PersonalDashboard.module.scss';
import { IPersonalDashboardProps } from './IPersonalDashboardProps';
import { IPersonalDashboardState } from './IPersonalDashboardState';
import { ITemplateService } from '../services/ITemplateService';
import { TemplateService } from '../services/TemplateService';
import ReactHtmlParser from 'react-html-parser';

export default class PersonalDashboard extends React.Component<IPersonalDashboardProps, IPersonalDashboardState> {
  constructor(props: IPersonalDashboardProps) {
    super(props);
    this.state = {
      html: null
    };
  }

  public async componentDidMount(): Promise<void> {
    const {
      serviceScope
    } = this.props;

    const template = '<h1>{{title}}</h1><p>{{description}}</p>';
    const data = {
      title: 'Hello, Handlebars!',
      description: 'This is a sample template rendering.',
    };

    const hbs: ITemplateService = new TemplateService(serviceScope);
    const html = await hbs.renderTemplate(template, data);
    this.setState({
      html
    });
  }

  public render(): React.ReactElement<IPersonalDashboardProps> {
    return (
      <section className={`${styles.personalDashboard}}`}>
        <div className={styles.welcome}>
          {ReactHtmlParser(this.state.html)}
        </div>
      </section>
    );
  }
}

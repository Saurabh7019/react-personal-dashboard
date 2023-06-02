import * as React from 'react';
import styles from './PersonalDashboard.module.scss';
import { IPersonalDashboardProps } from './IPersonalDashboardProps';

export default class PersonalDashboard extends React.Component<IPersonalDashboardProps, {}> {
  public render(): React.ReactElement<IPersonalDashboardProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.personalDashboard} ${hasTeamsContext ? styles.teams : ''}`}>
        <div>My personal dashboard...</div>
      </section>
    );
  }
}

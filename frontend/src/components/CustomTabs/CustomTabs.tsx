import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
//@Material-ui/core
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
// core components
import { Card } from '../Card/Card';
import { CardBody } from '../Card/CardBody';
import { CardHeader } from '../Card/CardHeader';

import useStyles from '../../assets/jss/material-kit-react/components/customTabsStyle';
import { Color } from '../CustomButtons/Button';

type Shape = {
  tabName: string,
  tabIcon?: React.ReactNode,
  tabContent: React.ReactNode,
}
type Props = {
  headerColor?: Color,
  title?: string,
  tabs?: Shape[],
  rtlActive?: boolean,
  plainTabs?: boolean,
};

export const CustomTabs: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    setValue(value);
  };
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive,
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
          }}
        >
          {tabs && tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon:
                  typeof prop.tabIcon === 'string' ? (
                    <Icon>{prop.tabIcon}</Icon>
                  ) : ''
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  /*label: classes.tabLabel,*/
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs && tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

export default CustomTabs;

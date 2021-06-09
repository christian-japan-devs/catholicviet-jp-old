import React from 'react';
//nodejs library that concatenates classes
import classNames from 'classnames';

//core components
import { cardBodyStyle } from '../../assets/jss/material-kit-react/components/cardBodyStyle';

type Props = {
    className: string,
    children: React.ReactNode,
};

export const CardBody: React.FC<Props> = (props) => {
    const classes = cardBodyStyle();
    const { className, children, ...rest } = props;
    const cardBodyClasses = classNames({
        [classes.cardBody]: true,
        [className]: className !== undefined,
    })
    return (
        <div className={cardBodyClasses} {...rest}>
            {props.children}
        </div>
    );
}

export default CardBody;
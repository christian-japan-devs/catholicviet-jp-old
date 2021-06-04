import React from 'react';
//nodejs library that concatenates classes
import classNames from 'classnames';

//core components
import { cardBodyStyle } from '../../assets/jss/material-kit-react/components/cardBodyStyle';

type propTypes = {
    className: string,
    children: React.ReactNode,
};

const Card: React.FC<propTypes> = (props: propTypes) => {
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

export default Card;
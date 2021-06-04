import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';

//core components
import cardFooterStyles from '../../assets/jss/material-kit-react/components/cardFooterStyle';

type propTypes = {
    className: string,
    children: React.ReactNode
}

const CardFooter: React.FC<propTypes> = (props: propTypes) => {
    const classes = cardFooterStyles();
    const { className, children, ...rest } = props;
    const cardFooterClasses = classNames({
        [classes.cardFooter]: true,
        [className]: className !== undefined,
    });
    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    )

}
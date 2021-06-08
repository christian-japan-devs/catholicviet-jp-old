import React from 'react';
//nodejs library that concatenates classes
import classNames from 'classnames';

//core components
import { cardStyle } from '../../assets/jss/material-kit-react/components/cardStyle';

type Props = {
    className: string,
    plain: boolean,
    carousel: boolean,
    children: React.ReactNode,
};

export const Card: React.FC<Props> = (props) => {
    const classes = cardStyle();
    const { className, children, plain, carousel, ...rest } = props;
    const cardClassess = classNames({
        [classes.card]: true,
        [classes.cardPlain]: props.plain,
        [classes.cardCarousel]: props.carousel,
        [className]: className !== undefined,
    })
    return (
        <div className={cardClassess} {...rest}>
            {props.children}
        </div>
    );
}

export default Card;
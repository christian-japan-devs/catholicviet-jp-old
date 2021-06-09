import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';

//core components
import { cardHeaderStyle } from '../../assets/jss/material-kit-react/components/cardHeaderStyle';
import { Color } from '../CustomButtons/Button';

type Props = {
    className: string,
    color: Color,
    plain: boolean,
    children: React.ReactNode
}
type colorHeaderType = 'warningCardHeader' | 'successCardHeader' | 'dangerCardHeader' | 'infoCardHeader' | 'primaryCardHeader' | 'roseCardHeader';

function convertColor(color: Color): colorHeaderType {
    switch (color) {
        case 'warning':
            return 'warningCardHeader';
        case 'success':
            return 'successCardHeader';
        case 'danger':
            return 'dangerCardHeader';
        case 'info':
            return 'infoCardHeader';
        case 'rose':
            return 'roseCardHeader';
        default:
            return 'primaryCardHeader'
    }
}

export const CardHeader: React.FC<Props> = (props) => {
    const classes = cardHeaderStyle();
    const { className, color, plain, children, ...rest } = props;
    const colorHeader = convertColor(color);
    const cardFooterClasses = classNames({
        [classes.cardHeader]: true,
        [classes[colorHeader]]: color,
        [classes.cardHeaderPlain]: plain,
        [className]: className !== undefined,
    });
    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    )
}

export default CardHeader;
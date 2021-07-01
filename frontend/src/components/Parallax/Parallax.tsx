import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import useStyles from '../../assets/jss/material-kit-react/components/parallaxStyle';

type Props = {
  className?: string,
  filter?: boolean,
  children?: React.ReactNode,
  style?: {},
  image: string,
  small: boolean,
};


export const Parallax: React.FC<Props> = (props) => {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  const { filter, className, children, style, image, small } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [(className !== undefined ? className : "")]: className,
  });
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        transform: transform,
      }}
    >
      {children}
    </div>
  );
}

export default Parallax;

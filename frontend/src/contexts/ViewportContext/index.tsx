import React from 'react';

interface ViewportContext {
  width: number;
  height: number;
}

export const viewportContext = React.createContext<ViewportContext>({
  width: 0,
  height: 0,
});

export const ViewportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

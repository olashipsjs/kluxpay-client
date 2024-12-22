import React from 'react';
import useDomRect from 'src/hooks/useDomRect';

type Context = {
  isOpen: boolean;
  domRect: ReturnType<typeof useDomRect>['domRect'];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OverlayContext = React.createContext<Context | undefined>(
  undefined
);

type OverlayProviderProps = {
  open?: boolean;
  element?: React.MutableRefObject<any>;
  children: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const OverlayProvider = ({
  element,
  children,
  open = false,
}: OverlayProviderProps) => {
  const { domRect } = useDomRect(element, { debounceTime: 50 });
  const [isOpen, setIsOpen] = React.useState(open);

  const value = { isOpen, setIsOpen, domRect };

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <OverlayContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;

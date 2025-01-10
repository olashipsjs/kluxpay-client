import React from 'react';
import { createPortal } from 'react-dom';

type Context = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AlertContext = React.createContext<Context | undefined>(undefined);

type Props = {
  timeout?: number;
  visible?: boolean;
  onClose?: () => void;
  portal?: boolean;
  children: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const AlertProvider = ({
  onClose,
  children,
  timeout = 5000,
  portal = false,
  visible = false,
}: Props) => {
  const [isVisible, setIsVisible] = React.useState(visible);

  React.useEffect(() => {
    let timer: number | undefined;

    if (visible) {
      setIsVisible(true);

      if (timeout > 0) {
        timer = setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose();
        }, timeout);
      }
    } else {
      setIsVisible(false);
      if (onClose) onClose();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, timeout, onClose]);

  const value = { isVisible, setIsVisible };

  const Provider = () => {
    return (
      <AlertContext.Provider value={value}>
        {typeof children === 'function'
          ? children({ isVisible, setIsVisible })
          : children}
      </AlertContext.Provider>
    );
  };

  return portal ? (
    createPortal(<Provider />, document.querySelector('#alert')!)
  ) : (
    <Provider />
  );
};

export default AlertProvider;

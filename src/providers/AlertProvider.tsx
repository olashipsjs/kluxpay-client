import React from 'react';

type Context = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AlertContext = React.createContext<Context | undefined>(undefined);

type Props = {
  timeout?: number;
  visible?: boolean;
  onClose?: () => void;
  children: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const AlertProvider = ({
  timeout = 5000,
  visible = false,
  onClose,
  children,
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

  return (
    <AlertContext.Provider value={value}>
      {typeof children === 'function'
        ? children({ isVisible, setIsVisible })
        : children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

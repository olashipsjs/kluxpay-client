import React from 'react';

type Props = {
  children?:
    | ((options: {
        copied: boolean;
        handleCopy: (content: string) => Promise<void>;
      }) => React.ReactNode)
    | React.ReactNode;
  onCopy?: (content: string) => Promise<void>;
};

const Clipboard = ({ onCopy, children }: Props) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      onCopy && onCopy(content);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return typeof children === 'function'
    ? children({ handleCopy, copied })
    : children;
};

export default Clipboard;

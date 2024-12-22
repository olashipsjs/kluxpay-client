import React from 'react';

const useDomRect = <T extends HTMLElement>(
  element?: React.MutableRefObject<T>,
  options?: { debug?: boolean; debounceTime?: number }
) => {
  const { debug = false, debounceTime = 100 } = options || {};
  const [domRect, setDomRect] = React.useState<DOMRect | undefined>(undefined);

  const updateDomRect = React.useCallback(() => {
    if (element && element.current) {
      setDomRect(element.current.getBoundingClientRect());
    }
  }, [element]);

  React.useEffect(() => {
    if (!element?.current) return;

    const target = element.current;

    // Debounce function to limit updates
    let timeout: number | null = null;

    const debouncedUpdate = () => {
      if (timeout) clearTimeout(timeout); //
      timeout = setTimeout(updateDomRect, debounceTime);
    };

    const resizeObserver = new ResizeObserver(debouncedUpdate);
    const mutationObserver = new MutationObserver(debouncedUpdate);

    resizeObserver.observe(target);
    if (document.body) {
      resizeObserver.observe(document.body);
    }
    mutationObserver.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // initial update
    updateDomRect();

    if (debug) {
      console.log('useDomRect: Observers attached', { element, domRect });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      if (timeout) clearTimeout(timeout);
    };
  }, [element, updateDomRect, debounceTime, debug]);

  return { domRect };
};

export default useDomRect;

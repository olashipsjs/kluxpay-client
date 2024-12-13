import React from 'react';
import TabsProvider from 'src/providers/TabsProvider';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';
import useTabs from 'src/hooks/useTabs';

const Compound = React.forwardRef(
  (
    {
      defaultTab,
      children,
      ...rest
    }: Omit<
      React.ComponentProps<typeof Flex>,
      keyof React.ComponentProps<typeof TabsProvider>
    > &
      React.ComponentProps<typeof TabsProvider>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        {...rest}
      >
        <TabsProvider
          children={children}
          defaultTab={defaultTab}
        />
      </Flex>
    );
  }
);

const List = React.forwardRef(
  (
    { alignItems = 'center', ...rest }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        {...rest}
        alignItems={alignItems}
      />
    );
  }
);

const Trigger = React.forwardRef(
  (
    {
      onClick,
      value,
      ...rest
    }: React.ComponentProps<typeof Button> & { value: string },
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { setTab } = useTabs();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setTab(value);
      onClick && onClick(event);
    };

    return (
      <Button
        {...rest}
        ref={ref}
        onClick={handleClick}
      />
    );
  }
);

const Panel = React.forwardRef(
  (
    { value, ...rest }: React.ComponentProps<typeof Flex> & { value: string },
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { compareTab } = useTabs();

    return (
      <React.Fragment>
        {compareTab(value) && (
          <Flex
            {...rest}
            ref={ref}
          />
        )}
      </React.Fragment>
    );
  }
);

const Tabs = Compound as typeof Compound & {
  List: typeof List;
  Trigger: typeof Trigger;
  Panel: typeof Panel;
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;
Tabs.displayName = 'Tabs';

export default Tabs;

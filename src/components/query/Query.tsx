import React from 'react';
import Box from '@components/base/box/Box';
import useAppQuery from '@hooks/useAppQuery';
import Flex from '@components/base/flex/Flex';
import Loader from '@components/loader/Loader';
import QueryProvider from 'src/providers/QueryProvider';

const Compound = (props: React.ComponentProps<typeof QueryProvider>) => {
  return <QueryProvider {...props} />;
};

const QueryLoader = React.forwardRef(
  (
    {
      ...restProps
    }: Omit<React.ComponentProps<typeof Loader>, 'visible'> & {
      visible?: true;
    },
    ref: React.ForwardedRef<React.ComponentRef<typeof Loader>>
  ) => {
    const { isLoading } = useAppQuery();

    if (!isLoading) return null;

    return (
      <Loader
        ref={ref}
        {...restProps}
        visible={true}
      />
    );
  }
);

const QueryData = React.forwardRef(
  (
    {
      children,
      ...restProps
    }: Omit<React.ComponentProps<typeof Box>, 'children'> & {
      children?: ((args: { data: any }) => React.ReactNode) | React.ReactNode;
    },
    ref: React.ForwardedRef<React.ComponentRef<typeof Box>>
  ) => {
    const { data } = useAppQuery();

    if (!data) return null;

    return (
      <Box
        ref={ref}
        {...restProps}
      >
        {typeof children === 'function' ? children({ data }) : children}
      </Box>
    );
  }
);

const QueryError = React.forwardRef(
  (
    { ...restProps }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { error } = useAppQuery();

    if (!error) return null;

    return (
      <Flex
        ref={ref}
        {...restProps}
      />
    );
  }
);

const Query = Compound as typeof Compound & {
  Data: typeof QueryData;
  Error: typeof QueryError;
  Loader: typeof QueryLoader;
};

Query.Data = QueryData;
Query.Error = QueryError;
Query.Loader = QueryLoader;

export default Query;

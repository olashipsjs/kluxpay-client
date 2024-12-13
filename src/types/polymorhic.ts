import React from 'react';

namespace Polymorphic {
  //   type Element<
  //     P extends any,
  //     Tag extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
  //   > = { [K in Tag]: P extends keyof JSX.IntrinsicElements[K] ? K : never }[Tag];

  type As = {
    as?: React.ElementType;
  };

  type PropsWithoutRef<T extends React.ElementType, P = {}> = Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof (P & As)
  > &
    (As & P);

  export type Ref<T extends React.ElementType> =
    React.ComponentPropsWithRef<T>['ref'];

  export type PropsWithRef<
    T extends React.ElementType,
    P = {},
  > = PropsWithoutRef<T, P> & { ref?: Ref<T> };
}

export default Polymorphic;

import * as CSS from 'csstype';
import { Interpolation, Theme } from '@emotion/react';

import { SerializedStyles } from '@emotion/react';
import breakpoints from '../constants/breakpoints';
import queries from 'src/constants/queries';
import pseudos from 'src/constants/pseudos';

namespace Variants {
  export type BreakpointKey = keyof typeof breakpoints;

  export type CSSPropertyName = keyof CSS.PropertiesFallback;

  export type CSSPropertyValue<P extends CSSPropertyName> =
    CSS.PropertiesFallback[P];

  export type VariantDefinition = {
    query?: string;
    isResponsive?: boolean;
    properties: CSSPropertyName[];
    values: { [key: string]: string | number };
  };

  export type VariantMap = { [key: string]: VariantDefinition };

  export type VariantValues<M extends VariantMap> = {
    [K in keyof M]?: M[K]['isResponsive'] extends true
      ?
          | {
              [B in BreakpointKey]?: keyof M[K]['values'] | (string & {});
            }
          | keyof M[K]['values']
          | (string & {})
      : keyof M[K]['values'] | (string & {});
  };

  export type QueryVariantValues<M extends VariantMap> = {
    [K in keyof typeof queries]?: VariantValues<M>;
  };

  export type PseudoVariantValues<M extends VariantMap> = {
    [K in keyof typeof pseudos]?: VariantValues<M>;
  };

  type CreateVariantFunctionParams<M extends VariantMap> = {
    variants: M;
    defaultVariants?: VariantValues<M>;
  };

  export type VariantFunction<M extends VariantMap> = (
    values: VariantValues<M> &
      QueryVariantValues<M> &
      PseudoVariantValues<M> & { css?: Interpolation<Theme> }
  ) => SerializedStyles;

  export type CreateVariantFunction = <M extends VariantMap>(
    params: CreateVariantFunctionParams<M>
  ) => VariantFunction<M>;

  export type VariantProps<T extends VariantFunction<VariantMap>> =
    Parameters<T>[0] & {
      css?: Interpolation<Theme>;
    };
}

export default Variants;

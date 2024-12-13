import breakpoints from 'src/constants/breakpoints';
import Types from '../types/variants';
import { css as emotionCSS } from '@emotion/react';
import pseudos from 'src/constants/pseudos';
import queries from 'src/constants/queries';

const simpleProps = (args: {
  values: any;
  mapKey: string;
  object: { [key: string]: string | any };
  variant: Types.VariantDefinition;
}) => {
  const { variant, values, mapKey, object } = args;

  if (variant && variant.properties) {
    for (const property of variant.properties) {
      const mapValue = values[mapKey];
      const value = variant.values[mapValue as any];
      const arbitraryValue = values[mapKey];

      if (value || arbitraryValue) {
        object[property] = value || arbitraryValue;
      }
    }
  }
};

const responsiveProps = (args: {
  variant: Types.VariantDefinition;
  mapKey: string;
  values: any;
  object: { [key: string]: string | any };
}) => {
  const { mapKey, values, object, variant } = args;

  const value = values[mapKey];

  for (const breakpointName in value) {
    const breakpointValue =
      breakpoints[breakpointName as keyof typeof breakpoints];

    const responsiveValue = (value as Types.VariantValues<any>)[breakpointName];

    if (variant) {
      const propertyValue = variant.values[responsiveValue as any];
      const arbitraryValue = values[mapKey][breakpointName];

      for (const property of variant.properties) {
        if (breakpointName !== 'initial') {
          const mediaRule = `@media screen and (min-width: ${breakpointValue}px)`;
          object[mediaRule] = {
            ...object[mediaRule],
            [property]: propertyValue || arbitraryValue,
          };
        } else {
          object[property] = propertyValue || arbitraryValue;
        }
      }
    }
  }
};

const pseudosProps = (args: {
  values: any;
  variants: Types.VariantMap;
  object: { [key: string]: string | any };
}) => {
  const { values, variants, object } = args;

  const pseudoArr = Object.keys(pseudos).filter((key) =>
    Object.keys(values).includes(key)
  );

  for (const pseudo of pseudoArr) {
    const pseudoValues = values[pseudo];

    for (const pseudoKey in pseudoValues) {
      const pseudoValue = pseudoValues[pseudoKey as any];
      const variant = variants[pseudoKey];

      if (pseudoValue && variant) {
        const extractedPseudo = '&' + pseudos[pseudo as keyof typeof pseudos];

        switch (typeof pseudoValue) {
          case 'object':
            const myBreakpoints = Object.keys(pseudoValue);

            for (const index in myBreakpoints) {
              const breakpointName = myBreakpoints[index];
              const breakpointWidth =
                breakpoints[breakpointName as keyof typeof breakpoints];

              const breakpointRule = `@media screen and (min-width: ${breakpointWidth}px)`;

              const breakpointValue = pseudoValue[breakpointName];
              const value = variant.values[breakpointValue];

              for (const property of variant.properties) {
                object[breakpointRule] = {
                  [extractedPseudo]: {
                    [property]: value || breakpointValue,
                  },
                };
              }
            }
            break;

          default:
            const value = variant.values[pseudoValue];
            object[extractedPseudo] = object[extractedPseudo] || {};
            for (const property of variant.properties) {
              object[extractedPseudo][property] = value || pseudoValue;
            }
            break;
        }
      }
    }
  }
};

const queryProps = (args: {
  values: any;
  variants: Types.VariantMap;
  object: { [key: string]: string | any };
}) => {
  const { values, variants, object } = args;

  const queryArr = Object.keys(queries).filter((key) =>
    Object.keys(values).includes(key)
  );

  for (const query of queryArr) {
    const queryValues = values[query];

    for (const queryKey in queryValues) {
      const queryValue = queryValues[queryKey as any];
      const variant = variants[queryKey];

      if (queryValue && variant) {
        const extractedQuery = '&' + queries[query as keyof typeof queries];

        switch (typeof queryValue) {
          case 'object':
            const myBreakpoints = Object.keys(queryValue);

            for (const index in myBreakpoints) {
              const breakpointName = myBreakpoints[index];
              const breakpointWidth =
                breakpoints[breakpointName as keyof typeof breakpoints];

              const breakpointRule = `@media screen and (min-width: ${breakpointWidth}px)`;

              const breakpointValue = queryValue[breakpointName];
              const value = variant.values[breakpointValue];

              for (const property of variant.properties) {
                object[breakpointRule] = {
                  [extractedQuery]: {
                    [property]: value || breakpointValue,
                  },
                };
              }
            }
            break;

          default:
            const value = variant.values[queryValue];
            object[extractedQuery] = object[extractedQuery] || {};
            for (const property of variant.properties) {
              object[extractedQuery][property] = value || queryValue;
            }
            break;
        }
      }
    }
  }
};

const createVariant: Types.CreateVariantFunction = ({
  variants,
  defaultVariants,
}) => {
  return ({ css, ...values }) => {
    const object: { [key: string]: string | any } = {};

    for (const variantKey in defaultVariants) {
      const variant = variants[variantKey];

      simpleProps({
        variant,
        values: defaultVariants,
        mapKey: variantKey,
        object,
      });
    }

    pseudosProps({ object, variants, values });

    queryProps({ object, variants, values });

    for (const propertyKey in values) {
      const propertyValue = values[propertyKey];
      const variant = variants[propertyKey];

      switch (typeof propertyValue) {
        case 'object':
          responsiveProps({ variant, values, mapKey: propertyKey, object });
          break;

        case undefined:
          break;

        default:
          simpleProps({ variant, values, mapKey: propertyKey, object });
      }
    }

    return emotionCSS(object, css as any);
  };
};

export default createVariant;

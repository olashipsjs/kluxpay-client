import Variants from '@ts_types/variants';

const extractProps = <
  Props extends Record<string | number, any>,
  Maps extends Variants.VariantMap,
>(
  props: Props,
  variants: Maps
): [
  { [K in keyof Maps]: keyof Maps[K]['values'] },
  Omit<Props, keyof { [K in keyof Maps]: keyof Maps[K]['values'] }>,
] => {
  const extractedVariants = Object.fromEntries(
    Object.entries(props).filter(([key]) => key in variants)
  ) as { [K in keyof Maps]: keyof Maps[K]['values'] };

  const extractedProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !(key in variants))
  ) as Omit<Props, keyof { [K in keyof Maps]: keyof Maps[K]['values'] }>;

  return [extractedVariants, extractedProps];
};

export default extractProps;

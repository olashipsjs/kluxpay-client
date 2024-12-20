import gsap from 'gsap';
import React from 'react';
import Coin from './Coin';
import { useGSAP } from '@gsap/react';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import useGetCoins from 'src/hooks/useGetCoins';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  label: string;
  network: 'ethereum' | 'bitcoin' | 'solana';
};

const ScrollContainer = React.memo(({ label, network }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const horizontalRef = React.useRef<HTMLDivElement>(null);

  const { coins, isLoading } = useGetCoins(network);

  useGSAP(() => {
    if (!containerRef.current || !horizontalRef.current) return;

    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const horizontalWidth = horizontal.scrollWidth - container.clientWidth;

    const scaledEnd = horizontalWidth;

    gsap.to(horizontal, {
      x: -horizontalWidth,
      ease: 'none',
      scrollTrigger: {
        pin: true,
        scrub: true,
        markers: true,
        trigger: container,
        start: 'clamp(top 96px)',
        end: `clamp(+=${scaledEnd})`,
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  if (isLoading) {
    return 'loading...';
  }

  return (
    <Flex
      mt={48}
      width={'100%'}
      height={'45vh'}
      overflow={'hidden'}
      ref={containerRef}
      flexDirection={'column'}
    >
      <Heading fontSize={21}>{label}</Heading>
      <Flex
        p={6}
        mt={16}
        gap={12}
        ref={horizontalRef}
        flexDirection={'row'}
        width={{ initial: '320vw', sm: '180vw' }}
      >
        {coins && coins.length > 0
          ? coins.map((coin: any) => {
              return (
                <Coin
                  coin={coin}
                  key={coin.id}
                  network={network}
                />
              );
            })
          : null}
      </Flex>
    </Flex>
  );
});

export default ScrollContainer;

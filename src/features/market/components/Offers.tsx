import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import Query from '@components/query/Query';
import CreateTradeFeature from '@features/shared/modals/create-trade/Feature';
import { GET_ALL_OFFERS } from '@graphql/offer';
import formatDecimal from '@utils/formatDecimal';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Offers = () => {
  const [searchParams] = useSearchParams();

  const fiat = searchParams.get('fiat') || 'NGN';
  const type = searchParams.get('type') || 'all';

  return (
    <Box mt={24}>
      <Query
        query={GET_ALL_OFFERS}
        keys={{
          type,
          fiat,
        }}
      >
        <Query.Loader />
        <Query.Error>
          <Text
            fontSize={14}
            color={'red-50'}
          >
            Failed to load offers.
          </Text>
        </Query.Error>
        <Query.Data>
          {({ data }) => {
            const offers = data?.getAllOffers?.offers;

            return (
              <React.Fragment>
                {offers?.length === 0 ? (
                  <Flex flexDirection={'column'}>
                    <Heading
                      fontSize={17}
                      fontWeight={'semibold'}
                    >
                      No offers found
                    </Heading>
                    <Text
                      mt={6}
                      as={'p'}
                      fontSize={14}
                    >
                      Check back again later to view all available offers.
                    </Text>
                  </Flex>
                ) : null}

                <Box>
                  {offers?.map((offer: any) => {
                    const quote = offer.coin?.quote[offer?.fiat.symbol];
                    const rate =
                      quote.price * (offer.margin / 100) + quote.price;

                    return (
                      <Box
                        p={12}
                        border={1}
                        rounded={8}
                        id={offer._id}
                        borderColor={'gray-80'}
                      >
                        <Flex gap={8}>
                          <Heading
                            fontSize={21}
                            lineHeight={'1'}
                          >{`${offer.fiat.sign}${formatDecimal(
                            rate || 0
                          )}`}</Heading>
                          <Text
                            fontSize={14}
                            lineHeight={'1'}
                          >
                            {`${offer.type === 'sell' ? '+' : '-'}${
                              offer.margin
                            }%`}
                          </Text>
                        </Flex>

                        <Heading
                          mt={12}
                          fontSize={13}
                          lineHeight={'1'}
                        >{`${offer.coin.symbol}`}</Heading>

                        <Flex
                          mt={24}
                          justifyContent={'between'}
                        >
                          <Text
                            fontSize={14}
                            lineHeight={'1'}
                          >
                            Min. limit
                          </Text>
                          <Heading
                            fontSize={14}
                            lineHeight={'1'}
                          >{`${offer.fiat.sign}${offer.minLimit}`}</Heading>
                        </Flex>
                        <Flex
                          mt={12}
                          justifyContent={'between'}
                        >
                          <Text
                            fontSize={14}
                            lineHeight={'1'}
                          >
                            Max. limit
                          </Text>
                          <Heading
                            fontSize={14}
                            lineHeight={'1'}
                          >{`${offer.fiat.sign}${offer.maxLimit}`}</Heading>
                        </Flex>
                        <Flex
                          mt={12}
                          justifyContent={'between'}
                        >
                          <Text
                            fontSize={14}
                            lineHeight={'1'}
                          >
                            Trade duration
                          </Text>
                          <Heading
                            fontSize={14}
                            lineHeight={'1'}
                          >{`${offer.timeout} minutes`}</Heading>
                        </Flex>

                        <Flex
                          mt={20}
                          justifyContent={'between'}
                        >
                          <Image
                            size={'24px'}
                            rounded={'full'}
                            src={offer.coin.logo}
                          />
                          <Box>
                            <Heading
                              fontSize={13}
                              textTransform={'capitalize'}
                            >{`${offer.createdBy.firstName} ${offer.createdBy.lastName}`}</Heading>
                            <Text
                              as={'p'}
                              fontSize={12}
                              textAlign={'right'}
                            >{`${formatDistanceToNow(
                              offer.createdAt
                            )} ago`}</Text>
                          </Box>
                        </Flex>

                        <Overlay mt={12}>
                          <Overlay.Trigger
                            py={8}
                            width={'fit'}
                          >
                            Trade
                          </Overlay.Trigger>
                          <CreateTradeFeature
                            rate={rate}
                            offerId={offer._id}
                          />
                        </Overlay>
                      </Box>
                    );
                  })}
                </Box>
              </React.Fragment>
            );
          }}
        </Query.Data>
      </Query>
    </Box>
  );
};

export default Offers;

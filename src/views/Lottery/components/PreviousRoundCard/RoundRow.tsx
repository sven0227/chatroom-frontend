import { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  CardBody,
  Heading,
  Flex,
  Skeleton,
  Text,
  Box,
  Button,
  useModal,
  CardRibbon,
  BunnyPlaceholderIcon,
  useMatchBreakpoints,
  ExpandableLabel,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { LotteryRound, LotteryRoundGraphEntity } from 'state/types'
import { getGraphLotteries } from 'state/lottery/getLotteriesData'
import { useGetLotteryGraphDataById, useGetUserLotteriesGraphData, useLottery } from 'state/lottery/hooks'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import { getDrawnDate } from 'views/Lottery/helpers'
import WinningNumbers from '../WinningNumbers'
import ViewTicketsModal from '../ViewTicketsModal'
import CellLayout from './CellLayout'
import FooterExpanded from './FooterExpanded'

const CellInner = styled.div`
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding-right: 8px;
`

const RoundIdCell = styled(CellInner)`
  width: 100px;
  & > h2 {
    font-size: 16px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 190px;
  }
`

const WinningNumbersCell = styled(CellInner)`
  width: 180px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 220px;
  }
`

const ActionCell = styled(CellInner)`
  width: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
  }
`

const StyledTr = styled.tr`
  padding: 0 16px;
  cursor: pointer;
  max-width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  }
`

const RoundRow: React.FC<React.PropsWithChildren<{ lotteryNodeData: LotteryRound; lotteryId: string }>> =
  ({ lotteryNodeData, lotteryId }) => {
    const { t,
      currentLanguage: { locale }, } = useTranslation()

    const userLotteryData = useGetUserLotteriesGraphData()
    const userDataForRound = userLotteryData.rounds.find((userLotteryRound) => userLotteryRound.lotteryId === lotteryId)
    const [fetchedLotteryGraphData, setFetchedLotteryGraphData] = useState<LotteryRoundGraphEntity>()
    const lotteryGraphDataFromState = useGetLotteryGraphDataById(lotteryId)
    const { isLg, isXl, isXxl } = useMatchBreakpoints()
    const isLargerScreen = isLg || isXl || isXxl

    const [onPresentViewTicketsModal] = useModal(
      <ViewTicketsModal roundId={lotteryId} roundStatus={lotteryNodeData?.status} />,
    )

    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
      if (!lotteryId) {
        setIsExpanded(false)
      }
    }, [lotteryId])

    useEffect(() => {
      const getGraphData = async () => {
        const fetchedGraphData = await getGraphLotteries(undefined, undefined, { id_in: [lotteryId] })
        setFetchedLotteryGraphData(fetchedGraphData[0])
      }
      if (!lotteryGraphDataFromState) {
        getGraphData()
      }
    }, [lotteryGraphDataFromState, lotteryId])

    const getTotalUsers = (): string => {
      if (!lotteryGraphDataFromState && fetchedLotteryGraphData) {
        return fetchedLotteryGraphData?.totalUsers?.toLocaleString()
      }

      if (lotteryGraphDataFromState) {
        return lotteryGraphDataFromState?.totalUsers?.toLocaleString()
      }

      return null
    }

    const cakePriceBusd = usePriceCakeBusd()
    let prizeInBusd = new BigNumber(NaN)
    if (lotteryNodeData) {
      const { amountCollectedInCake } = lotteryNodeData
      prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
    }

    return (
      <>
        <StyledTr onClick={() => {
          if (lotteryId) {
            setIsExpanded(!isExpanded)
          }
        }}>
          <td key='round-id'>
            <RoundIdCell>
              <Heading scale='md'>Round #{lotteryId}</Heading>
              {lotteryNodeData?.endTime ? (
                <Text fontSize="12px" color='textSubtle' style={{ letterSpacing: '-.3px' }}>
                  {t('Drawn')} {getDrawnDate(locale, lotteryNodeData.endTime)}
                </Text>
              ) : (
                <Skeleton width="185px" height="21px" />
              )}
            </RoundIdCell>
          </td>
          <td key='winning-numbers'>
            <WinningNumbersCell>
              {lotteryId ? (
                lotteryNodeData?.finalNumber ? (
                  <WinningNumbers
                    rotateText={false}
                    number={lotteryNodeData?.finalNumber.toString()}
                    size="100%"
                    fontSize={isLargerScreen ? '18px' : '14px'}
                  />
                ) : (
                  <Skeleton
                    width={['160px', null, null, '220px']}
                    height={['24px', null, null, '36px']}
                    mr={[null, null, null, '32px']}
                  />
                )
              ) : (
                <BunnyPlaceholderIcon height="48px" width="48px" />
              )}
            </WinningNumbersCell>
          </td>
          {isLargerScreen && (
            <>
              <td key='prize-pool'>
                <CellInner style={{ width: '200px' }}>
                  <CellLayout label='Prize pool'>
                    <div>
                      {prizeInBusd.isNaN() ? (
                        <Skeleton my="7px" height={40} width={200} />
                      ) : (
                        <Heading scale="md" lineHeight="1" color="secondary">
                          {formatNumber(getBalanceNumber(lotteryNodeData?.amountCollectedInCake), 0, 0)} {' CAKE'}
                        </Heading>
                      )}
                      {prizeInBusd.isNaN() ? (
                        <Skeleton my="2px" height={14} width={90} />
                      ) : (
                        <Balance
                          fontSize="14px"
                          color="textSubtle"
                          unit=""
                          prefix='~$'
                          value={getBalanceNumber(prizeInBusd)}
                          decimals={0}
                        />
                      )}
                    </div>
                  </CellLayout>
                </CellInner>
              </td>
              <td key='total-players'>
                <CellInner>
                  <CellLayout label='Total players'>
                    <Text display="inline" bold>
                      {lotteryNodeData && (lotteryGraphDataFromState || fetchedLotteryGraphData) ? (
                        getTotalUsers()
                      ) : (
                        <Skeleton height={14} width={31} />
                      )}
                    </Text>
                  </CellLayout>
                </CellInner>
              </td>
              <td key='your-tickets'>
                <CellInner>
                  <CellLayout label='Your tickets'>
                    {
                      userDataForRound ? (
                        <Text display="inline" bold>
                          {userDataForRound.totalTickets}
                        </Text>
                      ) : (
                        <Text display="inline" bold>
                          0
                        </Text>
                      )
                    }
                  </CellLayout>
                </CellInner>
              </td>
            </>
          )}
          <td key='action'>
            <ActionCell>
              <ExpandableLabel
                expanded={isExpanded}
                onClick={() => {
                  if (lotteryId) {
                    setIsExpanded(!isExpanded)
                  }
                }}
              >
                {isLargerScreen && (isExpanded ? t('Hide') : t('Details'))}
              </ExpandableLabel>
            </ActionCell>
          </td>
        </StyledTr>
        {isExpanded && (
          <tr>
            <td colSpan={isLargerScreen ? 6 : 3}>
              <FooterExpanded lotteryNodeData={lotteryNodeData} lotteryId={lotteryId} yourTickets={userDataForRound?.totalTickets || '0'} />
            </td>
          </tr>
        )}
      </>
    )
  }

export default RoundRow

import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Card, Text, Skeleton, CardHeader, Box } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useAppDispatch } from 'state'
import { NUM_ROUNDS_TO_FETCH_FROM_NODES } from 'config/constants/lottery'
import { useLottery } from 'state/lottery/hooks'
import { fetchLottery } from 'state/lottery/helpers'
import { LotteryStatus } from 'config/constants/types'
import RoundSwitcher from './RoundSwitcher'
import { processLotteryResponse } from '../../helpers'
import RoundRow from '../PreviousRoundCard/RoundRow'

const StyledCardHeader = styled(CardHeader)`
  z-index: 2;
  background: none;
  border-bottom: 1px ${({ theme }) => theme.colors.cardBorder} solid;
`


const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const TableWrapper = styled.div`
  overflow: visible;
  scroll-margin-top: 64px;
  padding: 0 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const AllHistoryCard = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    currentLotteryId,
    lotteriesData,
    currentRound: { status, isLoading },
  } = useLottery()
  const [latestRoundId, setLatestRoundId] = useState(null)
  const [fromRoundId, setFromRoundId] = useState('')
  const [toRoundId, setToRoundId] = useState('')
  const [selectedLotteryNodes, setSelectedLotteryNodes] = useState([])
  const timer = useRef(null)
  const tableWrapperEl = useRef<HTMLDivElement>(null)

  const numRoundsFetched = lotteriesData?.length

  useEffect(() => {
    if (currentLotteryId) {
      const currentLotteryIdAsInt = currentLotteryId ? parseInt(currentLotteryId) : null
      const mostRecentFinishedRoundId =
        status === LotteryStatus.CLAIMABLE ? currentLotteryIdAsInt : currentLotteryIdAsInt - 1
      setLatestRoundId(mostRecentFinishedRoundId)
      setToRoundId(mostRecentFinishedRoundId.toString())
      setFromRoundId(Math.max(mostRecentFinishedRoundId - NUM_ROUNDS_TO_FETCH_FROM_NODES + 1, 1).toString())
    }
  }, [currentLotteryId, status])

  useEffect(() => {
    setSelectedLotteryNodes([])

    const fetchLotteriesData = async () => {
      const ids = []
      const fromRoundIdAsInt = parseInt(fromRoundId, 10)
      const toRoundIdAsInt = parseInt(toRoundId, 10)
      for (let i = toRoundIdAsInt; i >= fromRoundIdAsInt; i--) {
        ids.push(i)
      }

      const lotteriesNodeData = await Promise.all(ids.map((id) => new Promise((resolve, reject) => {
        const fetchAndProcess = async () => {
          const lotteryData = await fetchLottery(id.toString())
          const processedLotteryData = processLotteryResponse(lotteryData)
          resolve(processedLotteryData)
        }

        fetchAndProcess()
      })))

      setSelectedLotteryNodes(lotteriesNodeData)
    }

    timer.current = setInterval(() => {
      if (fromRoundId && toRoundId) {
        fetchLotteriesData()
      }
      clearInterval(timer.current)
    }, 1000)

    return () => clearInterval(timer.current)
  }, [fromRoundId, toRoundId, currentLotteryId, numRoundsFetched, dispatch])

  const onChangeRounds = (fromId, toId) => {
    if (fromId) {
      if (parseInt(fromId, 10) <= 0) {
        setFromRoundId('')
      } else if (parseInt(fromId, 10) >= latestRoundId) {
        setFromRoundId(latestRoundId.toString())
      } else {
        setFromRoundId(fromId)
      }
    } else {
      setFromRoundId('')
    }

    if (toId) {
      if (parseInt(toId, 10) <= 0) {
        setToRoundId('')
      } else if (parseInt(toId, 10) >= latestRoundId) {
        setToRoundId(latestRoundId.toString())
      } else {
        setToRoundId(toId)
      }
    } else {
      setToRoundId('')
    }
  }

  return (
    <Container id="lotteries-table">
      <StyledCardHeader>
        <RoundSwitcher
          isLoading={isLoading}
          fromRoundId={fromRoundId}
          toRoundId={toRoundId}
          mostRecentRound={latestRoundId}
          onChangeRounds={onChangeRounds}
        />
      </StyledCardHeader>
      <TableContainer id="table-container">
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {
                selectedLotteryNodes.map((row) => (
                  <RoundRow lotteryNodeData={row} lotteryId={row.lotteryId} />
                ))
              }
            </TableBody>
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )
}

export default AllHistoryCard

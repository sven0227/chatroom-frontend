import styled from 'styled-components'
import { IconButton, ArrowForwardIcon, ArrowBackIcon, ArrowLastIcon, Flex, Heading, Input } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { NUM_ROUNDS_TO_FETCH_FROM_NODES } from 'config/constants/lottery'

const StyledInput = styled(Input)`
  width: 60px;
  height: 100%;
  padding: 4px 16px;
`

const StyledIconButton = styled(IconButton)`
  width: 32px;

  :disabled {
    background: none;

    svg {
      fill: ${({ theme }) => theme.colors.textDisabled};

      path {
        fill: ${({ theme }) => theme.colors.textDisabled};
      }
    }
  }
`

interface RoundSwitcherProps {
  isLoading: boolean
  fromRoundId: string
  toRoundId: string
  mostRecentRound: number
  onChangeRounds: (fromId: string, toId: string) => void
}

const RoundSwitcher: React.FC<React.PropsWithChildren<RoundSwitcherProps>> = ({
  isLoading,
  fromRoundId,
  toRoundId,
  mostRecentRound,
  onChangeRounds
}) => {
  const { t } = useTranslation()
  const fromRoundIdAsInt = parseInt(fromRoundId, 10)
  const toRoundIdAsInt = parseInt(toRoundId, 10)

  const handleChangeFromRound = (fromId: string) => {
    if (fromId) {
      const toId = parseInt(fromId, 10) + NUM_ROUNDS_TO_FETCH_FROM_NODES - 1
      onChangeRounds(fromId, toId.toString())
    } else {
      onChangeRounds(fromId, '')
    }
  }

  const handleChangeToRound = (toId: string) => {
    if (toId) {
      const fromId = parseInt(toId, 10) - NUM_ROUNDS_TO_FETCH_FROM_NODES + 1
      onChangeRounds(fromId.toString(), toId)
    } else {
      onChangeRounds('', toId)
    }
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Heading mr="8px">{t('View Rounds')}</Heading>
        <StyledInput
          pattern="^[0-9]+$"
          inputMode="numeric"
          disabled={isLoading}
          id="round-id"
          name="round-id"
          value={fromRoundId}
          scale="lg"
          onChange={(e) => { if (e.currentTarget.validity.valid) { handleChangeFromRound(e.target.value) } }}
        />
        <Heading ml='8px' mr="8px">{t('~')}</Heading>
        <StyledInput
          pattern="^[0-9]+$"
          inputMode="numeric"
          disabled={isLoading}
          id="round-id"
          name="round-id"
          value={toRoundId}
          scale="lg"
          onChange={(e) => { if (e.currentTarget.validity.valid) { handleChangeToRound(e.target.value) } }}
        />
      </Flex>
      <Flex alignItems="center">
        <StyledIconButton
          disabled={!fromRoundIdAsInt || fromRoundIdAsInt <= 1}
          onClick={() => handleChangeFromRound(Math.max(fromRoundIdAsInt - NUM_ROUNDS_TO_FETCH_FROM_NODES, 1).toString())}
          variant="text"
          scale="sm"
          mr="4px"
        >
          <ArrowBackIcon />
        </StyledIconButton>
        <StyledIconButton
          disabled={toRoundIdAsInt >= mostRecentRound}
          onClick={() => handleChangeFromRound((fromRoundIdAsInt + NUM_ROUNDS_TO_FETCH_FROM_NODES).toString())}
          variant="text"
          scale="sm"
          mr="4px"
        >
          <ArrowForwardIcon />
        </StyledIconButton>
        <StyledIconButton
          disabled={toRoundIdAsInt >= mostRecentRound}
          onClick={() => handleChangeToRound(mostRecentRound.toString())}
          variant="text"
          scale="sm"
        >
          <ArrowLastIcon />
        </StyledIconButton>
      </Flex>
    </Flex>
  )
}

export default RoundSwitcher

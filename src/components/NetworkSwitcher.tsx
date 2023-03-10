import { Box, Text, UserMenu, UserMenuDivider, UserMenuItem } from '@pancakeswap/uikit'
import { ChainId, NATIVE } from '@pancakeswap/sdk'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useMemo } from 'react'
import { chains } from 'utils/wagmi'
import { ChainLogo } from './Logo/ChainLogo'

export const NetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box px="16px" py="8px">
        <Text>{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {chains.map((chain) => (
        <UserMenuItem
          disabled={chain.id === chainId}
          key={chain.id}
          style={{ justifyContent: 'flex-start' }}
          onClick={() => switchNetwork(chain.id)}
        >
          <ChainLogo chainId={chain.id} />
          <Text pl="12px">{chain.name}</Text>
        </UserMenuItem>
      ))}
    </>
  )
}

export const NetworkSwitcher = () => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()
  useNetworkConnectorUpdater()

  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol

  const cannotChangeNetwork = !canSwitch

  if (!chainId || chainId === ChainId.BSC) {
    return null
  }

  return (
    <>
      <UserMenu
        mr="8px"
        variant={isLoading ? 'pending' : isWrongNetwork ? 'danger' : 'default'}
        avatarSrc={`/images/chains/${chainId}.png`}
        disabled={cannotChangeNetwork}
        text={
          isLoading ? (
            t('Requesting')
          ) : isWrongNetwork ? (
            t('Network')
          ) : foundChain ? (
            <>
              <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
              <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
            </>
          ) : (
            t('Select a Network')
          )
        }
      >
        {() => <NetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />}
      </UserMenu>
    </>
  )
}

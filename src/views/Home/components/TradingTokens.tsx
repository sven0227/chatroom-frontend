/* eslint-disable */
import { useEffect, useState } from "react";
import { Box, Flex, Grid, LinkExternal, Text } from '@pancakeswap/uikit'
import { useFetchTokens } from 'hooks/useClient'
import useInterval from 'hooks/useInterval'
import styled from 'styled-components'
import Balance from 'components/Balance'

const TokensLayout = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.backgroundAlt2};
  border-radius: 10px;
  margin-bottom: 50px;
  flex-direction: column;
`
const TitleLayout = styled.div`
  display: flex;
  font-size: 16px;
  min-width: 170px;
  align-items: center;
  width: 100%;
`
const TokenGrid = styled.div`
  display: grid;
  grid-gap: 16px 8px;
  margin: 24px 0px 24px 0px;
  padding: 0px 16px;
  grid-template-columns: repeat(2, auto);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
    grid-template-columns: repeat(3, auto);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 32px;
    grid-template-columns: repeat(6, auto);
`

const TradingTokens = () => {
  const tokensData = useFetchTokens()
  const [from, setFrom] = useState(true)
  setTimeout(() => {
    setFrom(!from)
  }, 1000 * 10)
  return (
    <TokensLayout>
      <TitleLayout>
        <Text textAlign="center" style={{width: "100%"}} mt={3}>Trending Tokens</Text>
      </TitleLayout>
      <TokenGrid>
        {
          tokensData.map((token, index) => {
            if (from && index < 6 || !from && index > 5)
              return (
                <a href={`/swap?outputCurrency=${token.contractAddress}`} key={'a' + index}>
                  <Flex width={145} key={ 'token'+ index}>
                    <img src={token.logoUrl} alt="" width={40} style={{height: "40px"}} />
                    <Flex flexDirection="column" style={{marginLeft: "4px", width: "100%"}}>
                      <Flex justifyContent="space-between">
                        <Text>{token.tokenTicker}</Text>
                        <Balance decimals={2} value={Number(token.percentChange)} color={Number(token.percentChange) > 0 ? "green" : "red"} unit="%"/>
                      </Flex>
                      <Balance decimals={6} value={Number(token.tokenPrice)} prefix="$" />
                    </Flex>
                  </Flex>
                </a>
              )
          })
        }
      </TokenGrid>
    </TokensLayout>
  )
}

export default TradingTokens

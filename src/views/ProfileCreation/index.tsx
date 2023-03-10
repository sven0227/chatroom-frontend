/* eslint-disable */
import { useEffect, useState } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import {
  Card,
  CardBody,
  Heading,
  Text,
  Input as UIKitInput,
  Button,
  AutoRenewIcon,
  CheckmarkIcon,
  Flex,
  WarningIcon,
  useModal,
  Skeleton,
  Checkbox,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import Page from 'components/Layout/Page'
import { useProfile } from 'state/profile/hooks'
import PageLoader from 'components/Loader/PageLoader'
import { useRouter } from 'next/router'
import Header from './Header'
import ProfileCreationProvider from './contexts/ProfileCreationProvider'
import Steps from './Steps'
import UserName from './UserName'
import { isValidRoute, setUserNameRoute } from '../../utils/apiRoutes'

const InputWrap = styled.div`
  position: relative;
  max-width: 240px;
`

const Input = styled(UIKitInput)`
  padding-right: 40px;
`

const Indicator = styled(Flex)`
  align-items: center;
  height: 24px;
  justify-content: center;
  margin-top: -12px;
  position: absolute;
  right: 16px;
  top: 50%;
  width: 24px;
`
const ProfileCreation = () => {
  const { account } = useWeb3React()
  const { isInitialized, hasProfile } = useProfile()
  const router = useRouter()
  const [userName, setUserName] = useState<string>(undefined)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameToCheck, setUsernameToCheck] = useState<string>(undefined)
  const { toastError, toastSuccess } = useToast()

  const handleChange = (event) => {
    const { value } = event.target
    setUserName(value)
    setUsernameToCheck(value)
  }

  // useEffect(() => {
  //   if (account && hasProfile) {
  //     router.push(`/profile/${account.toLowerCase()}`)
  //   }
  // }, [account, hasProfile, router])

  // if (!isInitialized || isLoading) {
  //   return <PageLoader />
  // }

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      console.log("debug", setUserNameRoute)
      const response = await fetch(setUserNameRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account,
          username: userName,
        }),
      })
      const data = await response.json();
      console.log(data)
      toastSuccess('Success', data.message)
    } catch (error) {
      toastError(error instanceof Error && error?.message ? error.message : JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchUsernameToCheck = async () => {
      try {
        setIsLoading(true)
        // console.log("debug",userName.length, isValidRoute)
        const res = await fetch(isValidRoute, {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userName,
          })
        })
        console.log("debug",userName.length, res)
        const data = await res.json();

        if (data.status) {
          setIsValid(true)
        } else {
          setIsValid(false)
        }        
      } catch (e) {
        setIsValid(false)
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    if (userName?.length > 2) {
      fetchUsernameToCheck()
    } else {
      setIsValid(false)
    }
  }, [userName])

  return (
    <div style={{textAlign: "center"}}>
      {/* <ProfileCreationProvider>
        <Page>
          <Header />
          <Steps />
        </Page>
      </ProfileCreationProvider> */}
      <Heading scale="xl" as="h3">
        Profile Setup
      </Heading>
      <Flex style={{marginBottom: "160px", alignItems: "center", justifyContent: "center", marginTop: "32px"}}>
        <InputWrap>
          <Input
            onChange={handleChange}
            isWarning={userName && !isValid}
            isSuccess={userName && isValid}
            minLength={3}
            maxLength={20}
            // disabled={isUserCreated}
            placeholder={'Enter your name...'}
            value={userName}
          />
          <Indicator>
            {isLoading && <AutoRenewIcon spin />}
            {!isLoading && isValid && userName && <CheckmarkIcon color="success" />}
            {!isLoading && !isValid && userName && <WarningIcon color="failure" />}
          </Indicator>
        </InputWrap>
        <Button onClick={handleConfirm} disabled={!isValid || isLoading} style={{marginLeft: "16px"}}>
          {'Confirm'}
        </Button>
      </Flex>
    </div>
  )
}

export default ProfileCreation

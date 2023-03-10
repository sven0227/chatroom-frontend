// define and export `useClient` hook somewhere in your codebase
// or keep it in the `src/App.js`, up to you
/* eslint-disable */
import { useEffect, useState } from "react";
import useInterval from "./useInterval";
import { connect, getAllMessagesRoute, setAvatarRoute, getUserRoute } from "../utils/apiRoutes"

// we'll use src/hooks/useClient.js path for this example
export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  return chatClient;
};

export const useFetchTokenFromApi = (name) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://stream-server1.herokuapp.com/token",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: name
          })
        })

      res.json().then((data) => {
        setToken(data);
      })
    }
    api();
  }, [name])
  return token;
};

export const useFetchTokens = () => {
  const [tokenInfo, setTokenInfo] = useState([{logoUrl: '', tokenTicker: '', tokenPrice: '', percentChange: '', contractAddress: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://ape-swap-api.herokuapp.com/tokens/trending",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      res.json().then((data) => {
        setTokenInfo(data);
      })
    }
    api();
  }, [])  
  return tokenInfo;
};

export const useFetchMessages = () => {
  const [message, setMessage] = useState([])
  useEffect(() => {
    const api = async () => {
      const res = await fetch(getAllMessagesRoute,
        {
          method: "post",
          headers: { "Content-Type": "application/json" }
        })

      res.json().then((data) => {
        setMessage((prevState) => ({...prevState, message: data}));
      })
    }
    api();
  }, [])
  return message;
};

export const useGetUserInfo = (address) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const api = async () => {
      const res = await fetch(getUserRoute,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: address,
          })
        })

      res.json().then((data) => {
        setUser(data);
      })
    }
    api();
  }, [])
  return user;
};


export const useSetAvatar = ( account, avatar) => {
  useEffect(() => {
    const api = async () => {
      const res = await fetch(setAvatarRoute,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: account, 
            avatarImage: avatar
          })
        })

      res.json().then((data) => {
        console.log("Success")
      })
    }
    api();
  }, [])
  return;
};


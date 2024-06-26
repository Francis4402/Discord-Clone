"use client"

import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { User } from "stream-chat";
import { LoadingIndicator } from "stream-chat-react";
import MyChat from "./MyChat";


type HomeState = {
    apiKey: string;
    user: User;
    token: string;
  }

const HomePage = () => {

    const [homeState, setHomeState] = useState<HomeState | undefined>();

    const {user: clerkUser} = useClerk();
    
    const registerUser = useCallback(async function registerUser () {
        const userId = clerkUser?.id;
        const mail = clerkUser?.primaryEmailAddress?.emailAddress;
        if(userId && mail){
          const res = await fetch('/api/register-user', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({userId: userId, email: mail}),
          });
          const resbody = res.json();
          return resbody;
        }
    }, [clerkUser]);

    async function getUserToken(userId: string, userName: string){
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({userId: userId}),
      });

      const resbody = await res.json();
      const token = resbody.token;

      if(!token){
        console.error('No token found');
      }

      const user: User = {
        id: userId,
        name: userName,
        image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
      };

      const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
      if (apiKey) {
        setHomeState({apiKey: apiKey, user: user, token: token});
      }
      
    }

    useEffect(() => {
      if (
        clerkUser?.id &&
        clerkUser?.primaryEmailAddress?.emailAddress &&
        !clerkUser?.publicMetadata.streamRegistered
      ) {
        registerUser().then((result) => {
          getUserToken(
            clerkUser.id,
            clerkUser?.primaryEmailAddress?.emailAddress || 'Unknown'
          );
        });
      } else {
        if(clerkUser?.id) {
          getUserToken(
            clerkUser?.id || 'Unknown',
            clerkUser?.primaryEmailAddress?.emailAddress || 'Unknown'
          );
        }
      }
    }, [registerUser, clerkUser]);


  if (!homeState) {
    return <LoadingIndicator />
  }

  

  return <MyChat {...homeState} />;
}

export default HomePage
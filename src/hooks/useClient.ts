import { useEffect, useState } from "react";
import { StreamChat, TokenOrProvider, User } from "stream-chat";


export type UseClientOptions = {
    apiKey: string;
    user: User;
    tokenOrProvider: TokenOrProvider;
};

export const useClient = ({
    apiKey,
    user,
    tokenOrProvider,
}: UseClientOptions): StreamChat | undefined => {
    const [chatClient, setChatClient] = useState<StreamChat | undefined>(undefined);

    useEffect(() => {
        const client = new StreamChat(apiKey);
        let didUserConnectInterrupt = false;

        const connectUser = async () => {
            try {
                await client.connectUser(user, tokenOrProvider);
                if (!didUserConnectInterrupt) {
                    setChatClient(client);
                }
            } catch (error) {
                console.error("Error connecting user:", error);
            }
        };

        connectUser();

        return () => {
            didUserConnectInterrupt = true;
            setChatClient(undefined);
            client.disconnectUser().then(() => {
                console.log('Connection closed');
            }).catch(error => {
                console.error("Error disconnecting user:", error);
            });
        };
    }, [user, apiKey, tokenOrProvider]);

    return chatClient;
};
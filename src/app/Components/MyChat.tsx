import { useClient } from '@/hooks/useClient';
import { User } from '@clerk/nextjs/server'
import { Channel, ChannelList, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import ServerList from './ServerList/ServerList';

interface MyChatProps {
    apiKey: string;
    user: User;
    token: string;
}

const MyChat: React.FC<MyChatProps> = ({apiKey, user, token}) => {

    const chatClient = useClient({
        apiKey,
        user,
        tokenOrProvider: token,
    });

    if (!chatClient) {
        return <div>Error, please try again later.</div>
    }

    return (
        <Chat client={chatClient} theme='str-chat__theme-light'>
            <section className='flex h-screen w-screen layout'>
                <ServerList/>
                <ChannelList />
                <Channel>
                    <Window>
                        <MessageList/>
                        <MessageInput/>
                    </Window>
                    <Thread />
                </Channel>
            </section>
        </Chat>
    )
}

export default MyChat
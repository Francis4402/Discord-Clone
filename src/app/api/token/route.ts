import { StreamChat } from "stream-chat";

export async function POST(req: Request) {
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

    if(!apiKey) {
        return Response.error();
    }

    const serverClient = StreamChat.getInstance(
        apiKey,
        process.env.STREAM_SECRET
    );
    
    const body = await req.json();

    const userId = body?.userId;

    if(!userId){
        return Response.error();
    }

    const token = serverClient.createToken(userId);

    const res = {
        userId: userId,
        token: token,
    };

    return Response.json(res);
}
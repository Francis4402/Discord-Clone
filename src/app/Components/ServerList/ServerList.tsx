
import { DiscordServer } from "@/models/DiscordServer"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {v4 as uuid} from 'uuid';
import CreateServerForm from "./CreateServerForm";

export default function ServerList(): JSX.Element {
    const [acitveServer, setActiveServer] = useState<DiscordServer | undefined>();

    const servers: DiscordServer[] = [
        {
            id: '1',
            name: 'Test Server 1',
            image: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '2',
            name: 'Test Server 2',
            image: '',
        },
        {
            id: '3',
            name: 'Test Server 3',
            image: '',
        },
    ];

    return (
            <div className="bg-dark-gray h-full flex flex-col items-center">

            {servers.map((server) => (
                    <button key={server.id} onClick={() => setActiveServer(server)} className={`p-2 sidebar-icon ${server.id === acitveServer?.id ? 'selected-icon' : ''}`}>
                        {
                            server.image && checkIfUrl(server.image) ? (<Image src={server.image} alt="i" width={50} height={50} className="rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm" /> ) : (
                                <span className="rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm">{server.name.charAt(0)}</span>
                            )
                        }
                    </button>
                )
            )}
            <Link
                href={'/?createServer=true'}
                className='flex items-center justify-center rounded-icon bg-white text-green-500 hover:bg-green-500 hover:text-white hover:rounded-xl transition-all duration-200 p-2 my-2 text-2xl font-light h-12 w-12'
            >
                <span className='inline-block'>+</span>
            </Link>
            <CreateServerForm />
            <UserButton afterSignOutUrl="/"/>
        </div>
    );

    function checkIfUrl(path: string): Boolean {
        try {
        const _ = new URL(path);
        return true;
        } catch (_) {
        return false;
        }
    };
}

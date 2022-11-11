import React, { createContext } from 'react'
import io, { Socket } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from './models/socketModels'

interface IWebSocketContext {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
    createDialogue: (userId: number) => void
}

const WebSocketContext = createContext<IWebSocketContext | null>(null)

export { WebSocketContext }

const wsBase = process.env.REACT_APP_SERVER_HOST || 'http://localhost:8080/'

interface WebSocketProps {
    children: React.ReactNode
}

const WebSocket: React.FC<WebSocketProps> = ({ children }) => {
    let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
    let ws

    const { id } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const createDialogue = (userId: number) => {
        if (id) {
            const payload = {
                firstUserId: id,
                secondUserId: userId,
            }
            // socket?.emit('create-dialogue:add', payload)
        }
    }

    
        // socket.on('event://get-message', (msg) => {
        //     const payload = JSON.parse(msg)
        //     dispatch(updateChatLog(payload))
        // })

    if (!socket) {
        socket = io(wsBase)


        ws = {
            socket: socket,
            createDialogue,
        }
    }

    // const sendMessage = (roomId, message) => {
    //     const payload = {
    //         roomId: roomId,
    //         data: message
    //     }
    //     socket.emit("event://send-message", JSON.stringify(payload));
    //     dispatch(updateChatLog(payload));
    // }

    return (
        <WebSocketContext.Provider value={ws ? ws : null}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocket

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = {
  _id: string;
  tradeId: string;
  sender: any;
  text: string;
  createdAt: string;
};

type GroupedMessages = Record<string, Message[]>;

type UseSocketReturn = {
  sendMessage: (message: {
    tradeId: string;
    userId: string;
    text: string;
  }) => void;
  room: string;
  isConnected: undefined | boolean;
  messages: GroupedMessages;
  goOnline: (userId: string) => void;
  socket: React.MutableRefObject<Socket | null>;
};

const useSocket = (tradeId: string): UseSocketReturn => {
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState<GroupedMessages>({});
  const [isConnected, setIsConnected] = useState<boolean | undefined>(
    undefined
  );
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(import.meta.env.VITE_SERVER_URI);
    socket.current = socketInstance;

    // Handle connection status
    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // Join room
    socketInstance.emit('join', { tradeId }, (error: Error) => {
      if (error) {
        console.error('Error joining room:', error.message);
      }
    });

    // Listeners
    const handleRoomData = ({
      room,
      messages,
    }: {
      room: string;
      messages: Message[];
    }) => {
      setRoom(room);
      setMessages(groupMessagesByDate(messages));
    };

    const handleMessage = (message: Message) => {
      const dateKey = new Date(message.createdAt).toISOString().slice(0, 10);

      setMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        if (!updatedMessages[dateKey]) {
          updatedMessages[dateKey] = [];
        }
        updatedMessages[dateKey].push(message);
        return updatedMessages;
      });
    };

    // Attach listeners
    socketInstance.on('roomData', handleRoomData);
    socketInstance.on('message', handleMessage);

    // Cleanup on unmount
    return () => {
      socketInstance.off('roomData', handleRoomData);
      socketInstance.off('message', handleMessage);
      socketInstance.disconnect();
      socket.current = null;
    };
  }, [tradeId]);

  // Send message function
  const sendMessage = useCallback(
    (message: { tradeId: string; userId: string; text: string }) => {
      if (socket.current) {
        socket.current.emit('message', message, (error: Error) => {
          if (error) {
            console.error('Error sending message:', error.message);
          }
        });
      }
    },
    []
  );

  // Helper function to group messages by date
  const groupMessagesByDate = (messages: Message[]): GroupedMessages => {
    return messages.reduce((groups: GroupedMessages, message) => {
      const dateKey = new Date(message.createdAt).toISOString().slice(0, 10);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    }, {});
  };

  const goOnline = useCallback((userId: string) => {
    if (socket.current && isConnected) {
      socket.current.emit('online', { userId });
      console.log(`User ${userId} is now online`);
    }
  }, []);

  return { sendMessage, goOnline, isConnected, messages, room, socket };
};

export default useSocket;

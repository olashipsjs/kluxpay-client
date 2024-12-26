import React from 'react';
import { io } from 'socket.io-client';

const useSocket = (
  tradeId: string
): [
  typeof sendMessage,
  opt: {
    room: typeof room;
    messages: typeof messages;
    socketRef: typeof socketRef;
  }
] => {
  const [room, setRoom] = React.useState('');
  const [messages, setMessages] = React.useState({});
  const socketRef = React.useRef<any>(null);

  React.useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URI);
    socketRef.current = socket;

    socket.emit('join', { tradeId }, (error: Error) => {
      if (error) {
        console.error('Error joining room:', error.message);
      }
    });

    // Define listeners
    const handleRoomData = ({
      room,
      messages,
    }: {
      room: string;
      messages: any[];
    }) => {
      setRoom(room);

      const groupedMessages = messages.reduce((groups: any, message: any) => {
        const dateKey = new Date(message.createdAt).toISOString().slice(0, 10); // "YYYY-MM-DD"
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(message);
        return groups;
      }, {});

      setMessages(groupedMessages || []);
    };

    const handleMessage = (message: any) => {
      const dateKey = new Date(message.createdAt).toISOString().slice(0, 10); // "YYYY-MM-DDTHH:MM"

      setMessages((prevMessages) => {
        const updatedMessages: any = { ...prevMessages };

        if (!updatedMessages[dateKey]) {
          updatedMessages[dateKey] = [];
        }

        updatedMessages[dateKey] = [...updatedMessages[dateKey], message];
        return updatedMessages;
      });
    };

    // Attach listeners
    socket.on('roomData', handleRoomData);
    socket.on('message', handleMessage);

    // Clean up listeners on unmount to prevent duplicates
    return () => {
      socket.off('roomData', handleRoomData);
      socket.off('message', handleMessage);
      socket.disconnect();
      socketRef.current = null; // Ensure the socket disconnects properly
    };
  }, [tradeId]);

  const sendMessage = (message: {
    tradeId: string;
    userId: string;
    text: string;
  }) => {
    socketRef.current.emit('sendMessage', message, (error: Error) => {
      if (error) {
        console.error('Error sending message:', error.message);
      } else {
      }
    });
  };

  return [sendMessage, { messages, socketRef, room }];
};

export default useSocket;

"use client";
import React, { useEffect } from "react";

const connect = () =>
  console.log("Connecting ... Connected! (Sim of Server Connect)");
const disconnect = () =>
  console.log("Disconnecting ... Disconnected (Sim of Server Disconnect)");

const ChatHomePage: React.FC = () => {
  useEffect(() => {
    connect();
    document.title = "Blissful Chat";
    // Note: This is an optional clean up function! This is a 'clean up' function / code.
    return () => disconnect();
  }, []);

  return <div></div>;
};

export default ChatHomePage;

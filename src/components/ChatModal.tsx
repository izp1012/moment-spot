import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { chatService, ChatMessage, ChatRoom } from "@/services/chatApi";

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatModal = ({ open, onOpenChange }: ChatModalProps) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      loadChatRooms();
    }
  }, [open]);

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom);
    }
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatRooms = async () => {
    try {
      const roomsData = await chatService.getChatRooms();
      setRooms(roomsData);
      if (roomsData.length > 0 && !selectedRoom) {
        setSelectedRoom(roomsData[0].id);
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "채팅방 목록을 불러올 수 없습니다.",
        variant: "destructive",
      });
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      setLoading(true);
      const messagesData = await chatService.getMessages(roomId);
      setMessages(messagesData);
    } catch (error) {
      toast({
        title: "오류",
        description: "메시지를 불러올 수 없습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    try {
      const message = await chatService.sendMessage({
        roomId: selectedRoom,
        content: newMessage.trim(),
      });
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      toast({
        title: "오류",
        description: "메시지를 전송할 수 없습니다.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>채팅</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Chat Rooms List */}
          <div className="w-1/3 border-r pr-4">
            <h3 className="font-semibold mb-4">채팅방</h3>
            <ScrollArea className="h-full">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                    selectedRoom === room.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={room.otherUser?.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{room.otherUser?.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {room.lastMessage || "메시지가 없습니다"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            {selectedRoom ? (
              <>
                <ScrollArea className="flex-1 pr-4">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-muted-foreground">메시지를 불러오는 중...</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isOwn ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.isOwn
                                ? "bg-primary text-primary-foreground"
                                : "bg-accent"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="text-muted-foreground">채팅방을 선택해주세요</div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
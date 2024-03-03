using Grpc.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace GrpcStreamingChat.Services;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ChatService : ChatServer.ChatServerBase
{
    private readonly IChatRoomService _chatRoomService;

    public ChatService(IChatRoomService chatRoomService)
    {
        _chatRoomService = chatRoomService;
    }

    public override async Task HandleCommunication(IAsyncStreamReader<ClientMessage> requestStream, IServerStreamWriter<ServerMessage> responseStream, ServerCallContext context)
        {
            var userName = string.Empty;
            var chatRoomId = string.Empty;
            
            while (true)
            {
                //Read a message from the client.
                var clientMessage = await _chatRoomService.ReadMessageWithTimeoutAsync(requestStream, Timeout.InfiniteTimeSpan);

                switch (clientMessage.ContentCase)
                {
                    case ClientMessage.ContentOneofCase.Login:

                        var loginMessage = clientMessage.Login;
                        //get username and chatRoom Id from clientMessage.
                        chatRoomId = loginMessage.ChatRoomId;
                        userName = loginMessage.UserName;

                        if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(chatRoomId))
                        {
                            //Send a login Failure message.
                            var failureMessage = new ServerMessage
                            {
                                LoginFailure = new ServerMessageLoginFailure { Reason = "Invalid username" }
                            };

                            await responseStream.WriteAsync(failureMessage);

                            return;
                        }

                        //Send login success message to client
                        var successMessage = new ServerMessage { LoginSuccess = new ServerMessageLoginSuccess() };
                        await responseStream.WriteAsync(successMessage);

                        //Add client to chat room.
                        await _chatRoomService.AddClientToChatRoom(chatRoomId, new ChatClient
                        {
                            StreamWriter = responseStream,
                            UserName = userName
                        });
                        await _chatRoomService.BroadcastClientJoinedRoomMessage(userName, chatRoomId);

                        break;

                    case ClientMessage.ContentOneofCase.Chat:

                        var chatMessage = clientMessage.Chat;

                        if (userName is not null && chatRoomId is not null)
                        {
                            //broad cast the message to the room
                            await _chatRoomService.BroadcastMessageToChatRoom(chatRoomId, userName, chatMessage.Text);
                        }

                        break;
                    
                }
                
            }
        }
}
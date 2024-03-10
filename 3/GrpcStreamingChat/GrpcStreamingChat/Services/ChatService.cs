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

    public override async Task GetServerStream(
        ClientMessage requestMessage,
        IServerStreamWriter<ServerMessage> responseStream,
        ServerCallContext context)
    {
        var loginMessage = requestMessage.Login;
        //get username and chatRoom Id from clientMessage.
        var chatRoomId = loginMessage.ChatRoomId;
        var userName = loginMessage.UserName;

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
        var i = 0;
        while (!context.CancellationToken.IsCancellationRequested && i < 10)
        {
            await responseStream.WriteAsync(new ServerMessage
            {
                Chat = new ServerMessageChat
                {
                    Text = "some text",
                    UserName = "some user name"
                }
            });
            i++;
        }


        Console.WriteLine("completed");
        return;
    }

    public override async Task<Empty> SendMessage(ClientMessage request, ServerCallContext context)
    {
        var chatMessage = request.Chat;
        var chatRoomId = "0";
        var userName = chatMessage.UserName;

        if (userName is not null)
        {
            //broad cast the message to the room
            await _chatRoomService.BroadcastMessageToChatRoom(chatRoomId, userName, chatMessage.Text);
        }

        return new Empty();
    }
}
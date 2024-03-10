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
        Console.WriteLine(userName);
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
        Console.WriteLine("client successful login");

        //Add client to chat room.
        var client = new ChatClient
        {
            StreamWriter = responseStream,
            UserName = userName
        };
        await _chatRoomService.AddClientToChatRoom(chatRoomId, client);
        
        Console.WriteLine("client successful added to room");
        await _chatRoomService.BroadcastClientJoinedRoomMessage(userName, chatRoomId);
        var i = 0;
        Console.WriteLine("client successful get broadcast join");
       
        while (!context.CancellationToken.IsCancellationRequested)
        {
        }

        await _chatRoomService.RemoveClientFromChatRoom("0", client);
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
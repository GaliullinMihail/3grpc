using Grpc.Core;

namespace GrpcStreamingChat.Services;

public interface IChatRoomService
{
    public Task<ClientMessage> ReadMessageWithTimeoutAsync(IAsyncStreamReader<ClientMessage> requestStream,
        TimeSpan timeout);

    public Task AddClientToChatRoom(string chatRoomId, ChatClient chatClient);
    public Task BroadcastClientJoinedRoomMessage(string userName, string chatRoomId);
    public Task BroadcastMessageToChatRoom(string chatRoomId, string senderName, string text);
}
using Grpc.Core;
using GrpcStreamingChat.Jwt;

namespace GrpcStreamingChat.Services;

public class JwtService : JwtSender.JwtSenderBase
{
    private readonly IJWTAuthenticationManager jWTAuthenticationManager;

    public JwtService(IJWTAuthenticationManager jWtAuthenticationManager)
    {
        jWTAuthenticationManager = jWtAuthenticationManager;
    }
    
    public override Task<JwtReply> SendJwt(JwtRequest request, ServerCallContext context)
    {
        var token = jWTAuthenticationManager.Authenticate("test1", "password1");

        return Task.FromResult(new JwtReply
        {
            Message = token
        });
    }
}
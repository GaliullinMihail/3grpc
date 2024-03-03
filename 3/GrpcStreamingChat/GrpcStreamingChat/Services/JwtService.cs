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
        jWTAuthenticationManager.Register(request.Name);
        var token = jWTAuthenticationManager.Authenticate(request.Name, request.Name);

        return Task.FromResult(new JwtReply
        {
            Message = token
        });
    }
}
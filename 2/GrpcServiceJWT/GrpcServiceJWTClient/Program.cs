using Grpc.Core;
using Grpc.Net.Client;
using GrpcServiceJWT;

var handler = new HttpClientHandler();
handler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
using var channel = GrpcChannel.ForAddress("https://localhost:7029", new GrpcChannelOptions{HttpHandler = handler});
var clientJwt = new JwtSender.JwtSenderClient(channel);
var callJwt = clientJwt.SendJwt(new JwtRequest());
var jwtToken = callJwt.Message;

var client = new Greeter.GreeterClient(channel);
var headers = new Metadata();
headers.Add("Authorization", "Bearer " + jwtToken);
var call = client.SayHelloAsync(new HelloRequest(), headers: headers);
Console.WriteLine(call.ResponseAsync.Result.Message);
Console.WriteLine("Press any key to exit...");
Console.ReadKey();
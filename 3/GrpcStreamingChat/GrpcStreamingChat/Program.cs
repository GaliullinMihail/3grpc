using System.Text;
using GrpcStreamingChat.Jwt;
using GrpcStreamingChat.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.AddScoped<IJWTAuthenticationManager, JWTAuthenticationManager>();

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddSingleton<IChatRoomService, ChatRoomService>();

builder.WebHost.ConfigureKestrel(options =>
{
    // Setup a HTTP/2 endpoint without TLS.
    options.ListenLocalhost(50051, o => o.Protocols =
        HttpProtocols.Http2);
});

var key = Encoding.ASCII.GetBytes("TestTokenKeyJwtTokenKeyTestItFromTestTestTokenKeyJwtTokenKeyTestItFromTest");
services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
 
services.AddAuthorization();

var testSpesific = "CORS";

services.AddCors(options =>
{
    options.AddPolicy(name: testSpesific, policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3001")
            .AllowAnyHeader()
            .AllowCredentials()
            .AllowAnyMethod();
        policyBuilder.WithOrigins("http://localhost:8080")
            .AllowAnyHeader()
            .AllowCredentials()
            .AllowAnyMethod();
    });

});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<ChatService>();
app.MapGrpcService<GreeterService>();
app.MapGrpcService<JwtService>();
app.MapGet("/",
    () =>
        "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.UseCors(testSpesific);
app.UseAuthentication();
app.UseAuthorization();
app.Run();
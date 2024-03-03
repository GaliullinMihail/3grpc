using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace GrpcStreamingChat.Jwt;

public interface IJWTAuthenticationManager
{
    string Authenticate(string username, string password);
    void Register(string name);
}
 
public class JWTAuthenticationManager : IJWTAuthenticationManager
{
    IDictionary<string, string> users = new Dictionary<string, string>
    {
        { "test1", "password1" }
    };
 
    private readonly string tokenKey;
 
    public JWTAuthenticationManager()
    {
        this.tokenKey = "TestTokenKeyJwtTokenKeyTestItFromTestTestTokenKeyJwtTokenKeyTestItFromTest";
    }
 
    public string Authenticate(string username, string password)
    {
        if (!users.Any(u => u.Key == username && u.Value == password))
        {
            return null;
        }
 
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(tokenKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, username)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public void Register(string name)
    {
        users.Add(name, name);
    }
}
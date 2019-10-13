
using System.Collections.Generic;
using System.Security.Claims;
using Application.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;

public class JWTGenerator : IJWTGenerator
{
    
    private readonly SymmetricSecurityKey _key;
    public JWTGenerator(IConfiguration configuration)
    {        
        _key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
    }

    public string CreateToken(AppUser user)
    {
        var claims = new List<Claim>(){
            new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
        };
        //generate signing credentials        
        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = credentials,
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
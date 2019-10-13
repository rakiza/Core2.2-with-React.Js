using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class Login
    {
        public class Query:IRequest<User>{
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x=>x.Email).EmailAddress().NotEmpty();
                RuleFor(x=>x.Password).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Query,User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJWTGenerator _jWTGenerator;

            public Handler(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,IJWTGenerator jWTGenerator)
            {
                if (jWTGenerator is null)
                {
                    throw new System.ArgumentNullException(nameof(jWTGenerator));
                }

                _userManager = userManager ?? throw new System.ArgumentNullException(nameof(userManager));
                _signInManager = signInManager ?? throw new System.ArgumentNullException(nameof(signInManager));
                _jWTGenerator = jWTGenerator;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user= await _userManager.FindByEmailAsync(request.Email);
                if(user==null) 
                    throw new RestException(HttpStatusCode.Unauthorized);
                
                var result=await _signInManager.CheckPasswordSignInAsync(user,request.Password,false);

                if(!result.Succeeded)
                    throw new RestException(HttpStatusCode.Unauthorized);
                
                //TODO: Generate Token
                return new User{
                    DispalyName=user.DisplayName,
                    Username=user.UserName,
                    Token=_jWTGenerator.CreateToken(user),
                    Image=null
                };
            }
        }
    }
}
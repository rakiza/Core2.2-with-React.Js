using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Validators;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Register
    {

        public class Command : IRequest<User>
        {
            public string Username { get; set; }
            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Email).EmailAddress().NotEmpty();
                RuleFor(x => x.Password).PasswordValidator();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _datacontext;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJWTGenerator _jWTGenerator;

            public Handler(DataContext datacontext, UserManager<AppUser> userManager, IJWTGenerator jWTGenerator)
            {
                _datacontext = datacontext ?? throw new System.ArgumentNullException(nameof(datacontext));
                _userManager = userManager ?? throw new System.ArgumentNullException(nameof(userManager));
                _jWTGenerator = jWTGenerator ?? throw new System.ArgumentNullException(nameof(jWTGenerator));
            }

            public async Task<User> Handle(Command command, CancellationToken cancellationToken)
            {
                if (await _datacontext.Users.Where(x => x.Email == command.Email).AnyAsync())
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Email = "Email already exists!" });
                }
                if (await _datacontext.Users.Where(x => x.UserName == command.Username).AnyAsync())
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Username = "Username already exists!" });
                }

                var user = new AppUser
                {
                    UserName = command.Username,
                    Email = command.Email,
                    DisplayName = command.DisplayName
                };

                var result = await _userManager.CreateAsync(user, command.Password);

                if (!result.Succeeded)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest);

                return new User
                {
                    DispalyName = command.DisplayName,
                    Username = command.Username,
                    Token = _jWTGenerator.CreateToken(user),
                };






            }
        }
    }
}
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;

public class CurrentUser{

    public class Query:IRequest<User>
    {

    }

    public class Handler : IRequestHandler<Query, User>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJWTGenerator _jWTGenerator;
        private readonly IUserAccessor _userAccessor;

        public Handler(UserManager<AppUser> userManager,IJWTGenerator jWTGenerator,IUserAccessor userAccessor)
        {
            

            _userManager = userManager ?? throw new System.ArgumentNullException(nameof(userManager));
            _jWTGenerator = jWTGenerator ?? throw new System.ArgumentNullException(nameof(jWTGenerator));
            _userAccessor = userAccessor ?? throw new System.ArgumentNullException(nameof(userAccessor));
        }

        public async Task<User> Handle(Query request, CancellationToken cancellationToken)
        {
            var user= await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());
            return new User{
                DispalyName=user.DisplayName,
                Username=user.UserName,
                Token=_jWTGenerator.CreateToken(user),
                Image=null,
            };
        }
    }
}
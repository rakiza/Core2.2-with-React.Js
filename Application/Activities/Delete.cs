using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command:IRequest{
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _contex;

            public Handler(DataContext contex)
            {
                _contex = contex ?? throw new System.ArgumentNullException(nameof(contex));
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity= await _contex.Activities.FindAsync(request.Id);
                
                //if(activity==null) throw new Exception("Not Found !!!!");
                if(activity==null) throw new RestException(HttpStatusCode.NotFound,new{activity=$"activity with this id:{request.Id} not found!"});
                
                _contex.Activities.Remove(activity);
                var success=await _contex.SaveChangesAsync()>0;
                if(!success) throw new Exception("Error !!!!");
                return Unit.Value;
            }
        }
    }
}
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {    
        public class Query : IRequest<Activity>
        {
            public Query(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {   

                var activity=await _context.Activities.FindAsync(request.Id);

                if(activity==null) throw new RestException(HttpStatusCode.NotFound,new{activity=$"activity with this id:{request.Id} not found!"});
                
                return activity;
            }
        }
    }
}
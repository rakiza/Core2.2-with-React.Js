using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context)
            {
                
                _context = context ?? throw new System.ArgumentNullException(nameof(context));
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
               /*  try
                {
                    for (int i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        Console.WriteLine($"Task {i} compeleted...");
                    }
                }
                catch(Exception ex) when (ex is TaskCanceledException)
                {
                    Console.WriteLine($"Task was canceled!");
                } */
                var activities = await _context.Activities.ToListAsync();
                return activities;
                
            }
        }
    }
}
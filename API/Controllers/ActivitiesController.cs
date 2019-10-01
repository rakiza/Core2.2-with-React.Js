using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator ?? throw new System.ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAsync(CancellationToken cancellationToken)
        {
            return Ok(await _mediator.Send(new List.Query(),cancellationToken));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetAsync(Guid id){
            
            return Ok(await _mediator.Send(new Details.Query(id)));
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateAsync(Create.Command command){
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditAsync(Guid id,Edit.Command command){            
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteAsync(Guid id,Delete.Command command){
            return await _mediator.Send(command);
        }
    }
}
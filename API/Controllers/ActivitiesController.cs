using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {

        /* private readonly IMediator _mediator;
public ActivitiesController(IMediator mediator)
{
   _mediator = mediator ?? throw new System.ArgumentNullException(nameof(mediator));
}
*/
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAsync(CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new List.Query(), cancellationToken));
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetAsync(Guid id)
        {

            return Ok(await Mediator.Send(new Details.Query(id)));
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateAsync(Create.Command command)
        {
            //if(!ModelState.IsValid) return BadRequest(ModelState);
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditAsync(Guid id, Edit.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteAsync(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}
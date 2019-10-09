using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
              await HandelException(context,ex,_logger);
            }

            

        }

        private async Task HandelException(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors=null;
            switch(ex){
                case RestException re:
                _logger.LogError(ex,"Rest Error");
                errors=re.Errors;
                context.Response.StatusCode=(int)re.Code;

                break;
                case Exception e:
                errors=!string.IsNullOrWhiteSpace(e.Message)? e.Message:"Server Error";
                context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                break;
            }

            context.Response.ContentType="application/json";
            if(errors!=null){
                var result=JsonConvert.SerializeObject(new{errors});
                await context.Response.WriteAsync(result);
            }
            
        }
    }
}
using System;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().HasData(
                new Value{Id=1,Name="One"},
                new Value{Id=2,Name="Two"},
                new Value{Id=3,Name="Three"}
            );
        }
        public DbSet<Value> Values{get;set;}
    }
}

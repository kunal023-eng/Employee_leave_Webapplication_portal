using backend.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // 🔹 DbSets: These represent the tables in your database
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<LeaveRequest> LeaveRequests { get; set; }
    public DbSet<EmployeeManagerRelation> EmployeeManagerRelations { get; set; }
    public DbSet<MessageRequest> MessageRequests { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

     
        modelBuilder.Entity<LeaveRequest>()
            .HasOne(lr => lr.Employee)              
            .WithMany(e => e.LeaveRequests)          
            .HasForeignKey(lr => lr.EmployeeId)      
            .OnDelete(DeleteBehavior.Restrict);    

        modelBuilder.Entity<LeaveRequest>()
            .HasOne(lr => lr.ReviewedBy)             
            .WithMany(e => e.ReviewedRequests)       
            .HasForeignKey(lr => lr.ReviewedById)    
            .OnDelete(DeleteBehavior.Restrict);

        
        modelBuilder.Entity<EmployeeManagerRelation>()
            .HasOne(em => em.Employee)               
            .WithOne(e => e.AsEmployee)           
            .HasForeignKey<EmployeeManagerRelation>(em => em.EmployeeId) 
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<EmployeeManagerRelation>()
            .HasOne(em => em.Manager)                
            .WithMany(e => e.AsManager)              
            .HasForeignKey(em => em.ManagerId)
            .OnDelete(DeleteBehavior.Restrict);

      
        modelBuilder.Entity<EmployeeManagerRelation>()
            .HasIndex(em => em.EmployeeId)
            .IsUnique();

      
        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)               
            .WithMany(d => d.Employees)              
            .HasForeignKey(e => e.DepartmentId)      
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<MessageRequest>()
      .HasOne(m => m.Employee)
      .WithMany(e => e.SentMessages)
      .HasForeignKey(m => m.EmployeeId)
      .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<MessageRequest>()
            .HasOne(m => m.Manager)
            .WithMany(e => e.ReceivedMessages)
            .HasForeignKey(m => m.ManagerId)
            .OnDelete(DeleteBehavior.Restrict);



    }
}

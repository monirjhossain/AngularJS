using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace hospitalapi.Models
{
    public partial class hospitalContext : DbContext
    {
        public hospitalContext()
        {
        }

        public hospitalContext(DbContextOptions<hospitalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Administrators> Administrators { get; set; }
        public virtual DbSet<Appointments> Appointments { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Departments> Departments { get; set; }
        public virtual DbSet<Doctors> Doctors { get; set; }
        public virtual DbSet<Employees> Employees { get; set; }
        public virtual DbSet<Hospitals> Hospitals { get; set; }
        public virtual DbSet<Specialities> Specialities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Administrators>(entity =>
            {
                entity.HasKey(e => e.AdministratorId)
                    .HasName("PRIMARY");

                entity.ToTable("administrators");

                entity.Property(e => e.AdministratorId).HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");
            });

            modelBuilder.Entity<Appointments>(entity =>
            {
                entity.HasKey(e => e.AppointmentId)
                    .HasName("PRIMARY");

                entity.ToTable("appointments");

                entity.Property(e => e.AppointmentId).HasColumnType("int(11)");

                entity.Property(e => e.Customer)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Date)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Department)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Doctor)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.EmployeeId)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Payment).HasDefaultValueSql("'NULL'");

                entity.Property(e => e.SlotDate)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.SlotEndTime)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.SlotStartTime)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasKey(e => e.CustomerId)
                    .HasName("PRIMARY");

                entity.ToTable("customers");

                entity.Property(e => e.CustomerId).HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");
            });

            modelBuilder.Entity<Departments>(entity =>
            {
                entity.HasKey(e => e.DepartmentId)
                    .HasName("PRIMARY");

                entity.ToTable("departments");

                entity.Property(e => e.DepartmentId).HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");
            });

            modelBuilder.Entity<Doctors>(entity =>
            {
                entity.HasKey(e => e.DoctorId)
                    .HasName("PRIMARY");

                entity.ToTable("doctors");

                entity.Property(e => e.DoctorId).HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Availability)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Department)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Hospital)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Speciality)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");
            });

            modelBuilder.Entity<Employees>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PRIMARY");

                entity.ToTable("employees");

                entity.Property(e => e.EmployeeId).HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Hospital)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");
            });

            modelBuilder.Entity<Hospitals>(entity =>
            {
                entity.HasKey(e => e.HospitalId)
                    .HasName("PRIMARY");

                entity.ToTable("hospitals");

                entity.Property(e => e.HospitalId).HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");
            });

            modelBuilder.Entity<Specialities>(entity =>
            {
                entity.HasKey(e => e.SpecialityId)
                    .HasName("PRIMARY");

                entity.ToTable("specialities");

                entity.Property(e => e.SpecialityId).HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'NULL'");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

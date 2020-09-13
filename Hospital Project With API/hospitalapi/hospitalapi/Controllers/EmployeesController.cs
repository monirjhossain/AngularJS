using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hospitalapi.Models;

namespace hospitalapi.Controllers
{
    [Produces("application/json")]
    [Route("api/Employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly hospitalContext _context;

        public EmployeesController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [Route("GetAllEmployees")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employees>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: api/Employees/5
        [Route("GetEmployee/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Employees>> GetEmployees(int id)
        {
            var employees = await _context.Employees.FindAsync(id);

            if (employees == null)
            {
                return NotFound();
            }

            return employees;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateEmployee/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployees([FromRoute] int id, [FromBody] Employees employees)
        {
            if (id != employees.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employees).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Route("UpdateEmployeePassword/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministratorsPassword([FromRoute] int id, [FromBody] PasswordReset passwordReset)
        {
            var employees = await _context.Employees.FindAsync(id);
            ResponseModel er = new ResponseModel();

            if (employees == null)
            {
                er.statusCode = 404;
                er.message = "User Not Found";

                return NotFound(er);
            }

            if (employees.Password != passwordReset.CurrentPassword)
            {

                er.statusCode = 500;
                er.message = "Current Password Incorrect";
                return Ok(er);
            }

            if (employees.Password == passwordReset.Password)
            {
                er.statusCode = 409;
                er.message = "New password is same as previous";
                return Ok(er);
            }

            if (employees.Password == passwordReset.CurrentPassword)
            {
                employees.Password = passwordReset.Password;
                _context.Entry(employees).State = EntityState.Modified;
            }

            _context.Entry(employees).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                er.statusCode = 200;
                er.message = "Password Updated Sucessfully";
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(er);
        }

        // POST: api/Employees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddEmployee")]
        [HttpPost]
        public async Task<ActionResult<Employees>> PostEmployees([FromBody] Employees employees)
        {
            _context.Employees.Add(employees);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployees", new { id = employees.EmployeeId }, employees);
        }

        // DELETE: api/Employees/5
        [Route("DeleteEmployee/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employees>> DeleteEmployees(int id)
        {
            var employees = await _context.Employees.FindAsync(id);
            if (employees == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employees);
            await _context.SaveChangesAsync();

            return employees;
        }

        private bool EmployeesExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}

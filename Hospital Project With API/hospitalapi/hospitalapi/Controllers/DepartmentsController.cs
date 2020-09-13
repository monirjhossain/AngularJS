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
    [Route("api/Departments")]
    public class DepartmentsController : ControllerBase
    {
        private readonly hospitalContext _context;

        public DepartmentsController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [Route("GetAllDepartments")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Departments>>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        // GET: api/Departments/5
        [Route("GetDepartment/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Departments>> GetDepartments(int id)
        {
            var departments = await _context.Departments.FindAsync(id);

            if (departments == null)
            {
                return NotFound();
            }

            return departments;
        }

        // PUT: api/Departments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateDepartment/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartments([FromRoute] int id, [FromBody] Departments departments)
        {
            if (id != departments.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(departments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentsExists(id))
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

        // POST: api/Departments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddDepartment")]
        [HttpPost]
        public async Task<ActionResult<Departments>> PostDepartments([FromBody] Departments departments)
        {
            _context.Departments.Add(departments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartments", new { id = departments.DepartmentId }, departments);
        }

        // DELETE: api/Departments/5
        [Route("DeleteDepartment/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Departments>> DeleteDepartments(int id)
        {
            var departments = await _context.Departments.FindAsync(id);
            if (departments == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(departments);
            await _context.SaveChangesAsync();

            return departments;
        }

        private bool DepartmentsExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentId == id);
        }
    }
}

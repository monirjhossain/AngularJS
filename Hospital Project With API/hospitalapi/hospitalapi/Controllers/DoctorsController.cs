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
    [Route("api/Doctors")]
    public class DoctorsController : ControllerBase
    {
        private readonly hospitalContext _context;

        public DoctorsController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Doctors
        [Route("GetAllDoctors")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctors>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        // GET: api/Doctors/5
        [Route("GetDoctor/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctors>> GetDoctors(int id)
        {
            var doctors = await _context.Doctors.FindAsync(id);

            if (doctors == null)
            {
                return NotFound();
            }

            return doctors;
        }

        // PUT: api/Doctors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateDoctor/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctors([FromRoute] int id, [FromBody] Doctors doctors)
        {
            if (id != doctors.DoctorId)
            {
                return BadRequest();
            }

            _context.Entry(doctors).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorsExists(id))
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

        // POST: api/Doctors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddDoctor")]
        [HttpPost]
        public async Task<ActionResult<Doctors>> PostDoctors([FromBody] Doctors doctors)
        {
            _context.Doctors.Add(doctors);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoctors", new { id = doctors.DoctorId }, doctors);
        }

        // DELETE: api/Doctors/5
        [Route("DeleteDoctor/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Doctors>> DeleteDoctors(int id)
        {
            var doctors = await _context.Doctors.FindAsync(id);
            if (doctors == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctors);
            await _context.SaveChangesAsync();

            return doctors;
        }

        private bool DoctorsExists(int id)
        {
            return _context.Doctors.Any(e => e.DoctorId == id);
        }
    }
}

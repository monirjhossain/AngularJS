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
    [Route("api/Appointments")]
    public class AppointmentsController : ControllerBase
    {
        private readonly hospitalContext _context;

        public AppointmentsController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Appointments
        [Route("GetAllAppointments")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointments>>> GetAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }

        // GET: api/Appointments/5
        [Route("GetAppointment/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointments>> GetAppointments(int id)
        {
            var appointments = await _context.Appointments.FindAsync(id);

            if (appointments == null)
            {
                return NotFound();
            }

            return appointments;
        }

        // PUT: api/Appointments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateAppointment/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointments([FromRoute] int id, [FromBody] Appointments appointments)
        {
            if (id != appointments.AppointmentId)
            {
                return BadRequest();
            }

            _context.Entry(appointments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentsExists(id))
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

        // POST: api/Appointments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddAppointment")]
        [HttpPost]
        public async Task<ActionResult<Appointments>> PostAppointments([FromBody] Appointments appointments)
        {
            _context.Appointments.Add(appointments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointments", new { id = appointments.AppointmentId }, appointments);
        }

        // DELETE: api/Appointments/5
        [Route("DeleteAppointment/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Appointments>> DeleteAppointments(int id)
        {
            var appointments = await _context.Appointments.FindAsync(id);
            if (appointments == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointments);
            await _context.SaveChangesAsync();

            return appointments;
        }

        private bool AppointmentsExists(int id)
        {
            return _context.Appointments.Any(e => e.AppointmentId == id);
        }
    }
}

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
    [Route("api/Hospitals")]
    public class HospitalsController : ControllerBase
    {
        private readonly hospitalContext _context;

        public HospitalsController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Hospitals
        [Route("GetAllHospitals")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospitals>>> GetHospitals()
        {
            return await _context.Hospitals.ToListAsync();
        }

        // GET: api/Hospitals/5
        [Route("GetHospital/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospitals>> GetHospitals(int id)
        {
            var hospitals = await _context.Hospitals.FindAsync(id);

            if (hospitals == null)
            {
                return NotFound();
            }

            return hospitals;
        }

        // PUT: api/Hospitals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateHospital/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHospitals([FromRoute] int id, [FromBody] Hospitals hospitals)
        {
            if (id != hospitals.HospitalId)
            {
                return BadRequest();
            }

            _context.Entry(hospitals).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalsExists(id))
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

        [Route("UpdateHospitalPassword/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministratorsPassword([FromRoute] int id, [FromBody] PasswordReset passwordReset)
        {
            var hospitals = await _context.Hospitals.FindAsync(id);
            ResponseModel er = new ResponseModel();

            if (hospitals == null)
            {
                er.statusCode = 404;
                er.message = "User Not Found";

                return NotFound(er);
            }

            if (hospitals.Password != passwordReset.CurrentPassword)
            {

                er.statusCode = 500;
                er.message = "Current Password Incorrect";
                return Ok(er);
            }

            if (hospitals.Password == passwordReset.Password)
            {
                er.statusCode = 409;
                er.message = "New password is same as previous";
                return Ok(er);
            }

            if (hospitals.Password == passwordReset.CurrentPassword)
            {
                hospitals.Password = passwordReset.Password;
                _context.Entry(hospitals).State = EntityState.Modified;
            }

            _context.Entry(hospitals).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                er.statusCode = 200;
                er.message = "Password Updated Sucessfully";
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalsExists(id))
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

        // POST: api/Hospitals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddHospital")]
        [HttpPost]
        public async Task<ActionResult<Hospitals>> PostHospitals([FromBody] Hospitals hospitals)
        {
            _context.Hospitals.Add(hospitals);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHospitals", new { id = hospitals.HospitalId }, hospitals);
        }

        // DELETE: api/Hospitals/5
        [Route("DeleteHospital/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hospitals>> DeleteHospitals(int id)
        {
            var hospitals = await _context.Hospitals.FindAsync(id);
            if (hospitals == null)
            {
                return NotFound();
            }

            _context.Hospitals.Remove(hospitals);
            await _context.SaveChangesAsync();

            return hospitals;
        }

        private bool HospitalsExists(int id)
        {
            return _context.Hospitals.Any(e => e.HospitalId == id);
        }
    }
}

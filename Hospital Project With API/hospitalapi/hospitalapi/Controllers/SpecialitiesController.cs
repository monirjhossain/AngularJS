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
    [Route("api/Specialities")]
    public class SpecialitiesController : ControllerBase
    {
        private readonly hospitalContext _context;

        public SpecialitiesController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Specialities
        [Route("GetAllSpecialities/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Specialities>>> GetSpecialities()
        {
            return await _context.Specialities.ToListAsync();
        }

        // GET: api/Specialities/5
        [Route("GetSpeciality/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Specialities>> GetSpecialities(int id)
        {
            var specialities = await _context.Specialities.FindAsync(id);

            if (specialities == null)
            {
                return NotFound();
            }

            return specialities;
        }

        // PUT: api/Specialities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateSpeciality/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecialities([FromRoute] int id, [FromBody] Specialities specialities)
        {
            if (id != specialities.SpecialityId)
            {
                return BadRequest();
            }

            _context.Entry(specialities).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpecialitiesExists(id))
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

        [Route("AddSpeciality")]
        [HttpPost]
        public async Task<ActionResult<Specialities>> PostSpecialities([FromBody] Specialities specialities)
        {
            _context.Specialities.Add(specialities);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpecialities", new { id = specialities.SpecialityId }, specialities);
        }

        // DELETE: api/Specialities/5
        [Route("DeleteSpeciality/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Specialities>> DeleteSpecialities(int id)
        {
            var specialities = await _context.Specialities.FindAsync(id);
            if (specialities == null)
            {
                return NotFound();
            }

            _context.Specialities.Remove(specialities);
            await _context.SaveChangesAsync();

            return specialities;
        }

        private bool SpecialitiesExists(int id)
        {
            return _context.Specialities.Any(e => e.SpecialityId == id);
        }
    }
}

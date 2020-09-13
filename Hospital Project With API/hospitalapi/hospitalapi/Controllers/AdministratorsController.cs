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
    [Route("api/Administrators")]
    public class AdministratorsController : ControllerBase
    {
        private readonly hospitalContext _context;

        public AdministratorsController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Administrators
        [Route("GetAllAdministrators")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Administrators>>> GetAdministrators()
        {
            return await _context.Administrators.ToListAsync();
        }

        // GET: api/Administrators/5
        [Route("GetAdministrator/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Administrators>> GetAdministrators(int id)
        {
            var administrators = await _context.Administrators.FindAsync(id);

            if (administrators == null)
            {
                return NotFound();
            }

            return administrators;
        }

        // PUT: api/Administrators/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateAdministrator/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministrators([FromRoute]  int id, [FromBody] Administrators administrators)
        {
            if (id != administrators.AdministratorId)
            {
                return BadRequest();
            }

            _context.Entry(administrators).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministratorsExists(id))
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

        // PUT: api/Administrators/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateAdministratorPassword/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministratorsPassword([FromRoute] int id, [FromBody] PasswordReset passwordReset)
        {
            var administrators = await _context.Administrators.FindAsync(id);
            ResponseModel er = new ResponseModel();

            if (administrators == null)
            {
                er.statusCode = 404;
                er.message = "User Not Found";

                return NotFound(er);
            }

            if (administrators.Password != passwordReset.CurrentPassword) {

                er.statusCode = 500;
                er.message = "Current Password Incorrect";
                return Ok(er);
            }

            if (administrators.Password == passwordReset.Password)
            {
                er.statusCode = 409;
                er.message = "New password is same as previous";
                return Ok(er);
            }

            if (administrators.Password == passwordReset.CurrentPassword)
            {
                administrators.Password = passwordReset.Password;
                _context.Entry(administrators).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
                er.statusCode = 200;
                er.message = "Password Updated Sucessfully";
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministratorsExists(id))
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

        // POST: api/Administrators
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddAdministrator")]
        [HttpPost]
        public async Task<ActionResult<Administrators>> PostAdministrators([FromBody] Administrators administrators)
        {
            _context.Administrators.Add(administrators);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdministrators", new { id = administrators.AdministratorId }, administrators);
        }

        // DELETE: api/Administrators/5
        [Route("DeleteAdministrator/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Administrators>> DeleteAdministrators(int id)
        {
            var administrators = await _context.Administrators.FindAsync(id);
            if (administrators == null)
            {
                return NotFound();
            }

            _context.Administrators.Remove(administrators);
            await _context.SaveChangesAsync();

            return administrators;
        }

        private bool AdministratorsExists(int id)
        {
            return _context.Administrators.Any(e => e.AdministratorId == id);
        }
    }
}

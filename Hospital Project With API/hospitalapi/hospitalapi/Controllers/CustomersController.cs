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
    [Route("api/Customers")]
    public class CustomersController : ControllerBase
    {
        private readonly hospitalContext _context;

        public CustomersController(hospitalContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [Route("GetAllCustomers")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customers>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [Route("GetCustomer/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Customers>> GetCustomers(int id)
        {
            var customers = await _context.Customers.FindAsync(id);

            if (customers == null)
            {
                return NotFound();
            }

            return customers;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpdateCustomer/{id:int}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomers([FromRoute] int id, [FromBody] Customers customers)
        {
            if (id != customers.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomersExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("AddCustomer")]
        [HttpPost]
        public async Task<ActionResult<Customers>> PostCustomers([FromBody] Customers customers)
        {
            _context.Customers.Add(customers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomers", new { id = customers.CustomerId }, customers);
        }

        // DELETE: api/Customers/5
        [Route("DeleteCustomer/{id:int}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customers>> DeleteCustomers(int id)
        {
            var customers = await _context.Customers.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customers);
            await _context.SaveChangesAsync();

            return customers;
        }

        private bool CustomersExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}

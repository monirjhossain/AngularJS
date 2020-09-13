using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using hospitalapi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace hospitalapi.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class LoginController : ControllerBase
    {
        private hospitalContext _context;

        public LoginController(hospitalContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Login user)
        {
            var responseAdmin = _context.Administrators.Where(x => x.Username == user.Username).FirstOrDefault();
            var responseHospital = _context.Hospitals.Where(x => x.Username == user.Username).FirstOrDefault();
            var responseEmployee = _context.Employees.Where(x => x.Username == user.Username).FirstOrDefault();


            if (responseAdmin == null && responseHospital == null && responseEmployee == null)
            {
                return BadRequest(new { message = "User Not Found" });
            }
            else if (responseAdmin != null)
            {

                if (responseAdmin.Password != user.Password)
                {
                    return BadRequest(new { message = "Password Incorrect" });
                }
                else
                {

                    var claimData = new[] { new Claim(ClaimTypes.Name, "email") };
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature);

                    var token = new JwtSecurityToken(
                        issuer: "https://localhost:44336",
                        audience: "https://localhost:44336",
                        claims: claimData,
                        expires: DateTime.Now.AddHours(10),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Ok(new { data = responseAdmin, token = tokenString, statusCode = 200, R = 1, message = "Admin Request Completed Sucessfully" });

                }
            }
            else if (responseEmployee != null)
            {
                if (responseEmployee.Password != user.Password)
                {
                    return BadRequest(new { message = "Password Incorrect" });
                }
                else
                {

                    var claimData = new[] { new Claim(ClaimTypes.Name, "email") };
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature);

                    var token = new JwtSecurityToken(
                        issuer: "https://localhost:44336",
                        audience: "https://localhost:44336",
                        claims: claimData,
                        expires: DateTime.Now.AddHours(10),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Ok(new { data = responseEmployee, token = tokenString, statusCode = 200, R = 3, message = "Employee Request Completed Sucessfully" });

                }
            }
            else if (responseHospital != null)
            {
                if (responseHospital.Password != user.Password)
                {
                    return BadRequest(new { message = "Password Incorrect" });
                }
                else
                {

                    var claimData = new[] { new Claim(ClaimTypes.Name, "email") };
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature);

                    var token = new JwtSecurityToken(
                        issuer: "https://localhost:44336",
                        audience: "https://localhost:44336",
                        claims: claimData,
                        expires: DateTime.Now.AddHours(2),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Ok(new { data = responseHospital, token = tokenString, statusCode = 200, R = 2, message = "Hpospital Request Completed Sucessfully" });

                }
            }
            else {
                return BadRequest(new { message = "Server Error" });
            }
        }

        private IActionResult Ok(int v1, string v2)
        {
            throw new NotImplementedException();
        }
    }
}


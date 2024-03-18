using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;
using LanguageClient.DTO;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http;
using System;

namespace LanguageClient.Pages.Login
{
    public class LoginModel : PageModel
    {
        private readonly HttpClient _httpClient;

        public LoginModel(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public string ErrorMessage { get; set; }
        public  void OnGet()
        {
            HttpContext.Session.Clear();

        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var loginData = new { Username = Username, Password = Password };
            var jsonData = JsonSerializer.Serialize(loginData);
            var stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://api-languagefree.cosplane.asia/api/Accounts/Login", stringContent);

            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = await response.Content.ReadFromJsonAsync<TokenReponse>();

                // Lưu token vào session
                HttpContext.Session.SetString("AccessToken", tokenResponse.AccessToken);

                return RedirectToPage("/Index");
            }
            else
            {
                ErrorMessage = "Invalid login credentials";
                return Page();
            }


        }
    } 
}
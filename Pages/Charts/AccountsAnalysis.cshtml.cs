using LanguageClient.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using System.Net.Http.Json;

namespace LanguageClient.Pages.Charts
{
    public class AccountsAnalysisModel : PageModel
    {
        private readonly HttpClient _httpClient;
        public List<Accounts> Accounts { get; private set; } = new List<Accounts>();

        public AccountsAnalysisModel(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IActionResult> OnGet()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Accounts");

                if (response.IsSuccessStatusCode)
                {
                    Accounts = await response.Content.ReadFromJsonAsync<List<Accounts>>();
                }
                else
                {
                    Accounts = new List<Accounts>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                Accounts = new List<Accounts>();
            }

            return Page();
        }
    }
}

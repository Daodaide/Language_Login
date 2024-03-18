using LanguageClient.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using System.Net.Http.Json;

namespace LanguageClient.Pages.OpinionsHub
{
    public class RatingModel : PageModel
    {
        private readonly HttpClient _httpClient;
        public List<Rates> Rates { get; private set; } = new List<Rates>();

        public RatingModel(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IActionResult> OnGet()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Rates");

                if (response.IsSuccessStatusCode)
                {
                    Rates = await response.Content.ReadFromJsonAsync<List<Rates>>();
                }
                else
                {
                    Rates = new List<Rates>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                Rates = new List<Rates>();
            }

            return Page();
        }
    }
}

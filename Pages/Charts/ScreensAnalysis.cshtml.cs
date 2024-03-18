using LanguageClient.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http;

namespace LanguageClient.Pages.Charts
{
    public class ScreensAnalysisModel : PageModel
    {
        private readonly HttpClient _httpClient;
        public List<PageScreens> PageScreens { get; private set; } = new List<PageScreens>();

        public ScreensAnalysisModel(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IActionResult> OnGet()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Pages");

                if (response.IsSuccessStatusCode)
                {
                    PageScreens = await response.Content.ReadFromJsonAsync<List<PageScreens>>();
                }
                else
                {
                    PageScreens = new List<PageScreens>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                PageScreens = new List<PageScreens>();
            }

            return Page();
        }
      
    }
}

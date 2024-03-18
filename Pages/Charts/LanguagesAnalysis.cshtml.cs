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
    public class LanguagesAnalysisModel : PageModel
    {
        private readonly HttpClient _httpClient;
        public List<LanguageLogs> LanguageLogs { get; private set; } = new List<LanguageLogs>();

        public LanguagesAnalysisModel(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IActionResult> OnGet()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/LanguageLogs");

                if (response.IsSuccessStatusCode)
                {
                    LanguageLogs = await response.Content.ReadFromJsonAsync<List<LanguageLogs>>();
                }
                else
                {
                    LanguageLogs = new List<LanguageLogs>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                LanguageLogs = new List<LanguageLogs>();
            }

            return Page();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using LanguageClient.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace LanguageClient.Pages.Admin
{
    public class RatesModel : PageModel
    {
       public readonly HttpClient _httpClient;

        public List<Comments> Comments { get; set; } = new List<Comments>();
        public List<Rates> Rates { get; set; } = new List<Rates>();
        public List<PageScreens> PageScreens { get; set; } = new List<PageScreens>();
        public List<Users> Users { get; set; } = new List<Users>();

        public RatesModel(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IActionResult> OnGet()
        {
            try
            {
                var response = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Comments");
                var response1 = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Rates");
                var response2 = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Pages");
                var response3 = await _httpClient.GetAsync("http://api-languagefree.cosplane.asia/api/Users/getAllUsers");



                if (response.IsSuccessStatusCode && response1.IsSuccessStatusCode && response2.IsSuccessStatusCode && response3.IsSuccessStatusCode)
                {
                    Comments = await response.Content.ReadFromJsonAsync<List<Comments>>();
                    Rates = await response1.Content.ReadFromJsonAsync<List<Rates>>();
                    PageScreens = await response2.Content.ReadFromJsonAsync<List<PageScreens>>();
                    Users = await response3.Content.ReadFromJsonAsync<List<Users>>();


                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching : {ex.Message}");
            }

            return Page();
        }
    }
}
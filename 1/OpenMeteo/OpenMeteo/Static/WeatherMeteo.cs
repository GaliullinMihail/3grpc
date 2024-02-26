using OpenMeteo.Models;
using Newtonsoft.Json;

namespace OpenMeteo.Static;

public static class WeatherMeteo
{
    private static OpenMeteoResponse? _model = null;

    public static async Task<OpenMeteoResponse> GetData()
    {
        var client = new HttpClient();
        if (_model is not null) return _model!;
        var response = await client.GetAsync(
            "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&past_days=92");
        var data = await response.Content.ReadAsStringAsync();

        _model = JsonConvert.DeserializeObject<OpenMeteoResponse>(data);

        return _model!;

    }
}
using Grpc.Core;
using OpenMeteo.Static;

namespace OpenMeteo.Services;

public class OpenMeteoService : Weather.WeatherBase
{
    public override async Task GetWeatherStream(
        WeatherRequest request,
        IServerStreamWriter<WeatherData> responseStream,
        ServerCallContext context)
    {
        var openMeteoResponse = await WeatherMeteo.GetData();
        
        var i = 0;
        while (!context.CancellationToken.IsCancellationRequested && i*2 < openMeteoResponse.Hourly.Time.Length)
        {
            await responseStream.WriteAsync(new WeatherData
            {
                Now = DateTime.Now.ToString("HH.mm.ss"),
                DateTime = openMeteoResponse.Hourly.Time[2*i],
                Temperature = openMeteoResponse.Hourly.Temperature_2m[2*i]
            });
            i ++;
            await Task.Delay(TimeSpan.FromSeconds(1));
        }
    }
}

export const calculateMetrics = (data: any[]) => {
  const temperature = { avg: 0, max: 0, min: 0 };
  const humidity = { avg: 0, max: 0, min: 0 };
  const other = { avg: 0, max: 0, min: 0 };

  if (data.length > 0) {
    const temperatures = data.map((d: any) => d.sensor_value.temperature);
    temperature.avg =
      temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
    temperature.max = Math.max(...temperatures);
    temperature.min = Math.min(...temperatures);

    const humidities = data.map((d: any) => d.sensor_value.humidity);
    humidity.avg = humidities.reduce((a, b) => a + b, 0) / humidities.length;
    humidity.max = Math.max(...humidities);
    humidity.min = Math.min(...humidities);

    const others = data.map((d: any) => d.sensor_value.other);
    other.avg = others.reduce((a, b) => a + b, 0) / others.length;
    other.max = Math.max(...others);
    other.min = Math.min(...others);
  }

  return { temperature, humidity, other };
};

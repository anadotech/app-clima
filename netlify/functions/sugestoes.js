exports.handler = async function (event) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const texto = event.queryStringParameters.texto;

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(texto)}&limit=5&appid=${apiKey}`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  return {
    statusCode: resposta.status,
    body: JSON.stringify(dados),
  };
};
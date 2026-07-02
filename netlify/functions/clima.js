exports.handler = async function (event) {
  const apiKey = process.env.OPENWEATHER_API_KEY; // a chave vem de uma variável de ambiente, não do código
  const cidade = event.queryStringParameters.cidade;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  return {
    statusCode: resposta.status,
    body: JSON.stringify(dados),
  };
};
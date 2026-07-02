exports.handler = async function (event) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const texto = event.queryStringParameters.texto;

  const url = `/.netlify/functions/sugestoes?texto=${texto}`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  return {
    statusCode: resposta.status,
    body: JSON.stringify(dados),
  };
};
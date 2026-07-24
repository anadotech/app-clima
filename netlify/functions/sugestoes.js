exports.handler = async function (event) {
  const apiKey = process.env.GEODB_API_KEY;
  const texto = event.queryStringParameters.texto;

  // namePrefix = texto digitado | limit = quantidade de sugestões
  // minPopulation = filtra cidades muito pequenas
  // sort=-population = ordena das mais populosas pras menos populosas

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(texto)}&limit=5&minPopulation=1000&sort=-population`;

  const resposta = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  });

  const dados = await resposta.json();

  // A GeoDB devolve os resultados dentro de "data"
  // Se der algum erro, devolve uma lista vazia pra não quebrar o front-end
  return {
    statusCode: resposta.status,
    body: JSON.stringify(dados.data || []),
  };
};
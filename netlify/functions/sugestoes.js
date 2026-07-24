exports.handler = async function (event) {
  const apiKey = process.env.GEODB_API_KEY;
  const texto = event.queryStringParameters.texto;

  // namePrefix = texto digitado | limit = quantidade de sugestões
  // minPopulation = filtra cidades muito pequenas/obscuras
  // sort=-population = ordena das mais populosas pras menos populosas
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(texto)}&limit=10&minPopulation=1000&sort=-population`;

  const resposta = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  });

  const dados = await resposta.json();
  const cidades = dados.data || [];

  // Remove duplicatas: a GeoDB às vezes tem a mesma cidade cadastrada
  // mais de uma vez (com IDs diferentes). Comparamos nome+estado+país
  // pra manter só uma ocorrência de cada.
  const vistos = new Set();
  const cidadesUnicas = cidades.filter((cidade) => {
    const chave = `${cidade.city}-${cidade.region}-${cidade.country}`;
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });

  // Se der algum erro, devolve uma lista vazia pra não quebrar o front-end
  return {
    statusCode: resposta.status,
    body: JSON.stringify(cidadesUnicas.slice(0, 5)),
  };
};
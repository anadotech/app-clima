// ===== SELEÇÃO DOS ELEMENTOS DO HTML =====
// Guarda uma referência de cada elemento pra podermos ler valores e atualizar conteúdo
const inputCidade = document.getElementById('inputCidade');       // campo onde a pessoa digita a cidade
const btnBuscar = document.getElementById('btnBuscar');           // botão que dispara a busca
const resultado = document.getElementById('resultado');           // div onde o clima será exibido
const listaSugestoes = document.getElementById('listaSugestoes'); // lista de sugestões de cidades

// ===== MAPA DE ÍCONES =====
// Traduz o código de ícone da API (ex: "01d") pra um emoji correspondente
const iconesClima = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️'
};

// ===== MAPA DE FUNDOS =====
// Traduz o código de ícone da API pra uma classe CSS de fundo correspondente
const fundosClima = {
  '01d': 'fundo-sol', '01n': 'fundo-noite',
  '02d': 'fundo-nublado', '02n': 'fundo-noite',
  '03d': 'fundo-nublado', '03n': 'fundo-nublado',
  '04d': 'fundo-nublado', '04n': 'fundo-nublado',
  '09d': 'fundo-chuva', '09n': 'fundo-chuva',
  '10d': 'fundo-chuva', '10n': 'fundo-chuva',
  '11d': 'fundo-chuva', '11n': 'fundo-chuva',
  '13d': 'fundo-neve', '13n': 'fundo-neve',
  '50d': 'fundo-nublado', '50n': 'fundo-nublado'
};

// ===== FUNÇÃO PRINCIPAL: BUSCA O CLIMA NA API =====
// Recebe o nome da cidade, busca os dados na OpenWeatherMap e exibe o resultado na tela
async function buscarClima(cidade) {
  resultado.innerHTML = `<p>Carregando...</p>`; // mostra isso assim que a busca começa

  // Monta a URL da requisição com os parâmetros necessários:
  // q = cidade | appid = chave | units = metric (Celsius) | lang = português
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  // Faz a requisição pra API e espera a resposta chegar
  const resposta = await fetch(url);

  // Se a API não encontrou a cidade (ou outro erro), avisa o usuário e para a função aqui
  if (!resposta.ok) {
    resultado.innerHTML = `<p>Cidade não encontrada. Verifique o nome e tente novamente.</p>`;
    return;
  }

  // Converte a resposta (formato bruto) em um objeto JavaScript legível
  const dados = await resposta.json();

  // Pega a descrição do clima (ex: "céu limpo") e formata com a primeira letra maiúscula
  const descricao = dados.weather[0].description;
  const descricaoFormatada = descricao.charAt(0).toUpperCase() + descricao.slice(1);

  // Responsável pelo ícone de acordo com o clima
  const icone = dados.weather[0].icon;
  const emojiClima = iconesClima[icone] || '🌡️'; // se não encontrar, usa um termômetro como padrão

  // Responsável pela cor de fundo de acordo com o clima
  const classeFundo = fundosClima[icone] || 'fundo-nublado';
  document.body.className = classeFundo;

  // Insere os dados formatados dentro da div "resultado"
  resultado.innerHTML = `
    <div class="icone-clima">${emojiClima}</div>
    <h2 class="nome-cidade">${dados.name}</h2>
    <p class="temperatura">${Math.round(dados.main.temp)}°</p>
    <p class="descricao">${descricaoFormatada}</p>
    <div class="grid-info">
      <div class="card-info">
        <span class="label-info">Sensação</span>
        <span class="valor-info">${Math.round(dados.main.feels_like)}°C</span>
      </div>
      <div class="card-info">
        <span class="label-info">Umidade</span>
        <span class="valor-info">${dados.main.humidity}%</span>
      </div>
    </div>
  `;
} // ← fecha a função buscarClima

// ===== FUNÇÃO: BUSCA SUGESTÕES DE CIDADES =====
// Recebe o texto digitado e busca cidades que combinam, usando a Geocoding API
async function buscarSugestoes(texto) {
  // Se o campo tiver menos de 2 letras, limpa a lista e não faz nada
  if (texto.length < 2) {
    listaSugestoes.innerHTML = '';
    return;
  }

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${texto}&limit=5&appid=${apiKey}`;
  const resposta = await fetch(url);
  const cidades = await resposta.json();

  // Monta um <li> pra cada cidade encontrada
  listaSugestoes.innerHTML = cidades.map(cidade => `
    <li>${cidade.name}${cidade.state ? ', ' + cidade.state : ''}, ${cidade.country}</li>
  `).join('');
} // ← fecha a função buscarSugestoes

// ===== EVENTO DE CLIQUE NO BOTÃO =====
// Quando o botão "Buscar" é clicado, pega o valor digitado e chama a função buscarClima
btnBuscar.addEventListener('click', () => {
  const cidade = inputCidade.value;
  buscarClima(cidade);
});

// ===== EVENTO DE DIGITAÇÃO NO CAMPO =====
// Toda vez que a pessoa digita algo, busca sugestões de cidades
inputCidade.addEventListener('input', () => {
  buscarSugestoes(inputCidade.value);
});

// ===== EVENTO DE CLIQUE NA LISTA DE SUGESTÕES =====
// Usa delegação de eventos: escuta cliques na <ul> inteira,
// e verifica se o clique foi especificamente em um <li>
listaSugestoes.addEventListener('click', (evento) => {
  if (evento.target.tagName === 'LI') {
    const cidadeEscolhida = evento.target.textContent;
    inputCidade.value = cidadeEscolhida; // preenche o campo com a cidade clicada
    listaSugestoes.innerHTML = ''; // fecha a lista de sugestões
    buscarClima(cidadeEscolhida); // já busca o clima direto
  }
});
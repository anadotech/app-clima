## App Clima ☀️

Aplicação web para consulta de previsão do tempo em tempo real. O usuário digita o nome de uma cidade, recebe sugestões inteligentes enquanto digita e visualiza as condições climáticas atuais de forma clara e visual.

Deploy: [clima-previsao.netlify.app](https://clima-previsao.netlify.app/) Repositório: [github.com/anadotech/app-clima](https://github.com/anadotech/app-clima)

---

## Sobre o projeto

A ideia surgiu como forma de praticar consumo de APIs externas e arquitetura serverless na prática, indo além de um app de clima simples. Ao longo do desenvolvimento, alguns problemas reais precisaram ser resolvidos, como sugestões de cidades pouco relevantes ou duplicadas, o que acabou tornando o projeto um bom exercício de refinamento de experiência do usuário, não só de funcionalidade básica.

## Funcionalidades

* Busca de clima por nome da cidade
* Autocomplete de cidades com debounce, evitando requisições desnecessárias a cada tecla digitada
* Sugestões filtradas por população mínima e sem duplicatas, priorizando resultados relevantes
* Exibição da previsão atual: temperatura, sensação térmica, umidade e condição do tempo
* Fundo dinâmico que se adapta visualmente à condição climática
* Chaves de API protegidas por funções serverless
* Layout responsivo


## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (vanilla)
* Netlify Functions (serverless, para proteger as chamadas às APIs)
* OpenWeatherMap API — dados de clima
* GeoDB Cities API (via RapidAPI) — sugestões de cidades com filtro de população


## Arquitetura
Para não expor as chaves de API no código do front-end, todas as requisições passam por funções serverless hospedadas na Netlify:

* `clima.js` — busca os dados de clima na OpenWeatherMap
* `sugestoes.js` — busca sugestões de cidades na GeoDB Cities, já filtradas por população mínima e sem duplicatas


```
Usuário digita → Front-end (JS, com debounce) → Netlify Function → API externa
                        ←──────────────── resposta ───────────────┘

```

As chaves (`OPENWEATHER_API_KEY` e `GEODB_API_KEY`) ficam armazenadas como variáveis de ambiente na Netlify, acessíveis apenas pelas funções serverless. Em nenhum momento chegam ao navegador do usuário.

## Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/anadotech/app-clima.git
 
# Entre na pasta do projeto
cd app-clima
 
# Faça login na sua conta Netlify (abre o navegador para autorização)
netlify login
 
# Conecte esta pasta ao site já existente na Netlify
netlify link
 
# Rode o projeto localmente (necessário para simular as funções serverless)
netlify dev
```

O comando `netlify link` conecta a pasta ao projeto correspondente na sua conta Netlify, o que disponibiliza automaticamente as variáveis de ambiente configuradas lá (`OPENWEATHER_API_KEY` e `GEODB_API_KEY`) para o ambiente local — não é necessário criar um arquivo `.env` manualmente.
 
> Este projeto não possui dependências via npm (`package.json`), portanto não é necessário rodar `npm install`.

## Estrutura do projeto

```
app-clima/
├── netlify/
│   └── functions/
│       ├── clima.js
│       └── sugestoes.js
├── index.html
├── style.css
├── script.js
└── README.md
```

## Autora
Desenvolvido por Ana Clara Lopes, estudante de Análise e Desenvolvimento de Sistemas, em formação como desenvolvedora web.

* GitHub: [github.com/anadotech](https://github.com/anadotech)
* LinkedIn: [linkedin.com/in/anadotech/](https://www.linkedin.com/in/anadotech/)

## Licença
Este projeto está sob a licença MIT.
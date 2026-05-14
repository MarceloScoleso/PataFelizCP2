# PataFeliz - Petshop (CP2 FIAP)

Projeto desenvolvido para o **Checkpoint 2** da FIAP. Site institucional de um petshop ficticio chamado **PataFeliz**, com foco em diferenciais inovadores no mercado pet.

## Equipe

| RM     | Nome                                |
| ------ | ----------------------------------- |
| 571626 | Marcelo Antonio Scoleso Junior      |
| 571306 | Joao Paulo Francisco de Oliveira    |
| 571340 | Julia Souza Matarazzo               |
| 572607 | Gabriel Souza Alexandre Silva       |

## Como rodar localmente

1. Clone o repositorio.
2. Abra a pasta no VSCode.
3. Instale a extensao **Live Server** (recomendada em `.vscode/extensions.json`).
4. Clique com o botao direito em `index.html` e selecione **Open with Live Server**.

Tambem funciona abrindo `index.html` direto no navegador.

## Estrutura

```
cp2/
- index.html                    Home
- pages/
  - portifolio.html             Servicos, precos, promocoes
  - sobre.html                  Historia, valores, equipe
  - contato.html                Formulario + FAQ + mapa
- src/
  - assets/
    - img/                      Logos da marca + fotos do projeto (todas locais)
    - pdf/                      Prototipo Figma exportado em PDF
  - css/estilo.css              Estilo principal
  - js/script.js                Comportamento e interatividade
- .vscode/                      Configuracoes da IDE
- Equipes.txt                   Identificacao da equipe + link GitHub Pages
```

## Diferenciais inovadores do PataFeliz

- **PataCam**: cameras ao vivo durante o banho/tosa
- **TeleVet 24h**: consulta veterinaria online emergencial
- **Clube PataFeliz**: box mensal com IA selecionando produtos
- **AdoPet**: programa integrado de adocao responsavel
- **Drive-Thru de Banho**: banho express sem sair do carro
- **Diario do Pet**: acompanhamento de humor, saude e habitos

## Tecnologias

- HTML5 semantico (header, nav, main, section, article, aside, footer)
- CSS3 (variaveis, Grid, Flexbox, animacoes, mobile-first)
- JavaScript vanilla (IntersectionObserver, validacao de form, mood widget)
- Google Fonts (Poppins + Fraunces)

## Deploy

Hospedado no **GitHub Pages**. Link no arquivo `Equipes.txt`.

## Acessibilidade

- Estrutura semantica completa
- Labels e ARIA em todos campos
- Contraste AA em textos
- Navegacao por teclado
- Indicacao de campos obrigatorios

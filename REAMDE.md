# Problema Inicial

A empresa possui um formulário de cadastro de candidatos para uma vaga de emprego.

![Formulário do banco de talentos](https://i.imgur.com/7aL0kgZ.png)

Quando algum candidato se inscrevia pelo formulário, os dados eram enviados por e-mail e nossa recrutadora passava os dados à mão para uma planilha do Excel. Como esse processo era trabalhoso e levava muito tempo, resolvi automatizar a criação dessa planilha.


# Solução

Solução feita em: ***10 horas***.

## Guardar informações dos candidatos no Banco de Dados

Agora, quando o candidato clica em "enviar", as informações são armazenados com MongoDB.

## Gerar planilha

Sempre que a recrutadora precisar, ela pode baixar uma planilha com todos os dados dos candidatos. Também é possível filtrar os candidatos por área de atuação. Um processo que antes levava horas, agora é feito com apenas alguns cliques! Demonstração [disponível aqui](https://guidiasz.github.io/formulario-para-excel/).

![enter image description here](https://i.imgur.com/vD2Ypsk.png)

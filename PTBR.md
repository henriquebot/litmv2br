# Legend In The Mist — PT-BR

Esta distribuição mantém o **ID oficial `mist-engine-fvtt`** para preservar compatibilidade com mundos e pacotes que dependem do sistema, mas adiciona uma camada de localização brasileira e personalização visual sobre o código oficial de [MrTheBino/mist-engine-fvtt](https://github.com/MrTheBino/mist-engine-fvtt).

## Escopo

- Interface do sistema em **Português (Brasil)**.
- Botões, fichas, diálogos, configurações, notificações, rolagens, colaboração e **Solicitar Ajuda** localizados.
- Tours do Narrador e dos jogadores em PT-BR.
- Referência **Como Jogar** em PT-BR.
- Textos originalmente hardcoded no JavaScript e nos templates convertidos para localização.
- Tema visual opcional **Sci-Fi**, selecionável nas configurações do sistema.
- Visual oficial preservado como padrão.
- **Conteúdo dos compêndios oficiais não é traduzido**. `packs/` e `src/packs/` permanecem idênticos ao upstream oficial.

## Tema visual

Em **Configurações do Sistema → Tema Visual**:

- **Padrão — Legend in the Mist** mantém a aparência oficial.
- **Sci-Fi** aplica uma interface escura e tecnológica, com detalhes em ciano, sem alterar regras ou dados do jogo.

## Atualizações do sistema oficial

A branch `upstream-official` é mantida como espelho limpo de `MrTheBino/mist-engine-fvtt:main`.

A branch `main` contém:

1. a base oficial;
2. a camada PT-BR;
3. o tema Sci-Fi opcional;
4. ajustes de localização necessários para textos que o upstream ainda mantém hardcoded.

O workflow **Sync Official Upstream Mirror** atualiza somente `upstream-official`. Ele nunca sobrescreve diretamente a branch `main`, evitando que uma atualização oficial apague a tradução.

## Versionamento PT-BR

Para manter versões puramente numéricas compatíveis com a comparação de versões do Foundry, a revisão PT-BR é codificada no patch.

Exemplo:

- upstream: `14.5.4`
- PT-BR revisão 01: `14.5.401`

Quando a base oficial mudar, a versão PT-BR acompanha a nova base antes da revisão local.

## Instalação

Use o manifesto da release mais recente deste repositório:

`https://github.com/henriquebot/litmv2br/releases/latest/download/system.json`

## Base oficial

Código original e desenvolvimento principal:

https://github.com/MrTheBino/mist-engine-fvtt

Legend In The Mist é propriedade de seus respectivos detentores. Esta distribuição preserva os créditos e a licença do projeto original.

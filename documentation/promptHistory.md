# Histórico de Prompts

## Interação 1
**Data/Hora**: 2026-03-30
**Prompt**: comece configurando nosso mcp com o github utilizando o github token ghp_***

## Interação 2
**Data/Hora**: 2026-03-30
**Prompt**: vamos recomeçar, quero fazer o deploy desse projeto em um repositorio no meu github com a github token ghp_***

## Interação 3
**Data/Hora**: 2026-03-30
**Prompt**: Atue como o Orquestrador deste workspace seguindo rigorosamente o framework de 3 Camadas e as Global Rules.

CONTEXTO: O repositório antigravity-p1teste-arkanoid já possui as pastas /frontend, /backend, /documentation, /directives e /execution. O arquivo directives/arkanoid_logic.md deve ser lido e atualizado com as novas regras abaixo.

ESPECIFICAÇÕES DO JOGO:

Fluxo de Telas: Implemente uma tela de carregamento com o botão 'Iniciar Jogo' que leva à seleção de 3 níveis de dificuldade (Fácil, Médio, Difícil). A dificuldade deve escalar a velocidade base da bola.

Progressão e Fases: O jogo possui 3 fases com cenários Arkanoid distintos em temática Steampunk. Ao concluir cada fase, o jogador ganha uma 'Coroa' e avança. Concluir as 3 fases exibe a mensagem de 'Campeão'.

Vidas e Game Over: O jogador inicia com 5 vidas. Cada erro remove 1 vida. Ao zerar, exiba 'GAME OVER' e a pontuação final. O reinício (Barra de Espaço) retorna à seleção de dificuldade.

Controles e Nave: Movimentação via Mouse, Setas (Esq/Dir) ou teclas A/D. A estética deve ser colorida e espacial.

Itens Especiais (Drops Aleatórios):

Multi-Ball: Transforma a bola atual em 3. O jogador só perde vida se as 3 caírem no poço.

Bar Expansion: Duplica a largura da nave.

Super Tiro: Permite disparar tiros pelos cantos da nave pressionando 'Espaço'.

Nota: Itens são cumulativos, mas resetam ao mudar de fase.

AÇÕES OBRIGATÓRIAS:

Frontend (React/Vite/Tailwind): Desenvolva toda a lógica visual e mecânica no /frontend. Garanta performance estável para o Game Loop.

Backend (Node.js/Express): Prepare a estrutura no /backend para futuras integrações com Firebase.

Documentação de Auditoria: Atualize o arquivo documentation/promptHistory.md com este prompt integral e refine o README.md bilíngue na raiz, destacando o uso do Google Antigravity e do framework de 3 camadas.

Não inicie a codificação sem confirmar a leitura e compreensão total deste plano.

## Interação 4
**Data/Hora**: 2026-03-30
**Prompt (Respostas à Implementação)**:
- "utilize javascript" (referente ao Frontend Vite).
- "apenas a casca basica" (referente ao Backend Express/Firebase).

## Interação 5
**Data/Hora**: 2026-03-30
**Prompt (Ajustes Visuais)**:
quero blocos coloridos nas fases, quero a raquete com um visual um pouco mais alto, talvez lembrando uma nave. e quero que a pagina de campeão que tem um efeito de quicar, passe a quicar sempre a metade do último quique, até que o efeito pare

## Interação 6
**Data/Hora**: 2026-03-30
**Prompt (Atualizar Repositório)**:
perfeito, atualize o repositorio

## Interação 7
**Data/Hora**: 2026-03-30
**Prompt (Atualização do README)**:
atualize o readme.md

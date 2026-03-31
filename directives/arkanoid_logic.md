# Procedimento Operacional: Lógica do Arkanoid

## Objetivo
Criar um motor de jogo Arkanoid responsivo e modular.

## Requisitos Técnicos
1. **Fluxo de Telas:**
   - Tela de carregamento com botão "Iniciar Jogo".
   - Seleção de Dificuldade: Fácil, Médio, Difícil (impacta na velocidade base da bola).
2. **Progressão e Fases:**
   - 3 Fases com cenários distintos.
   - Temática: Steampunk Espacial.
   - Recompensa por fase: Ganho de uma 'Coroa' ao concluir.
   - Mensagem de "Campeão" ao concluir as 3 fases.
3. **Vidas e Game Over:**
   - Vidas iniciais: 5.
   - Punição: 1 vida perdida a cada erro (bola cair no poço).
   - Zerar vidas: Exibir "GAME OVER" e a pontuação final.
   - Reinício: Retornar à seleção de dificuldade (press: Barra de Espaço).
4. **Controles e Interface:**
   - Movimentação do Paddle: Mouse, Setas (Esq/Dir) ou teclas A/D.
   - Estética colorida e espacial (Steampunk).
5. **Itens Especiais (Drops Aleatórios):**
   - *Multi-Ball*: Transforma a bola atual em 3. Perde vida apenas se as 3 caírem.
   - *Bar Expansion*: Duplica a largura da nave.
   - *Super Tiro*: Dispara tiros pelos cantos da nave pressionando 'Espaço'.
   - *Comportamento*: Itens cumulativos, mas resetados na troca de fase.
6. **Game Loop:**
   - Utilizar `requestAnimationFrame` para garantia de 60 FPS no frontend em React/Vite.
   - Tailwind CSS para UI (Score, Telas).
   - Preparação do server Node/Express para futuras integrações (ex: Leaderboard com Firebase).
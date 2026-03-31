<div align="center">

# 🧱 Arkanoid Antigravity | P1 Teste
🚀 **Powered by [Google Antigravity](https://ai.google.dev/)**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

*A modern web application built with AI assistance.*

[Português](#-sobre-o-projeto-pt-br) • [English](#-about-the-project-en)

</div>

---

## 🇧🇷 Sobre o Projeto (PT-BR)

Este repositório contém a implementação do projeto **Arkanoid Antigravity**, desenvolvido com a orquestração e o auxílio especializado do **Antigravity-kit** (SENAI Ourinhos Edition). O projeto é gerenciado seguindo rigorosamente o **Framework de 3 Camadas** (Frontend, Backend, Documentação/Diretrizes), maximizando produtividade, previsibilidade e a qualidade do código.

O jogo é uma versão moderna do clássico Arkanoid, contando com uma temática estética **Steampunk Espacial**, diversos níveis de dificuldade, fases progressivas e sistema de drops e *power-ups* (Multi-ball, Bar Expansion, Super Tiro).

### 🚀 Funcionalidades Chave Implementadas
- **Motor Físico Customizado (`useGameEngine`)**: Desenvolvido em Hooks usando `useRef` atrelado a `requestAnimationFrame` para cravar 60 FPS sem gargalos do Virtual DOM do React.
- **Renderização Performática**: Utiliza a `Canvas 2D API` para pintar blocos coloridos, a raquete-nave, as bolinhas e gerenciar os gradientes/sombras Steampunk puros, minimizando uso excessivo de recursos web.
- **Design de IU e UX Cativante**: Animações customizadas de CSS nativo integradas (*Decaying Bounce* na vitória) e interfaces de dificuldade estilizadas via **Tailwind CSS**.

### 🤖 Agentes e Skills Utilizados
- **@frontend-specialist** (com `frontend-design`, `tailwind-patterns`)
- **@backend-specialist** (com `api-patterns`)
- **@project-planner** (planejamento de estruturação, `plan-writing`)
- *Skill Pack Empregado*: `clean-code`, `behavioral-modes`

### 🏗️ Estrutura de Diretórios (Framework de 3 Camadas)
- `/frontend` - Camada de Interface: Lógica visual e mecânica do Game Loop (React + Vite + TailwindCSS).
- `/backend` - Camada de Gestão de Estados: Servidor Node.js Base (preparado para persistência de Firestore Leaderboards).
- `/documentation` & `/directives` - Camada de Orquestração: Arquivos arquiteturais (incluindo `promptHistory.md`) garantindo a governança da IA.

---

## 🇺🇸 About the Project (EN)

This repository contains the implementation of the **Arkanoid Antigravity** project, developed with the specialized orchestration of the **Antigravity-kit** (SENAI Ourinhos Edition). The project is managed strictly following the **3-Layer Framework** (Frontend, Backend, Documentation/Directives), maximizing productivity, predictability and code quality.

The game is a modern version of the classic Arkanoid, featuring a **Space Steampunk** thematic aesthetic, multiple difficulty levels, progressive stages, and a power-up drop system (Multi-ball, Bar Expansion, Super Shot).

### 🚀 Key Implemented Features
- **Custom Game Engine (`useGameEngine`)**: Developed as a custom React Hook utilizing `useRef` tied to `requestAnimationFrame` strictly delivering 60 FPS without React's Virtual DOM stutters.
- **High-Performance Rendering**: Offloads the complex visuals (Steampunk gradients, glowing bullets, the spaceship paddle) entirely to the `Canvas 2D API`.
- **Aesthetic UI/UX Edge**: Incorporates custom native CSS animations (such as decaying bouncy Victory modals) stylized with **Tailwind CSS**.

### 🤖 Agents and Skills Used
- **@frontend-specialist** (with `frontend-design`, `tailwind-patterns`)
- **@backend-specialist** (with `api-patterns`)
- **@project-planner** (planning & structuring, `plan-writing`)
- *Skill Pack Employed*: `clean-code`, `behavioral-modes`

### 🏗️ Directory Structure (3-Layer Framework)
- `/frontend` - Interface Layer: Visual logic and Game Loop mechanics (React + Vite + TailwindCSS).
- `/backend` - API/Data Layer: Base Node.js Server ready for Firestore Leaderboard integration.
- `/documentation` & `/directives` - Orchestration Layer: Architecture files (including `promptHistory.md`) ensuring AI task governance.

---
<div align="center">
  <i>Desenvolvido com 🪽 Antigravity</i>
</div>

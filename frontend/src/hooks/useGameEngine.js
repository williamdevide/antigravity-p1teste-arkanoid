import { useRef, useEffect, useState } from 'react';

// Game Constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 25;
const BALL_RADIUS = 8;
const BRICK_ROW_COUNT = 5;
const BRICK_COLUMN_COUNT = 9;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 20;

const DROP_TYPES = ['MULTI_BALL', 'BAR_EXPANSION', 'SUPER_SHOT'];

export const useGameEngine = (onGameOver, onVictory, onLevelUp, currentLevel, initialDifficulty) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    // Game State Object (to avoid React re-renders on every frame)
    const state = useRef({
        lives: 5,
        score: 0,
        difficultySpeed: initialDifficulty === 'Fácil' ? 3 : initialDifficulty === 'Médio' ? 5 : 7,
        paddle: {
            x: (GAME_WIDTH - PADDLE_WIDTH) / 2,
            width: PADDLE_WIDTH,
            isBarExpanded: false,
            superShotActive: false
        },
        balls: [{
            x: GAME_WIDTH / 2,
            y: GAME_HEIGHT - 30,
            dx: initialDifficulty === 'Fácil' ? 3 : initialDifficulty === 'Médio' ? 5 : 7,
            dy: -(initialDifficulty === 'Fácil' ? 3 : initialDifficulty === 'Médio' ? 5 : 7),
            radius: BALL_RADIUS,
            active: true
        }],
        bricks: [],
        bullets: [],
        drops: [],
        keys: { ArrowLeft: false, ArrowRight: false, a: false, d: false, " ": false },
        mouseX: null,
        spacebarHandler: null,
        level: currentLevel,
        isPaused: false
    });

    const [uiState, setUiState] = useState({
        lives: 5,
        score: 0,
        level: currentLevel
    });

    // Sync level prop to state when advancing
    useEffect(() => {
        state.current.level = currentLevel;
    }, [currentLevel]);

    const initBricks = (levelIndex) => {
        const bricks = [];
        // Steampunk patterns change by level
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                // Different layout per level
                let status = 1;
                if (levelIndex === 2 && (c % 2 === 0)) status = 0;
                if (levelIndex === 3 && (r % 2 === 0 && c % 2 !== 0)) status = 0;

                if (status === 1) {
                    bricks.push({
                        x: (c * (BRICK_WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT,
                        y: (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP,
                        status: 1,
                        hasDrop: Math.random() > 0.85, // 15% chance of drop
                        colorRow: r // Save row index to color it
                    });
                }
            }
        }
        state.current.bricks = bricks;
        // Reset effects on new level
        state.current.paddle.isBarExpanded = false;
        state.current.paddle.width = PADDLE_WIDTH;
        state.current.paddle.superShotActive = false;
        state.current.bullets = [];
        state.current.drops = [];
        state.current.balls = [{
            x: state.current.paddle.x + state.current.paddle.width / 2,
            y: GAME_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 1,
            dx: state.current.difficultySpeed,
            dy: -state.current.difficultySpeed,
            radius: BALL_RADIUS,
            active: true
        }];
    };

    useEffect(() => {
        initBricks(currentLevel);
    }, [currentLevel]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (state.current.keys.hasOwnProperty(e.key)) {
                state.current.keys[e.key] = true;
            }
            if (e.key === ' ' && state.current.paddle.superShotActive && !state.current.isPaused) {
                // Fire bullets
                state.current.bullets.push({ x: state.current.paddle.x, y: GAME_HEIGHT - PADDLE_HEIGHT, dy: -8 });
                state.current.bullets.push({ x: state.current.paddle.x + state.current.paddle.width, y: GAME_HEIGHT - PADDLE_HEIGHT, dy: -8 });
            }
        };

        const handleKeyUp = (e) => {
            if (state.current.keys.hasOwnProperty(e.key)) {
                state.current.keys[e.key] = false;
            }
        };

        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;
            if(!canvas) return;
            const relativeX = e.clientX - canvas.getBoundingClientRect().left;
            if (relativeX > 0 && relativeX < GAME_WIDTH) {
                state.current.mouseX = relativeX;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const spawnDrop = (x, y) => {
        const type = DROP_TYPES[Math.floor(Math.random() * DROP_TYPES.length)];
        state.current.drops.push({ x, y, type, dy: 3, active: true });
    };

    const activateDrop = (type) => {
        const s = state.current;
        if (type === 'MULTI_BALL') {
            const b = s.balls.find(ball => ball.active);
            if (b) {
                s.balls.push({ ...b, dx: -b.dx });
                s.balls.push({ ...b, dx: b.dx * 1.5 });
            }
        } else if (type === 'BAR_EXPANSION') {
            s.paddle.isBarExpanded = true;
            s.paddle.width = PADDLE_WIDTH * 2;
        } else if (type === 'SUPER_SHOT') {
            s.paddle.superShotActive = true;
        }
    };

    const updatePhysics = () => {
        const s = state.current;

        // Paddle Movement
        if ((s.keys.ArrowRight || s.keys.d) && s.paddle.x < GAME_WIDTH - s.paddle.width) {
            s.paddle.x += 7;
        } else if ((s.keys.ArrowLeft || s.keys.a) && s.paddle.x > 0) {
            s.paddle.x -= 7;
        } else if (s.mouseX !== null) {
            s.paddle.x = s.mouseX - s.paddle.width / 2;
            s.paddle.x = Math.max(0, Math.min(GAME_WIDTH - s.paddle.width, s.paddle.x));
            s.mouseX = null; // consume mouse
        }

        // Bullets logic
        for (let i = s.bullets.length - 1; i >= 0; i--) {
            let b = s.bullets[i];
            b.y += b.dy;
            if (b.y < 0) s.bullets.splice(i, 1);
            else {
                for (let j = 0; j < s.bricks.length; j++) {
                    let br = s.bricks[j];
                    if (br.status === 1 && b.x > br.x && b.x < br.x + BRICK_WIDTH && b.y > br.y && b.y < br.y + BRICK_HEIGHT) {
                        br.status = 0;
                        s.score += 10;
                        if (br.hasDrop) spawnDrop(br.x, br.y);
                        s.bullets.splice(i, 1);
                        break;
                    }
                }
            }
        }

        // Drops logic
        for (let i = s.drops.length - 1; i >= 0; i--) {
            let d = s.drops[i];
            d.y += d.dy;
            if (d.y > GAME_HEIGHT) {
                s.drops.splice(i, 1);
            } else if (d.y + 10 > GAME_HEIGHT - PADDLE_HEIGHT && d.x > s.paddle.x && d.x < s.paddle.x + s.paddle.width) {
                activateDrop(d.type);
                s.drops.splice(i, 1);
            }
        }

        // Balls Logic
        let activeBallsCount = 0;
        s.balls.forEach(ball => {
            if (!ball.active) return;
            
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall collision
            if (ball.x + ball.dx > GAME_WIDTH - ball.radius || ball.x + ball.dx < ball.radius) {
                ball.dx = -ball.dx;
            }
            if (ball.y + ball.dy < ball.radius) {
                ball.dy = -ball.dy;
            } else if (ball.y + ball.dy > GAME_HEIGHT - ball.radius - PADDLE_HEIGHT) {
                // Paddle collision
                if (ball.x > s.paddle.x && ball.x < s.paddle.x + s.paddle.width) {
                    ball.dy = -Math.abs(ball.dy);
                    // Add some english
                    let hitPoint = ball.x - (s.paddle.x + s.paddle.width / 2);
                    ball.dx = hitPoint * 0.15;
                    // clamp speed
                    let speed = Math.sqrt(ball.dx*ball.dx + ball.dy*ball.dy);
                    let targetSpeed = s.difficultySpeed * (s.paddle.isBarExpanded ? 1.2 : 1.1);
                    ball.dx = (ball.dx / speed) * targetSpeed;
                    ball.dy = (ball.dy / speed) * targetSpeed;

                } else if (ball.y + ball.dy > GAME_HEIGHT - ball.radius) {
                    // Fall in pit
                    ball.active = false;
                }
            }

            // Brick collision
            for (let i = 0; i < s.bricks.length; i++) {
                let br = s.bricks[i];
                if (br.status === 1) {
                    if (ball.x > br.x && ball.x < br.x + BRICK_WIDTH && ball.y > br.y && ball.y < br.y + BRICK_HEIGHT) {
                        ball.dy = -ball.dy;
                        br.status = 0;
                        s.score += 10;
                        if (br.hasDrop) spawnDrop(br.x, br.y);
                    }
                }
            }
            
            if (ball.active) activeBallsCount++;
        });

        // Check level win
        if (s.bricks.filter(b => b.status === 1).length === 0) {
            s.isPaused = true;
            if (s.level < 3) {
                onLevelUp(s.level + 1);
            } else {
                onVictory(s.score);
            }
            return;
        }

        // Check lives
        if (activeBallsCount === 0) {
            s.lives -= 1;
            if (s.lives <= 0) {
                s.isPaused = true;
                onGameOver(s.score);
            } else {
                // Reset paddle and ball
                s.paddle.isBarExpanded = false;
                s.paddle.width = PADDLE_WIDTH;
                s.paddle.superShotActive = false;
                s.drops = [];
                s.bullets = [];
                s.balls = [{
                    x: GAME_WIDTH / 2,
                    y: GAME_HEIGHT - 30,
                    dx: s.difficultySpeed,
                    dy: -s.difficultySpeed,
                    radius: BALL_RADIUS,
                    active: true
                }];
            }
        }

        // Sync UI State
        setUiState({
            lives: s.lives,
            score: s.score,
            level: s.level
        });
    };

    const loop = (time) => {
        if(!state.current.isPaused) updatePhysics();
        // The render is handled by the CanvasRenderer component getting the state ref
        requestRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return { canvasRef, gameState: state, uiState, initBricks };
};

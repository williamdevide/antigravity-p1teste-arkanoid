import React, { useEffect } from 'react';

const CanvasRenderer = ({ canvasRef, gameState }) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const draw = () => {
            const s = gameState.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Background (Steampunk feel)
            ctx.fillStyle = '#1a0b16';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Bricks
            const brickColors = [
                ['#b87333', '#8b4513'], // Copper
                ['#00ffff', '#008888'], // Neon Cyan
                ['#ff9900', '#cc7a00'], // Neon Orange
                ['#d4af37', '#aa8c2c'], // Brass
                ['#ff00ff', '#880088']  // Magenta
            ];
            s.bricks.forEach(brick => {
                if (brick.status === 1) {
                    const colors = brickColors[(brick.colorRow || 0) % brickColors.length];
                    let gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + 20);
                    gradient.addColorStop(0, colors[0]);
                    gradient.addColorStop(1, colors[1]);
                    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(brick.x, brick.y, 75, 20);
                    
                    ctx.strokeStyle = '#ffffff'; // White border for contrast
                    ctx.strokeRect(brick.x, brick.y, 75, 20);
                }
            });

            // Draw Paddle (Spaceship)
            let paddleGrad = ctx.createLinearGradient(s.paddle.x, canvas.height - 25, s.paddle.x, canvas.height);
            paddleGrad.addColorStop(0, '#d4af37');
            paddleGrad.addColorStop(1, '#b87333');
            ctx.fillStyle = paddleGrad;
            
            ctx.shadowBlur = s.paddle.superShotActive ? 20 : 10;
            ctx.shadowColor = s.paddle.superShotActive ? '#00ffff' : '#ff9900';
            
            ctx.beginPath();
            ctx.moveTo(s.paddle.x + 5, canvas.height); // bottom left
            ctx.lineTo(s.paddle.x, canvas.height - 10); // left wing tip
            ctx.lineTo(s.paddle.x + 15, canvas.height - 25); // left nose
            ctx.lineTo(s.paddle.x + s.paddle.width / 2, canvas.height - 30); // center nose
            ctx.lineTo(s.paddle.x + s.paddle.width - 15, canvas.height - 25); // right nose
            ctx.lineTo(s.paddle.x + s.paddle.width, canvas.height - 10); // right wing tip
            ctx.lineTo(s.paddle.x + s.paddle.width - 5, canvas.height); // bottom right
            ctx.fill();
            
            // Engine glow
            ctx.fillStyle = s.paddle.superShotActive ? '#00ffff' : '#ff9900';
            ctx.beginPath();
            ctx.arc(s.paddle.x + s.paddle.width / 2, canvas.height, 8, 0, Math.PI, true);
            ctx.fill();
            ctx.shadowBlur = 0; // reset

            // Draw Balls
            ctx.fillStyle = '#00ffff'; // Neon Cyan
            s.balls.forEach(ball => {
                if(ball.active) {
                    ctx.beginPath();
                    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
                }
            });

            // Draw Drops
            s.drops.forEach(drop => {
                ctx.fillStyle = drop.type === 'MULTI_BALL' ? '#ff00ff' : drop.type === 'BAR_EXPANSION' ? '#00ff00' : '#ff0000';
                ctx.beginPath();
                ctx.arc(drop.x, drop.y, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                ctx.fillStyle = '#ffffff';
                ctx.font = '10px Arial';
                ctx.fillText(drop.type.charAt(0), drop.x - 3, drop.y + 3);
            });

            // Draw Bullets
            ctx.fillStyle = '#ffff00';
            s.bullets.forEach(bullet => {
                ctx.fillRect(bullet.x, bullet.y, 4, 10);
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, [gameState]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border-4 border-steampunk-brass shadow-[0_0_20px_#d4af37] cursor-none bg-steampunk-bg"
            style={{ display: 'block', margin: '0 auto' }}
        />
    );
};

export default CanvasRenderer;

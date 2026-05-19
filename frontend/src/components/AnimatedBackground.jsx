import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const colors = ['#6c63ff', '#ff4c60', '#00bf8e', '#fbc02d'];
        const particles = [];

        for (let i = 0; i < 15; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 100 + 50,
                dx: (Math.random() - 0.5) * 1,
                dy: (Math.random() - 0.5) * 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < -p.radius) p.x = canvas.width + p.radius;
                if (p.x > canvas.width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = canvas.height + p.radius;
                if (p.y > canvas.height + p.radius) p.y = -p.radius;

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color + '40'); // 25% opacity
                gradient.addColorStop(1, p.color + '00'); // 0% opacity

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0, 
                pointerEvents: 'none',
                opacity: 0.6
            }} 
        />
    );
};

export default AnimatedBackground;

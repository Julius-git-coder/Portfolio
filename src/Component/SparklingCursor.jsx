
import React, { useEffect, useState, useCallback } from 'react';
import './SparklingCursor.css';

const SparklingCursor = () => {
    const [sparkles, setSparkles] = useState([]);
    const [isHovering, setIsHovering] = useState(false);

    const createSparkle = useCallback((x, y, isEnhanced) => {
        const id = Date.now() + Math.random();
        const size = isEnhanced ? Math.random() * 15 + 10 : Math.random() * 8 + 4;
        const type = Math.random() > 0.7 ? 'star' : 'circle';

        // Theme-matched colors
        const colors = ['#3b82f6', '#a855f7', '#6366f1', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const newSparkle = {
            id,
            x,
            y,
            size,
            type,
            color,
        };

        setSparkles((prev) => [...prev.slice(-30), newSparkle]);

        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 1000);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            createSparkle(e.clientX, e.clientY, isHovering);
            // Create an extra sparkle if hovering
            if (isHovering && Math.random() > 0.5) {
                createSparkle(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20, true);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [createSparkle, isHovering]);

    return (
        <div className="sparkle-container">
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className={`sparkle ${sparkle.type}`}
                    style={{
                        left: sparkle.x,
                        top: sparkle.y,
                        width: sparkle.size,
                        height: sparkle.size,
                        backgroundColor: sparkle.color,
                        boxShadow: `0 0 10px ${sparkle.color}`,
                    }}
                />
            ))}
        </div>
    );
};

export default SparklingCursor;

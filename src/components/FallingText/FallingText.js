import React, { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import "./FallingText.css";

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'hover', // 'hover', 'click', 'scroll', 'auto'
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Effect to build the initial word spans from the text prop
  useEffect(() => {
    if (!textRef.current) return;
    
    // Split text into sentences after each period, then process each sentence.
    // This allows us to insert <br /> tags between them.
    const sentences = text.split(/(?<=\.)\s*/).filter(s => s.length > 0);

    const newHTML = sentences.map((sentence, sentenceIndex) => {
      // For each sentence, split it into words and spaces.
      const wordsAndSpaces = sentence.split(/(\s+)/);
      const sentenceHTML = wordsAndSpaces.map((part) => {
        if (part.trim() === '') {
          return `<span class="word" style="white-space: pre;">${part}</span>`;
        }
        const isHighlighted = highlightWords.some((hw) => part.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${part}</span>`;
      }).join('');
      
      // Add a line break after each sentence except the last one.
      return sentenceHTML + (sentenceIndex < sentences.length - 1 ? '<br /><br />' : '');
    }).join('');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // Effect to handle non-interactive triggers like 'scroll' or 'auto'
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    const currentContainer = containerRef.current;
    if (trigger === 'scroll' && currentContainer) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(currentContainer);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Main Matter.js physics effect
  useEffect(() => {
    // Store refs in local variables inside the effect
    const currentContainer = containerRef.current;
    const currentText = textRef.current;
    const currentCanvasContainer = canvasContainerRef.current;

    // Don't run if the effect isn't triggered or refs are not set
    if (!effectStarted || !currentContainer || !currentText) {
      return;
    }

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const containerRect = currentContainer.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    // Don't run if container has no size
    if (width <= 0 || height <= 0) return;
    
    // Hide the original static text
    currentText.style.visibility = 'hidden';

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: currentCanvasContainer,
      engine,
      options: { width, height, background: backgroundColor, wireframes }
    });

    const boundaryOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const wordSpans = currentText.querySelectorAll('.word, br');
    
    const wordBodies = Array.from(wordSpans)
      .filter(elem => elem.tagName !== 'BR')
      .map(elem => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const animatedElem = elem.cloneNode(true);
        animatedElem.style.position = 'absolute';
        animatedElem.style.left = `${x}px`;
        animatedElem.style.top = `${y}px`;
        animatedElem.style.transform = 'translate(-50%, -50%)';
        animatedElem.classList.add('animated-word');
        currentContainer.appendChild(animatedElem);
        
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: 'transparent' },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2
        });

        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

        return { elem: animatedElem, body };
    });

    const mouse = Mouse.create(currentContainer);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } }
    });

    render.mouse = mouse;
    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);
    
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animationFrameId;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    // This cleanup function runs when the effect stops (e.g., on unhover)
    return () => {
      cancelAnimationFrame(animationFrameId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && currentCanvasContainer && currentCanvasContainer.contains(render.canvas)) {
         currentCanvasContainer.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);

      currentContainer.querySelectorAll('.animated-word').forEach(el => el.remove());
      
      if (currentText) {
        currentText.style.visibility = 'visible';
      }
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, text]);

  // Handlers to start and stop the effect
  const handleMouseEnter = () => {
    if (trigger === 'hover') setEffectStarted(true);
  };

  const handleMouseLeave = () => {
    // As requested, unhover resets the effect for both hover and click triggers
    if (trigger === 'hover' || trigger === 'click') setEffectStarted(false);
  };
  
  const handleClick = () => {
    if (trigger === 'click') setEffectStarted(true);
  }

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={textRef}
        className="falling-text-target" 
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;

// ===== DOM Elements =====
const trainA = document.getElementById('trainA');
const trainB = document.getElementById('trainB');
const phaseIndicator = document.getElementById('phaseIndicator');

// ===== SVG Path References =====
const mainLinePath = document.getElementById('mainLine');
const topLoopPath = document.getElementById('topLoop');
const bottomLoopPath = document.getElementById('bottomLoop');

// ===== Animation State =====
let isAnimating = false;
let currentPhase = 0;

// ===== Helper: Get Point on SVG Path =====
/**
 * Get coordinates at a specific progress point along an SVG path
 * @param {SVGPathElement} path - The SVG path element
 * @param {number} progress - Progress from 0 to 1
 * @returns {{x: number, y: number}} - Coordinates on the path
 */
function getPointOnPath(path, progress) {
    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength(progress * pathLength);
    return { x: point.x, y: point.y };
}

// ===== Helper: Position Train =====
/**
 * Position a train element at specific SVG coordinates
 * @param {HTMLElement} train - The train element
 * @param {number} x - X coordinate in SVG viewBox
 * @param {number} y - Y coordinate in SVG viewBox
 */
function positionTrain(train, x, y) {
    // Convert SVG coordinates to percentage of container
    const xPercent = (x / 1000) * 100;
    const yPercent = (y / 600) * 100;
    
    train.style.left = `${xPercent}%`;
    train.style.top = `${yPercent}%`;
}

// ===== Core Animation Function =====
/**
 * Animate a train along a path
 * @param {HTMLElement} train - The train element to animate
 * @param {SVGPathElement} path - The path to follow
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} delay - Delay before starting in milliseconds
 * @returns {Promise} - Resolves when animation completes
 */
function animateTrain(train, path, duration, delay = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const startTime = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth movement
                const easedProgress = easeInOutCubic(progress);
                
                // Get position on path
                const point = getPointOnPath(path, easedProgress);
                positionTrain(train, point.x, point.y);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }
            
            requestAnimationFrame(animate);
        }, delay);
    });
}

// ===== Easing Function =====
function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ===== Phase 1: Train A on Main Line, Train B on Loops =====
async function runPhase1() {
    currentPhase = 1;
    updatePhaseIndicator('Phase 1: Train A → Main Line | Train B → Loops');
    
    // Train A: Main line (left to right) - 6 seconds
    const trainAPromise = animateTrain(trainA, mainLinePath, 6000);
    
    // Train B: Top loop (3 seconds) then bottom loop (3 seconds)
    const trainBPromise = (async () => {
        await animateTrain(trainB, topLoopPath, 3000);
        await animateTrain(trainB, bottomLoopPath, 3000);
    })();
    
    // Wait for both trains to complete
    await Promise.all([trainAPromise, trainBPromise]);
}

// ===== Phase 2: Train B on Main Line, Train A on Loops =====
async function runPhase2() {
    currentPhase = 2;
    updatePhaseIndicator('Phase 2: Train B → Main Line | Train A → Loops');
    
    // Train B: Main line (right to left) - 6 seconds
    // We need to reverse the path direction
    const trainBPromise = animateTrainReverse(trainB, mainLinePath, 6000);
    
    // Train A: Top loop (3 seconds) then bottom loop (3 seconds)
    const trainAPromise = (async () => {
        await animateTrain(trainA, topLoopPath, 3000);
        await animateTrain(trainA, bottomLoopPath, 3000);
    })();
    
    // Wait for both trains to complete
    await Promise.all([trainBPromise, trainAPromise]);
}

// ===== Helper: Animate Train in Reverse =====
function animateTrainReverse(train, path, duration, delay = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const startTime = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Reverse progress (1 to 0)
                const easedProgress = easeInOutCubic(1 - progress);
                
                const point = getPointOnPath(path, easedProgress);
                positionTrain(train, point.x, point.y);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }
            
            requestAnimationFrame(animate);
        }, delay);
    });
}

// ===== Update Phase Indicator =====
function updatePhaseIndicator(text) {
    phaseIndicator.textContent = text;
    phaseIndicator.style.animation = 'none';
    setTimeout(() => {
        phaseIndicator.style.animation = 'fadeInOut 1s ease-in-out';
    }, 10);
}

// ===== Initialize Positions =====
function initializePositions() {
    // Train A starts at left end of main line
    const pointA = getPointOnPath(mainLinePath, 0);
    positionTrain(trainA, pointA.x, pointA.y);
    
    // Train B starts at right end of main line
    const pointB = getPointOnPath(mainLinePath, 1);
    positionTrain(trainB, pointB.x, pointB.y);
}

// ===== Main Animation Loop =====
async function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Initial idle for 1 second
    updatePhaseIndicator('Ready to start...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Continuous loop
    while (isAnimating) {
        await runPhase1();
        await runPhase2();
    }
}

// ===== Initialize on Load =====
window.addEventListener('DOMContentLoaded', () => {
    initializePositions();
    startAnimation();
});

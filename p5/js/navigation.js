/**
 * Lesson Navigation System
 * Handles prev/next navigation and progress tracking
 */

const LESSONS = [
  { id: 'canvas', number: 1, title: 'The Canvas', path: '01-canvas.html' },
  { id: 'shapes', number: 2, title: 'Shapes', path: '02-shapes.html' },
  { id: 'numbers', number: 3, title: 'Drawing with Numbers', path: '03-numbers.html' },
  { id: 'conditionals', number: 4, title: 'Conditional Statements', path: '04-conditionals.html' },
  { id: 'loops', number: 5, title: 'Loops', path: '05-loops.html' },
  { id: 'motion', number: 6, title: 'Motion', path: '06-motion.html' },
  { id: 'interaction', number: 7, title: 'Interaction', path: '07-interaction.html' },
  { id: 'typography', number: 8, title: 'Typography', path: '08-typography.html' },
  { id: 'variation', number: 9, title: 'Variation', path: '09-variation.html' }
];

const TOTAL_LESSONS = LESSONS.length;

/**
 * Get current lesson info based on current page
 */
function getCurrentLesson() {
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop();

  const lesson = LESSONS.find(l => l.path === filename);
  return lesson || null;
}

/**
 * Get previous lesson
 */
function getPreviousLesson(currentLesson) {
  if (!currentLesson || currentLesson.number === 1) {
    return null;
  }
  return LESSONS[currentLesson.number - 2];
}

/**
 * Get next lesson
 */
function getNextLesson(currentLesson) {
  if (!currentLesson || currentLesson.number === TOTAL_LESSONS) {
    return null;
  }
  return LESSONS[currentLesson.number];
}

/**
 * Setup navigation buttons
 */
function setupNavigation() {
  const currentLesson = getCurrentLesson();
  if (!currentLesson) return;

  const prevLesson = getPreviousLesson(currentLesson);
  const nextLesson = getNextLesson(currentLesson);

  // Update progress indicator
  const progressElement = document.getElementById('lesson-progress');
  if (progressElement) {
    progressElement.textContent = `Lesson ${currentLesson.number} of ${TOTAL_LESSONS}`;
  }

  // Setup previous button
  const prevButton = document.getElementById('prev-lesson');
  if (prevButton) {
    if (prevLesson) {
      prevButton.href = prevLesson.path;
      prevButton.textContent = `← ${prevLesson.title}`;
      prevButton.removeAttribute('disabled');
    } else {
      prevButton.href = '../index.html';
      prevButton.textContent = '← Home';
    }
  }

  // Setup next button
  const nextButton = document.getElementById('next-lesson');
  if (nextButton) {
    if (nextLesson) {
      nextButton.href = nextLesson.path;
      nextButton.textContent = `${nextLesson.title} →`;
      nextButton.removeAttribute('disabled');
    } else {
      nextButton.textContent = 'Complete!';
      nextButton.setAttribute('disabled', 'disabled');
      nextButton.style.opacity = '0.5';
    }
  }

  // Track lesson progress in localStorage
  trackProgress(currentLesson);
}

/**
 * Track which lessons have been visited
 */
function trackProgress(lesson) {
  if (!lesson) return;

  const visited = getVisitedLessons();
  if (!visited.includes(lesson.id)) {
    visited.push(lesson.id);
    localStorage.setItem('p5-tutorial-progress', JSON.stringify(visited));
  }
}

/**
 * Get list of visited lessons from localStorage
 */
function getVisitedLessons() {
  const stored = localStorage.getItem('p5-tutorial-progress');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Check if a lesson has been visited
 */
function hasVisitedLesson(lessonId) {
  return getVisitedLessons().includes(lessonId);
}

/**
 * Get progress percentage
 */
function getProgressPercentage() {
  const visited = getVisitedLessons();
  return Math.round((visited.length / TOTAL_LESSONS) * 100);
}

/**
 * Reset progress
 */
function resetProgress() {
  localStorage.removeItem('p5-tutorial-progress');
}

/**
 * Keyboard navigation
 */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Arrow keys for navigation
    if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey) {
      const prevButton = document.getElementById('prev-lesson');
      if (prevButton && !prevButton.hasAttribute('disabled')) {
        window.location.href = prevButton.href;
      }
    } else if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey) {
      const nextButton = document.getElementById('next-lesson');
      if (nextButton && !nextButton.hasAttribute('disabled')) {
        window.location.href = nextButton.href;
      }
    }
  });
}

/**
 * Initialize navigation on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupKeyboardNavigation();
});

/**
 * Update home page with progress indicators
 */
function updateHomeProgress() {
  const visited = getVisitedLessons();
  const percentage = getProgressPercentage();

  // Update progress display on home page
  const progressDisplay = document.getElementById('progress-display');
  if (progressDisplay) {
    progressDisplay.textContent = `Progress: ${visited.length}/${TOTAL_LESSONS} lessons (${percentage}%)`;
  }

  // Mark visited lessons
  LESSONS.forEach(lesson => {
    const card = document.getElementById(`lesson-${lesson.id}`);
    if (card && hasVisitedLesson(lesson.id)) {
      card.classList.add('visited');
    }
  });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LESSONS,
    getCurrentLesson,
    getPreviousLesson,
    getNextLesson,
    setupNavigation,
    getProgressPercentage,
    hasVisitedLesson,
    updateHomeProgress
  };
}

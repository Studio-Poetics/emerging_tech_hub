/**
 * Live Code Editor with P5.js Integration
 * Provides real-time code editing and preview for P5.js sketches
 */

class LiveEditor {
  constructor(editorElementId, previewElementId, initialCode) {
    this.editorElement = document.getElementById(editorElementId);
    this.previewElement = document.getElementById(previewElementId);
    this.errorElement = document.getElementById('error-display');
    this.statusElement = document.getElementById('editor-status');

    this.initialCode = initialCode;
    this.currentSketch = null;
    this.debounceTimer = null;
    this.debounceDelay = 300; // ms

    this.initEditor();
    this.setupEventListeners();
    this.updatePreview(); // Initial preview
  }

  /**
   * Initialize CodeMirror editor
   */
  initEditor() {
    this.editor = CodeMirror(this.editorElement, {
      value: this.initialCode,
      mode: 'javascript',
      theme: 'default',
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      indentUnit: 2,
      indentWithTabs: false,
      autofocus: true,
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      extraKeys: {
        'Ctrl-Enter': () => this.updatePreview(),
        'Cmd-Enter': () => this.updatePreview(),
        'Tab': (cm) => {
          if (cm.somethingSelected()) {
            cm.indentSelection('add');
          } else {
            cm.replaceSelection('  ', 'end');
          }
        }
      }
    });

    // Set editor size based on screen width
    const setEditorHeight = () => {
      if (window.innerWidth >= 1200) {
        this.editor.setSize(null, 550);
      } else if (window.innerWidth <= 768) {
        this.editor.setSize(null, 350);
      } else {
        this.editor.setSize(null, 500);
      }
    };

    setEditorHeight();
    window.addEventListener('resize', setEditorHeight);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for code changes
    this.editor.on('change', () => {
      this.debouncedUpdate();
    });

    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetCode());
    }

    // Run button (optional manual trigger)
    const runBtn = document.getElementById('run-btn');
    if (runBtn) {
      runBtn.addEventListener('click', () => this.updatePreview());
    }
  }

  /**
   * Debounced update to prevent excessive re-rendering
   */
  debouncedUpdate() {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Show updating status
    this.setStatus('updating');

    // Set new timer
    this.debounceTimer = setTimeout(() => {
      this.updatePreview();
    }, this.debounceDelay);
  }

  /**
   * Update P5.js preview with current code
   */
  updatePreview() {
    const code = this.editor.getValue();

    // Clear any existing errors
    this.hideError();

    try {
      // Remove old sketch if exists
      if (this.currentSketch) {
        this.currentSketch.remove();
        this.currentSketch = null;
      }

      // Clear preview container
      this.previewElement.innerHTML = '';

      // Create new P5 sketch using instance mode
      this.currentSketch = new p5((p) => {
        // Wrap user code in try-catch for runtime errors
        try {
          // Execute user code in P5 instance context
          const wrappedCode = this.wrapUserCode(code);
          const sketchFunction = new Function('p', wrappedCode);
          sketchFunction(p);
        } catch (error) {
          this.handleRuntimeError(error);
        }
      }, this.previewElement);

      this.setStatus('ready');
    } catch (error) {
      this.handleSyntaxError(error);
      this.setStatus('error');
    }
  }

  /**
   * Wrap user code to work with P5 instance mode
   * Maps global P5 functions to instance methods
   */
  wrapUserCode(code) {
    // Functions that users will define - don't create variables for these
    const userDefinedFunctions = [
      'setup', 'draw', 'preload',
      'mousePressed', 'mouseReleased', 'mouseClicked', 'mouseMoved', 'mouseDragged', 'doubleClicked', 'mouseWheel',
      'keyPressed', 'keyReleased', 'keyTyped',
      'touchStarted', 'touchMoved', 'touchEnded',
      'windowResized'
    ];

    // P5.js methods and constants to make available
    const p5PropertiesAndMethods = [
      // Environment
      'print', 'frameRate', 'getTargetFrameRate',
      // Shape
      'createCanvas', 'resizeCanvas', 'noCanvas', 'createGraphics', 'blendMode',
      'arc', 'ellipse', 'circle', 'line', 'point', 'quad', 'rect', 'square', 'triangle',
      'ellipseMode', 'noSmooth', 'rectMode', 'smooth', 'strokeCap', 'strokeJoin', 'strokeWeight',
      'bezier', 'bezierDetail', 'bezierPoint', 'bezierTangent',
      'curve', 'curveDetail', 'curveTightness', 'curvePoint', 'curveTangent',
      'beginContour', 'beginShape', 'bezierVertex', 'curveVertex', 'endContour', 'endShape', 'quadraticVertex', 'vertex',
      // Color
      'background', 'clear', 'colorMode', 'fill', 'noFill', 'noStroke', 'stroke',
      'alpha', 'blue', 'brightness', 'color', 'green', 'hue', 'lerpColor', 'lightness', 'red', 'saturation',
      // Transform
      'applyMatrix', 'popMatrix', 'printMatrix', 'pushMatrix', 'resetMatrix', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'shearX', 'shearY', 'translate',
      'push', 'pop',
      // Math
      'abs', 'ceil', 'constrain', 'dist', 'exp', 'floor', 'lerp', 'log', 'mag', 'map', 'max', 'min', 'norm', 'pow', 'round', 'sq', 'sqrt',
      'fract', 'createVector',
      'noise', 'noiseDetail', 'noiseSeed',
      'randomSeed', 'random', 'randomGaussian',
      'acos', 'asin', 'atan', 'atan2', 'cos', 'sin', 'tan', 'degrees', 'radians', 'angleMode',
      'keyIsDown',
      // Constants
      'HALF_PI', 'PI', 'QUARTER_PI', 'TAU', 'TWO_PI',
      'BLEND', 'DARKEST', 'LIGHTEST', 'DIFFERENCE', 'MULTIPLY', 'EXCLUSION', 'SCREEN', 'REPLACE', 'OVERLAY', 'HARD_LIGHT', 'SOFT_LIGHT', 'DODGE', 'BURN', 'ADD', 'NORMAL',
      'ARROW', 'CROSS', 'HAND', 'MOVE', 'TEXT', 'WAIT',
      'CENTER', 'LEFT', 'RIGHT', 'TOP', 'BOTTOM', 'BASELINE', 'CORNER', 'CORNERS', 'RADIUS',
      // Typography
      'textAlign', 'textLeading', 'textSize', 'textStyle', 'textWidth', 'textAscent', 'textDescent', 'text', 'textFont',
      'loadFont',
      // Rendering
      'loop', 'noLoop', 'redraw',
      // Image
      'loadImage', 'image', 'tint', 'noTint', 'imageMode',
      // Time
      'millis', 'second', 'minute', 'hour', 'day', 'month', 'year'
    ];

    // Create variable declarations for methods and constants
    const declarations = p5PropertiesAndMethods
      .map(fn => {
        return `var ${fn} = (typeof p.${fn} === 'function') ? p.${fn}.bind(p) : p.${fn};`;
      })
      .join('\n');

    // Dynamic properties that change each frame - reference directly from p
    const dynamicVars = `
      var mouseX, mouseY, pmouseX, pmouseY, winMouseX, winMouseY, pwinMouseX, pwinMouseY;
      var mouseButton, mouseIsPressed;
      var key, keyCode, keyIsPressed;
      var touchX, touchY, touches;
      var frameCount;
      var width, height, displayWidth, displayHeight, windowWidth, windowHeight;
    `;

    // Function to update dynamic variables
    const updateDynamicVars = `
      function __updateDynamicVars() {
        mouseX = p.mouseX; mouseY = p.mouseY;
        pmouseX = p.pmouseX; pmouseY = p.pmouseY;
        winMouseX = p.winMouseX; winMouseY = p.winMouseY;
        pwinMouseX = p.pwinMouseX; pwinMouseY = p.pwinMouseY;
        mouseButton = p.mouseButton; mouseIsPressed = p.mouseIsPressed;
        key = p.key; keyCode = p.keyCode; keyIsPressed = p.keyIsPressed;
        touchX = p.touchX; touchY = p.touchY; touches = p.touches;
        frameCount = p.frameCount;
        width = p.width; height = p.height;
        displayWidth = p.displayWidth; displayHeight = p.displayHeight;
        windowWidth = p.windowWidth; windowHeight = p.windowHeight;
      }
    `;

    // Wrap code to execute and then assign user-defined functions to p instance
    return `
      ${declarations}
      ${dynamicVars}
      ${updateDynamicVars}

      // Execute user code
      ${code}

      // Wrap user's draw to update dynamic vars
      if (typeof draw !== 'undefined') {
        var __userDraw = draw;
        draw = function() {
          __updateDynamicVars();
          __userDraw();
        };
      }

      // Wrap user's setup to update dynamic vars
      if (typeof setup !== 'undefined') {
        var __userSetup = setup;
        setup = function() {
          __updateDynamicVars();
          __userSetup();
        };
      }

      // Assign user-defined functions to p instance
      ${userDefinedFunctions.map(fn => `
        if (typeof ${fn} !== 'undefined') {
          p.${fn} = ${fn};
        }
      `).join('')}
    `;
  }

  /**
   * Handle syntax errors (parsing errors)
   */
  handleSyntaxError(error) {
    const message = this.simplifyErrorMessage(error.message);
    this.showError('Syntax Error', message);
  }

  /**
   * Handle runtime errors (execution errors)
   */
  handleRuntimeError(error) {
    const message = this.simplifyErrorMessage(error.message);
    this.showError('Runtime Error', message);
  }

  /**
   * Simplify error messages for beginners
   */
  simplifyErrorMessage(message) {
    // Common error patterns and their simplified versions
    const patterns = [
      { pattern: /is not defined/, replacement: 'is not recognized. Did you spell it correctly?' },
      { pattern: /Unexpected token/, replacement: 'has a syntax problem. Check your parentheses and semicolons.' },
      { pattern: /Cannot read property/, replacement: 'tried to use something that doesn\'t exist.' },
      { pattern: /undefined is not a function/, replacement: 'is not a valid function name.' }
    ];

    let simplified = message;
    for (const { pattern, replacement } of patterns) {
      if (pattern.test(message)) {
        simplified = simplified.replace(pattern, replacement);
        break;
      }
    }

    return simplified;
  }

  /**
   * Show error message
   */
  showError(title, message) {
    if (this.errorElement) {
      this.errorElement.innerHTML = `
        <div class="error-title">${title}</div>
        <div class="error-message">${message}</div>
      `;
      this.errorElement.classList.add('visible');
    }
  }

  /**
   * Hide error message
   */
  hideError() {
    if (this.errorElement) {
      this.errorElement.classList.remove('visible');
    }
  }

  /**
   * Set editor status indicator
   */
  setStatus(status) {
    if (!this.statusElement) return;

    const indicator = this.statusElement.querySelector('.status-indicator');
    const text = this.statusElement.querySelector('.status-text');

    switch (status) {
      case 'ready':
        if (indicator) indicator.classList.remove('active');
        if (text) text.textContent = 'Ready';
        break;
      case 'updating':
        if (indicator) indicator.classList.add('active');
        if (text) text.textContent = 'Updating...';
        break;
      case 'error':
        if (indicator) indicator.classList.remove('active');
        if (text) text.textContent = 'Error';
        break;
    }
  }

  /**
   * Reset code to initial state
   */
  resetCode() {
    this.editor.setValue(this.initialCode);
    this.updatePreview();
  }

  /**
   * Get current code
   */
  getCode() {
    return this.editor.getValue();
  }

  /**
   * Set code programmatically
   */
  setCode(code) {
    this.editor.setValue(code);
    this.updatePreview();
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.currentSketch) {
      this.currentSketch.remove();
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}

// Utility function to initialize editor on page load
function initializeLiveEditor(editorId, previewId, initialCode) {
  return new LiveEditor(editorId, previewId, initialCode);
}

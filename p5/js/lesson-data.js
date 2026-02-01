/**
 * Lesson Data - Starter Code and Examples
 * Contains the initial code for each lesson's interactive editor
 */

const LESSON_DATA = {
  // Lesson 1: The Canvas
  canvas: {
    title: 'The Canvas',
    number: 1,
    path: '01-canvas.html',
    starterCode: `function setup() {
  // Create a digital canvas
  // 400 pixels wide, 400 pixels tall
  createCanvas(400, 400);
}

function draw() {
  // Set background color
  // Using grayscale: 0 (black) to 255 (white)
  background(220);
}`,
    variations: [
      {
        title: 'Different Canvas Size',
        code: `function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(240);
}`
      },
      {
        title: 'Black Background',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
}`
      }
    ]
  },

  // Lesson 2: Shapes
  shapes: {
    title: 'Shapes',
    number: 2,
    path: '02-shapes.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Draw a circle
  // x, y, diameter
  circle(200, 150, 80);

  // Draw a rectangle
  // x, y, width, height
  rect(150, 250, 100, 60);
}`,
    variations: [
      {
        title: 'Geometric Composition',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Filled black circle
  fill(0);
  noStroke();
  circle(200, 200, 150);

  // White square on top
  fill(255);
  rect(125, 125, 150, 150);

  // Black triangle
  fill(0);
  triangle(200, 100, 150, 200, 250, 200);
}`
      },
      {
        title: 'Stroke and Fill',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(240);

  // Change stroke weight
  strokeWeight(3);

  // Filled shape
  fill(0);
  circle(150, 150, 100);

  // Outlined only
  noFill();
  stroke(0);
  rect(220, 100, 100, 100);
}`
      }
    ]
  },

  // Lesson 3: Drawing with Numbers
  numbers: {
    title: 'Drawing with Numbers',
    number: 3,
    path: '03-numbers.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Store a value in a variable
  let circleSize = 80;
  let x = 200;
  let y = 200;

  fill(0);
  circle(x, y, circleSize);
}`,
    variations: [
      {
        title: 'Using Math',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Calculate positions
  let centerX = width / 2;
  let centerY = height / 2;
  let spacing = 60;

  fill(0);
  circle(centerX - spacing, centerY, 40);
  circle(centerX, centerY, 40);
  circle(centerX + spacing, centerY, 40);
}`
      },
      {
        title: 'Relationships',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  let baseSize = 50;

  fill(0);
  circle(100, 200, baseSize);
  circle(200, 200, baseSize * 1.5);
  circle(300, 200, baseSize * 2);
}`
      }
    ]
  },

  // Lesson 4: Loops
  loops: {
    title: 'Loops',
    number: 4,
    path: '04-loops.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Draw a row of circles
  for (let x = 50; x <= 350; x += 50) {
    fill(0);
    circle(x, 200, 40);
  }
}`,
    variations: [
      {
        title: 'Grid Pattern',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Nested loops create a grid
  for (let x = 50; x <= 350; x += 50) {
    for (let y = 50; y <= 350; y += 50) {
      fill(0);
      circle(x, y, 30);
    }
  }
}`
      },
      {
        title: 'Progressive Size',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  let size = 10;

  for (let x = 50; x <= 350; x += 50) {
    fill(0);
    circle(x, 200, size);
    size += 10; // Increase size each time
  }
}`
      },
      {
        title: 'Pattern with Counter',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  for (let i = 0; i < 8; i++) {
    let y = 50 + i * 45;
    let numCircles = i + 1;

    for (let j = 0; j < numCircles; j++) {
      let x = 50 + j * 40;
      fill(0);
      circle(x, y, 25);
    }
  }
}`
      }
    ]
  },

  // Lesson 5: Conditional Statements
  conditionals: {
    title: 'Conditional Statements',
    number: 5,
    path: '05-conditionals.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Check if mouse is on left or right side
  if (mouseX < 200) {
    // Left side - draw square
    fill(0);
    rect(150, 150, 100, 100);
  } else {
    // Right side - draw circle
    fill(0);
    circle(200, 200, 100);
  }
}`,
    variations: [
      {
        title: 'Multiple Conditions',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Divide canvas into quadrants
  if (mouseX < 200 && mouseY < 200) {
    fill(0);
    text('Top Left', 20, 30);
  } else if (mouseX >= 200 && mouseY < 200) {
    fill(0);
    text('Top Right', 220, 30);
  } else if (mouseX < 200 && mouseY >= 200) {
    fill(0);
    text('Bottom Left', 20, 380);
  } else {
    fill(0);
    text('Bottom Right', 220, 380);
  }

  // Draw crosshairs
  stroke(200);
  line(200, 0, 200, 400);
  line(0, 200, 400, 200);
}`
      },
      {
        title: 'Responsive Size',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  let size = 50;

  // Make circle bigger if mouse is near
  let distance = dist(mouseX, mouseY, 200, 200);

  if (distance < 100) {
    size = 100;
  }

  fill(0);
  circle(200, 200, size);
}`
      }
    ]
  },

  // Lesson 6: Motion
  motion: {
    title: 'Motion',
    number: 6,
    path: '06-motion.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // sin() creates smooth wave motion
  // It oscillates between -1 and 1
  let x = 200 + sin(frameCount * 0.05) * 150;

  fill(0);
  circle(x, 200, 40);
}`,
    variations: [
      {
        title: 'Advanced: Understanding Sin & Cos Visually',
        code: `function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);

  let centerX = 200;
  let centerY = 200;
  let radius = 100;

  // Angle increases over time
  let angle = frameCount * 0.03;

  // Calculate point on circle
  let pointX = centerX + cos(angle) * radius;
  let pointY = centerY + sin(angle) * radius;

  // Draw circle
  noFill();
  stroke(200);
  strokeWeight(1);
  circle(centerX, centerY, radius * 2);

  // Draw axes
  stroke(220);
  line(centerX - 130, centerY, centerX + 130, centerY);
  line(centerX, centerY - 130, centerX, centerY + 130);

  // Draw radius line to point
  stroke(0);
  strokeWeight(2);
  line(centerX, centerY, pointX, pointY);

  // COS - horizontal distance (x component)
  stroke(0, 0, 255);
  strokeWeight(3);
  line(centerX, centerY, pointX, centerY);

  // SIN - vertical distance (y component)
  stroke(255, 0, 0);
  strokeWeight(3);
  line(pointX, centerY, pointX, pointY);

  // TAN - slope/tangent line
  // tan = sin/cos, shown as vertical line at edge of circle
  if (abs(cos(angle)) > 0.01) {
    let tanValue = tan(angle);
    let tanY = centerY - tanValue * radius;
    stroke(0, 150, 0);
    strokeWeight(3);
    line(centerX + radius, centerY, centerX + radius, tanY);

    // Limit display for readability
    if (abs(tanValue) < 5) {
      fill(0, 150, 0);
      noStroke();
      textSize(12);
      text('tan = ' + tanValue.toFixed(2),
           centerX + radius + 10,
           centerY - tanValue * radius / 2);
    }
  }

  // Point on circle
  fill(0);
  noStroke();
  circle(pointX, pointY, 10);

  // Value labels
  fill(0, 0, 255);
  textSize(13);
  text('cos = ' + cos(angle).toFixed(2), 10, 25);

  fill(255, 0, 0);
  text('sin = ' + sin(angle).toFixed(2), 10, 45);

  fill(0, 150, 0);
  text('tan = ' + tan(angle).toFixed(2), 10, 65);

  // Explanations
  fill(0);
  textSize(11);
  text('BLUE = cos (horizontal)', 380, 25);
  text('RED = sin (vertical)', 380, 45);
  text('GREEN = tan (slope)', 380, 65);
}`
      },
      {
        title: 'Circular Motion - sin & cos',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Circular motion uses BOTH sin and cos
  let angle = frameCount * 0.05;
  let radius = 120;

  // cos() controls x (horizontal)
  let x = 200 + cos(angle) * radius;
  // sin() controls y (vertical)
  let y = 200 + sin(angle) * radius;

  fill(0);
  circle(x, y, 30);
}`
      },
      {
        title: 'Wave Pattern',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Draw multiple circles in a wave
  for (let x = 0; x < 400; x += 20) {
    // sin() creates vertical wave
    // x affects the wave pattern
    let y = 200 + sin(x * 0.05 + frameCount * 0.1) * 80;

    fill(0);
    circle(x, y, 15);
  }
}`
      },
      {
        title: 'Dual Oscillation',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Both x AND y oscillate
  // Different speeds create interesting paths
  let x = 200 + sin(frameCount * 0.05) * 120;
  let y = 200 + cos(frameCount * 0.03) * 120;

  fill(0);
  circle(x, y, 40);

  // Leave a trail
  fill(0, 20);
  circle(x, y, 50);
}`
      },
      {
        title: 'Growing Spiral',
        code: `function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  // Don't clear - create trail

  let angle = frameCount * 0.1;
  // Radius grows over time
  let radius = frameCount * 0.5;

  let x = 200 + cos(angle) * radius;
  let y = 200 + sin(angle) * radius;

  fill(0);
  circle(x, y, 5);
}`
      },
      {
        title: 'Pendulum Motion',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Pendulum swings back and forth
  let angle = sin(frameCount * 0.05) * PI / 4;
  let length = 150;

  // Convert angle to position
  let x = 200 + sin(angle) * length;
  let y = 50 + cos(angle) * length;

  // Draw arm
  stroke(0);
  strokeWeight(2);
  line(200, 50, x, y);

  // Draw bob
  fill(0);
  noStroke();
  circle(x, y, 30);
}`
      },
      {
        title: 'Breathing Effect',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // sin() creates pulsing/breathing
  // Use it for size changes
  let breathe = sin(frameCount * 0.05);
  // Map from -1,1 to 50,150
  let size = map(breathe, -1, 1, 50, 150);

  fill(0);
  circle(200, 200, size);
}`
      }
    ]
  },

  // Lesson 7: Interaction
  interaction: {
    title: 'Interaction',
    number: 7,
    path: '07-interaction.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // Circle follows the mouse
  fill(0);
  circle(mouseX, mouseY, 50);
}`,
    variations: [
      {
        title: 'Drawing Tool',
        code: `function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  // Only draw when mouse is pressed
  if (mouseIsPressed) {
    fill(0);
    noStroke();
    circle(mouseX, mouseY, 20);
  }
}

// Clear canvas on double-click
function doubleClicked() {
  background(255);
}`
      },
      {
        title: 'Interactive Size',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Size changes with mouse X position
  let size = map(mouseX, 0, 400, 20, 200);

  fill(0);
  circle(200, 200, size);
}`
      },
      {
        title: 'Click to Create',
        code: `let circles = [];

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  // Don't clear background - keep all circles

  // Draw all circles
  fill(0);
  noStroke();
  for (let c of circles) {
    circle(c.x, c.y, c.size);
  }
}

function mousePressed() {
  // Add a circle at mouse position
  circles.push({
    x: mouseX,
    y: mouseY,
    size: random(20, 60)
  });
}`
      }
    ]
  },

  // Lesson 8: Typography
  typography: {
    title: 'Typography',
    number: 8,
    path: '08-typography.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Set text properties
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);

  // Draw text
  text('HELLO', 200, 200);
}`,
    variations: [
      {
        title: 'Text Positioning',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  fill(0);
  textSize(24);

  // Different alignments
  textAlign(LEFT);
  text('Left', 20, 100);

  textAlign(CENTER);
  text('Center', 200, 200);

  textAlign(RIGHT);
  text('Right', 380, 300);
}`
      },
      {
        title: 'Dynamic Text',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Text follows mouse
  fill(0);
  textSize(48);
  textAlign(CENTER, CENTER);

  text('O', mouseX, mouseY);
}`
      },
      {
        title: 'Text as Form',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // Create pattern with letters
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);

  for (let x = 50; x <= 350; x += 100) {
    for (let y = 50; y <= 350; y += 100) {
      text('A', x, y);
    }
  }
}`
      },
      {
        title: 'Text Size Variation',
        code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Size changes with mouse position
  let size = map(mouseX, 0, 400, 12, 120);

  fill(0);
  textSize(size);
  textAlign(CENTER, CENTER);

  text('TYPE', 200, 200);
}`
      }
    ]
  },

  // Lesson 9: Variation
  variation: {
    title: 'Variation',
    number: 9,
    path: '09-variation.html',
    starterCode: `function setup() {
  createCanvas(400, 400);
  background(255);
  noLoop();
}

function draw() {
  // Create a grid of random circles
  for (let x = 50; x < 400; x += 50) {
    for (let y = 50; y < 400; y += 50) {
      let size = random(10, 40);
      fill(0);
      circle(x, y, size);
    }
  }
}

// Click to regenerate
function mousePressed() {
  redraw();
}`,
    variations: [
      {
        title: 'Organic Noise Pattern',
        code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  // noise() creates smooth random values
  for (let x = 0; x < 400; x += 10) {
    for (let y = 0; y < 400; y += 10) {
      let n = noise(x * 0.01, y * 0.01);
      let size = n * 15;

      fill(0);
      circle(x, y, size);
    }
  }
}

function mousePressed() {
  redraw();
}`
      },
      {
        title: 'Systematic Variation',
        code: `function setup() {
  createCanvas(400, 400);
  background(255);
  noLoop();
}

function draw() {
  let spacing = 40;

  for (let x = spacing; x < 400; x += spacing) {
    for (let y = spacing; y < 400; y += spacing) {

      // Probability-based variation
      if (random() > 0.5) {
        // Draw circle
        fill(0);
        circle(x, y, 25);
      } else {
        // Draw square
        fill(0);
        rectMode(CENTER);
        rect(x, y, 25, 25);
      }
    }
  }
}

function mousePressed() {
  redraw();
}`
      },
      {
        title: 'Generative Lines',
        code: `function setup() {
  createCanvas(400, 400);
  background(255);
  noLoop();
}

function draw() {
  stroke(0);
  strokeWeight(2);
  noFill();

  // Draw flowing lines using noise
  for (let i = 0; i < 20; i++) {
    let y = i * 20 + 20;

    beginShape();
    for (let x = 0; x < 400; x += 5) {
      let offset = noise(x * 0.01, i * 0.5) * 100 - 50;
      vertex(x, y + offset);
    }
    endShape();
  }
}

function mousePressed() {
  background(255);
  redraw();
}`
      }
    ]
  }
};

// Helper function to get lesson data by ID
function getLessonData(lessonId) {
  return LESSON_DATA[lessonId] || null;
}

// Helper function to get starter code by lesson ID
function getStarterCode(lessonId) {
  const lesson = LESSON_DATA[lessonId];
  return lesson ? lesson.starterCode : '';
}

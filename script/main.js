// Pie Chart - Home Page
const ctx = document.getElementById('skillsChart').getContext('2d');

// Custom plugin to draw lines and labels outside
const connectorLinePlugin = {
  id: 'connectorLinePlugin',
  afterDraw(chart) {
    const { ctx, chartArea: { left, top, width, height } } = chart;
    const meta = chart.getDatasetMeta(0);
    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    const radius = chart._metasets[0].data[0].outerRadius;
    const centerX = chart.getDatasetMeta(0).data[0].x;
    const centerY = chart.getDatasetMeta(0).data[0].y;


    meta.data.forEach((slice, i) => {
      const angle = (slice.startAngle + slice.endAngle) / 2;
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + 30);
      const y2 = centerY + Math.sin(angle) * (radius + 30);
      const textX = centerX + Math.cos(angle) * (radius + 40);
      const textY = centerY + Math.sin(angle) * (radius + 40);

      const textAlign = x2 > centerX ? 'left' : 'right';

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#a26555';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#a26555';
      ctx.font = 'bold 18px "Segoe UI", sans-serif';
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'middle';
      const label = chart.data.labels[i];
      const words = label.split(' '); // split into multiple lines if there's a space
      words.forEach((word, index) => {
        ctx.fillText(word, textX, textY + (index * 16)); // 16px between lines
      });

    });
  }
};

// Create the pie chart
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Machine Learning', 'Data Analysis', 'Algorithms'],
    datasets: [{
      data: [33, 33, 34],
      backgroundColor: ['#f7cfc4', '#d6a692', '#a26555'],
      borderColor: '#fff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: false,
    layout: {
      padding: {
        top: 0,
        bottom: 10,
        left: 50,
        right: 40,
      }
    },
    cutout: '40%', // full pie (set to 40% for donut)
    radius: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed}%`
        }
      }
    }
  },
  plugins: [connectorLinePlugin]
});

// Carousel - HomePage
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let intervalId;

// Update slide position and active dot
function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function startCarousel() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }, 5000); // Change slide every 5 seconds
}

// Stop the carousel
function stopCarousel() {
  clearInterval(intervalId);
}


// Navigation functions
function goToSlide(index) {
  currentIndex = index;
  updateSlidePosition();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
}

// Initial setup
updateSlidePosition();
startCarousel();

// Stop transition when mouse hover
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

// Click on dots to navigate
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopCarousel();
    goToSlide(parseInt(dot.dataset.index));
  });
});

// Move to next or previous slide with arrows
prevBtn.addEventListener('click', () => {
  stopCarousel();
  prevSlide();
});

nextBtn.addEventListener('click', () => {
  stopCarousel();
  nextSlide();
});

// Contact Form - Contact Page
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const status = document.getElementById('formStatus');

  fetch('https://formspree.io/f/meokjbyy', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.textContent = "Message sent successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "Oops! Something went wrong.";
      status.style.color = "red";
    }
  }).catch(error => {
    status.textContent = "Error: " + error.message;
    status.style.color = "red";
  });
});

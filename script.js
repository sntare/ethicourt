let currentIndex = 0;
const votes = {
  for: 0,
  neutral: 0,
  against: 0,
  total: 0
};

function navigate(direction) {
  const questions = document.getElementsByClassName('question');
  currentIndex += direction;
  
  if (currentIndex < 0) {
    currentIndex = questions.length - 1;
  } else if (currentIndex >= questions.length) {
    currentIndex = 0;
  }
  
  updateSlider();
}

function updateSlider() {
  const questions = document.getElementsByClassName('ethical-questions')[0];
  const newTransformValue = 'translateX(' + (-currentIndex * 100) + '%)';
  questions.style.transform = newTransformValue;
}

function vote(opinion) {
  votes[opinion] += 1;
  votes.total += 1;
  updatePercentages();
}

function updatePercentages() {
  const forPercentage = document.getElementById('forPercentage');
  const neutralPercentage = document.getElementById('neutralPercentage');
  const againstPercentage = document.getElementById('againstPercentage');
  
  forPercentage.innerText = calculatePercentage(votes.for, votes.total) + '%';
  neutralPercentage.innerText = calculatePercentage(votes.neutral, votes.total) + '%';
  againstPercentage.innerText = calculatePercentage(votes.against, votes.total) + '%';
}

function calculatePercentage(part, total) {
  if (total === 0) return '0';
  return ((part / total) * 100).toFixed(1);
}

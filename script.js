let currentIndex = 0;
let questions = []; // Array to store questions
let votes = []; // Array to store votes for each question

function navigate(direction) {
    const questionsElements = document.getElementsByClassName('question');
    currentIndex += direction;
    console.log(direction)
    if (currentIndex < 0) {
        currentIndex = questionsElements.length - 1;
    } else if (currentIndex >= questionsElements.length) {
        currentIndex = 0;
    }

    updateSlider();
    updatePercentages(currentIndex); // Update percentages to match the current question immediately upon navigation
}

function updateSlider() {
    const questionsContainer = document.getElementsByClassName('ethical-questions')[0];
    const newTransformValue = 'translateX(' + (-currentIndex * 100) + '%)';
    questionsContainer.style.transform = newTransformValue;
}

function postQuestion() {
    const questionText = document.getElementById('questionInput').value;
    if (questionText.trim()) {
        questions.push(questionText);
        votes.push({ for: 0, neutral: 0, against: 0, total: 0 });

        const questionsContainer = document.getElementById('ethicalQuestions');
        const newQuestionDiv = document.createElement('div');
        newQuestionDiv.classList.add('question');
        newQuestionDiv.textContent = questionText;
        questionsContainer.appendChild(newQuestionDiv);

        document.getElementById('questionInput').value = '';
    }
}

function vote(opinion) {
    if (!votes[currentIndex]) {
        votes[currentIndex] = { for: 0, neutral: 0, against: 0, total: 0 };
    }

    votes[currentIndex][opinion] += 1;
    votes[currentIndex].total += 1;

    updatePercentages(currentIndex);
}

function updatePercentages(questionIndex) {
    const forPercentage = document.getElementById('forPercentage');
    const neutralPercentage = document.getElementById('neutralPercentage');
    const againstPercentage = document.getElementById('againstPercentage');

    forPercentage.innerText = calculatePercentage(votes[questionIndex].for, votes[questionIndex].total) + '%';
    neutralPercentage.innerText = calculatePercentage(votes[questionIndex].neutral, votes[questionIndex].total) + '%';
    againstPercentage.innerText = calculatePercentage(votes[questionIndex].against, votes[questionIndex].total) + '%';
}

function calculatePercentage(part, total) {
    if (total === 0) return '0';
    return ((part / total) * 100).toFixed(1);
}

async function sendPromptToServer(prompt) {
    const response = await fetch('http://127.0.0.1:5000/get-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();
    return data.response;
}

document.getElementById('submitPrompt').addEventListener('click', function() {
    var prompt = document.getElementById('chatgptPrompt').value;
    sendPromptToServer(prompt)
        .then(response => {
            document.getElementById('chatgptResponse').innerText = response;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Add other script functionalities as needed

const form = document.getElementById('support-form');
const successMsg = document.getElementById('success-message');
const ticketSpan = document.getElementById('ticket-number');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const ticket = 'TCKT-' + Math.floor(10000 + Math.random() * 90000);
    ticketSpan.textContent = ticket;

    form.style.display = 'none';
    successMsg.style.display = 'block';
});

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const answer = this.nextElementSibling;

        document.querySelectorAll('.faq-answer').forEach(function(a) {
            if (a !== answer) a.style.display = 'none';
        });

        answer.style.display =
            answer.style.display === 'block' ? 'none' : 'block';
    });
});
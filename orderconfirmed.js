       // Simulate order progression (for demo)
        const stages = [
            { message: 'Your order has been confirmed.', time: 29 },
            { message: 'Your food is being prepared.', time: 20 },
            { message: 'Your order is out for delivery. Rider is 10 minutes away.', time: 10 },
            { message: 'Your order has been delivered.', time: 0 }
        ];

        let currentStage = 0;
        let remainingSeconds = 29 * 60; // Start at 29 minutes

        const statusMessageEl = document.getElementById('status-message');
        const countdownEl = document.getElementById('countdown');
        const estimatedTimeEl = document.getElementById('estimated-time');

        function updateStage() {
            // Update active step
            document.querySelectorAll('.progress-step').forEach((step, index) => {
                step.classList.toggle('active', index <= currentStage);
            });

            // Update message
            statusMessageEl.textContent = stages[currentStage].message;

            // Update estimated time
            estimatedTimeEl.textContent = `${stages[currentStage].time} minutes`;
        }

        function updateCountdown() {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            countdownEl.textContent = `Arriving in ${minutes}:${seconds.toString().padStart(2, '0')}`;

            if (remainingSeconds > 0) {
                remainingSeconds--;
            } else {
                clearInterval(countdownInterval);
            }

            // Simulate stage change every 300 seconds (5 min) for demo; adjust for faster testing
            if (remainingSeconds === stages[currentStage + 1]?.time * 60) {
                currentStage++;
                updateStage();
                if (currentStage === stages.length - 1) {
                    clearInterval(countdownInterval);
                }
            }
        }

        // Initial update
        updateStage();

        // Countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);

        // Simulate stage progression faster for demo (every 10 seconds advance stage)
        const stageInterval = setInterval(() => {
            if (currentStage < stages.length - 1) {
                currentStage++;
                remainingSeconds = stages[currentStage].time * 60;
                updateStage();
            } else {
                clearInterval(stageInterval);
            }
        }, 10000); // 10s per stage for demo
class CountDown {
        constructor(expirationTime, onRender, onComplete) {
            this.setExpirationTime(expirationTime);

            this.onRender = onRender;
            this.onComplete = onComplete;
        }

        setExpirationTime(expirationTime) {
            // get the current time
            const currentTime = new Date().getTime();
            // calculate the remaining time 
            this.timeRemaining = expirationTime - currentTime;

            this.timeRemaining <= 0 ?
                this.complete() :
                this.start();
        }

        complete() {
            if (typeof this.onComplete === 'function') {
                onComplete();
            }
        }

        getTime() {
            return {
                days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
                hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
                minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
                seconds: Math.floor(this.timeRemaining / 1000) % 60
            };
        }

        update() {
            if (typeof this.onRender === 'function') {
                this.onRender(this.getTime());
            }
        }

        start() {
            // update the countdown
            this.update();

            //  setup a timer
            const intervalId = setInterval(() => {
                // update the timer  
                this.timeRemaining -= 1000;

                if (this.timeRemaining < 0) {
                    // call the callback
                    complete();

                    // clear the interval if expired
                    clearInterval(intervalId);
                } else {
                    this.update();
                }
            }, 1000);
        }
    }

    // Get the expiration 
    const getExpirationTime = () => {
      const expiration = document.querySelector('.timer-expiration').innerHTML;
        return Date.parse(expiration);
    };

    // select elements
    const app = document.querySelector('.countdown-row');
    const message = document.querySelector('.message');
    const heading = document.querySelector('h1');

    const format = (t) => {
        return t < 10 ? '0' + t : t;
    };

    const render = (time) => {
        app.innerHTML = `
            <span class="countdown-section">
              <span class="countdown-amount" style="color: rgb(0, 0, 0);">${format(time.days)}</span>
              <span class="countdown-period" style="color: var(--pale-blue);">Days</span>
            </span>
            <span class="countdown-section">
              <span class="countdown-amount" style="color: rgb(0, 0, 0);">${format(time.hours)}</span>
              <span class="countdown-period" style="color: var(--pale-blue);">Hours</span>
            </span>
            <span class="countdown-section">
              <span class="countdown-amount" style="color: rgb(0, 0, 0);">${format(time.minutes)}</span>
              <span class="countdown-period" style="color: var(--pale-blue);">Minutes</span>
            </span>
            <span class="countdown-section">
              <span class="countdown-amount" style="color: rgb(0, 0, 0);">${format(time.seconds)}</span>
              <span class="countdown-period" style="color: var(--pale-blue);">Seconds</span>
            </span>
            `;
    };

    const showMessage = () => {
        message.innerHTML = `Happy New Year!`;
        app.innerHTML = '';
        heading.style.display = 'none';
    };

    const hideMessage = () => {
        message.innerHTML = '';
        heading.style.display = 'block';
    };

    const complete = () => {
        showMessage();
    };

    const countdownTimer = new CountDown(
        getExpirationTime(),
        render,
        complete
    );
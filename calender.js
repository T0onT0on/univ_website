document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('year-month');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    const events = [
        { startDate: '2024-7-1', endDate: '2024-7-16', title: 'シグウィンガチャ', color: 'event-blue' },
        
        { startDate: '2024-7-5', endDate: '2024-7-8', title: '激獣神祭', color: 'event-orange' },

        { startDate: '2024-7-22', endDate: '2024-7-31', title: '長離ガチャ', color: 'event-green' },
        { startDate: '2024-8-1', endDate: '2024-8-14', title: '長離ガチャ', color: 'event-green' },
        

    ];

    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();
        calendarBody.innerHTML = '';
        monthYear.textContent = `${year}年${month + 1}月`;
        const monthlyEvents = events.filter(event => {
            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);
            return (eventStartDate.getFullYear() === year && eventStartDate.getMonth() === month) || (eventEndDate.getFullYear() === year && eventEndDate.getMonth() === month);
        });
        
        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
        
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                cell.classList.add('calendar-day');
                cell.style.position = 'relative';
        
                if (i === 0 && j < firstDay) {
                    cell.appendChild(document.createTextNode(''));
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.appendChild(document.createTextNode(date));
                    cell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    monthlyEvents.forEach((event, k) => {
                        const eventStartDate = new Date(event.startDate);
                        const eventEndDate = new Date(event.endDate);
                        if ((eventStartDate.getFullYear() === year && eventStartDate.getMonth() === month && eventStartDate.getDate() <= date) &&
                            (eventEndDate.getFullYear() === year && eventEndDate.getMonth() === month && eventEndDate.getDate() >= date)) {
                            const eventSpan = document.createElement('span');
                            eventSpan.classList.add('event', event.color);
                            const eventIndex = monthlyEvents.filter(e => {
                                const eStartDate = new Date(e.startDate);
                                const eEndDate = new Date(e.endDate);
                                return (eStartDate <= eventStartDate && eEndDate >= eventStartDate) || (eStartDate <= eventEndDate && eEndDate >= eventEndDate);
                            }).indexOf(event);
                            eventSpan.style.top = `${40 + (eventIndex * 30)}px`;

                            if (eventStartDate.getDate() === date) {
                                eventSpan.textContent = event.title;
                                const colspan = Math.min((eventEndDate.getDate() - eventStartDate.getDate()) + 1, 7 - j);
                                eventSpan.style.width = `calc(${colspan * 100}% - 5px)`;
                                eventSpan.style.left = '0';
                            } else {
                                eventSpan.style.width = 'calc(100% - 5px)';
                                eventSpan.style.left = '0';
                            }
                            cell.appendChild(eventSpan);
                        }
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
        updateButtonVisibility()
    }

    function updateButtonVisibility() {
        const today = new Date();
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth()){
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }
    }

    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });

    generateCalendar(currentYear, currentMonth);
    updateButtonVisibility();
});
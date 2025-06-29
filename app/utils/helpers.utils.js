const generateRandomPassword = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

const getPricePerDay = async(date, lodge, seasons) => {
        try {
            const year = date.getFullYear();
            if(seasons.length === 0) throw new Error("Primero debes establecer las temporadas..");
            const highSeasonStart = new Date(year, seasons[0].highSeasonStart.month - 1, seasons[0].highSeasonStart.day);
            const highSeasonEnd = new Date(year, seasons[0].highSeasonEnd.month - 1, seasons[0].highSeasonEnd.day);
            const midSeasonStart = new Date(year, seasons[0].midSeasonStart.month - 1, seasons[0].midSeasonStart.day);
            const midSeasonEnd = new Date(year + 1, seasons[0].midSeasonEnd.month - 1, seasons[0].midSeasonEnd.day);
            if (date >= highSeasonStart && date < highSeasonEnd) return lodge.season.high;
            if (date >= midSeasonStart && date < midSeasonEnd) return lodge.season.medium;
            return lodge.season.low;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const calculateTotalPrice = async(arrive, leave, lodge, seasons) => {
        try {
            let totalPrice = 0;
            let currentDate = new Date(arrive);
            const endDate = new Date(leave);
            while (currentDate < endDate) {
                totalPrice += await getPricePerDay(currentDate, lodge, seasons);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return totalPrice;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const confirmReservationDate = async (modifiedData, lodgeId, reservations) => {
        try {
            if(reservations.length === 0) return false;
            const existingReservations = reservations.filter(reservation => String(reservation.lodge._id) === lodgeId);
            const conflict = existingReservations.some(reservation => {
                const reservationStart = new Date(reservation.arrive);
                const reservationEnd = new Date(reservation.leave);
                return (
                    (modifiedData.arrive >= reservationStart && modifiedData.arrive < reservationEnd) ||
                    (modifiedData.leave > reservationStart && modifiedData.leave <= reservationEnd) ||
                    (modifiedData.arrive <= reservationStart && modifiedData.leave >= reservationEnd)
                );
            });
            return conflict;
        } catch (error) {
            throw new Error(error.message);
        }
    };

export { generateRandomPassword, getPricePerDay, calculateTotalPrice, confirmReservationDate };
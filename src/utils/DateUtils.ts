export function getFormattedDate() { 
    return new Date().toLocaleDateString(); 
}

/**
 * 
 * @param date 
 * @param month 
 * @param year 
 * @param time - string input (e.g., "9:30AM" or "11:05PM")
 * @returns ISO 8601 string (e.g., "2026-06-15T09:30:00.000Z")
 */
export function formatEventDateTime(
    date: number,
    month: number,
    year: number,
    time: string
):string{

    // isolate time from AM or PM
    const cleanTime = time.replace(/\s+/g, '').toUpperCase();
    const isPM = cleanTime.includes('PM');  
    const isAM = cleanTime.includes('AM');

    if(!isAM && !isPM){
        throw new Error(`Invalid time format for ${time}. Must end with AM or PM`);
    }

    // get the numbers from time string
    const timeNumbers = cleanTime.replace(/AM|PM/, '');
    const[timeHrsStr, timeMinsStr] = timeNumbers.split(':');

    let hours = parseInt(timeHrsStr, 10);
    let minutes = parseInt(timeMinsStr, 10);

    // 2. Convert 12-hour clock mechanics to 24-hour clock values
    if(isPM && hours!==12) hours+=12;
    if(isAM && hours ===12) hours=0;

    const strYear = String(year);
    const strMOnth = String(month).padStart(2, '0');
    const strDay = String(date).padStart(2, '0');
    const strHours = String(hours).padStart(2, '0');
    const strMins = String(minutes).padStart(2, '0');
    
    return `${strYear}-${strMOnth}-${strDay}T${strHours}:${strMins}:00.000Z`;
}
  
//   const test1 = formatEventDateTime(5, 6, 2026, "9:30AM");
//   console.log("Morning Test Result: ", test1); 
 

//   const test2 = formatEventDateTime(15, 6, 2026, "11:05PM");
//   console.log("Night Test Result:   ", test2); 
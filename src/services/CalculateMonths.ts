export const calculateMonths  = (startingDate: Date, finalDate: Date) => {
    const differenceBetweenYears = finalDate.getFullYear() - startingDate.getFullYear();
    const differenceBetweenMonths = differenceBetweenYears * 12 + (finalDate.getMonth() - startingDate.getMonth());
    return differenceBetweenMonths;
}
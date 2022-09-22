const checkValidNonNegativeInteger = (num) => {
    const convNum = Number(num);
    return (
        num !== undefined &&
        !isNaN(convNum) &&
        Number.isInteger(convNum) &&
        convNum >= 0
    );
};
export { checkValidNonNegativeInteger };

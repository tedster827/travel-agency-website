const doStringOperationOnStringDollarAmount = (stringToOperateOn: string, operation: string, operand: number): string => {
    const stringAsNumber = parseFloat(stringToOperateOn);

    // FIXME: Potential issue with returning an invalid result equaling -1 because it wasn't caught
    let result = -1;

    if (operation === "-") {
        result = stringAsNumber - operand
    } else if (operation === "+") {
        result = stringAsNumber + operand
    }

    return result.toFixed(2)
}

export default doStringOperationOnStringDollarAmount;
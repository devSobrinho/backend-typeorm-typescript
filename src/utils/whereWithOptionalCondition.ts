export function whereWithOptionalCondition(paramsObj: any) {
    return Object.fromEntries(
        Object.entries(paramsObj).filter(
            element => element[1] !== null && typeof element[1] !== 'undefined'
        )
    );
}

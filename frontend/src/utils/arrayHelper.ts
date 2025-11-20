export function removeById<T extends { id?: number | string }>(
    list: T[],
    id: number | string
): T[] {
    return list.filter(item => item.id !== id);
}

export function updateById<T extends { id?: number | string }>(
    list: T[],
    updated: T
): T[] {
    return list.map(item => (item.id === updated.id ? updated : item));
}

export function append<T>(list: T[], item: T): T[] {
    return [...list, item];
}

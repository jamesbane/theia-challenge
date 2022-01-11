import {LIST_LIMIT_LENGTH} from './constants';
import {CategoryProps, OffsetProps, ProjectProps} from "./utils.params";

export function getOffsetData(data: OffsetProps) {
    const isEnd = data.isEnd;
    const offsetNext = data.offset === null ? 0 : data.offset + LIST_LIMIT_LENGTH;

    return {
        isEnd,
        offsetNext
    }
}

export function getCategories(data: CategoryProps[], items: any[] = []) {
    let categories = [{ name: 'All', slug: '', count: items.length }];

    data && data.forEach(element => {
        let filtered_count = 0;
        for (let i = 0; i < items.length; i++) {
            const categories = items[i].categories;

            for (let j = 0; j < categories.length; j++) {
                if (element.name === categories[j]?.name) {
                    filtered_count ++;
                }
            }
        }
        categories.push({
            name: element.name,
            slug: element.name,
            count: filtered_count
        })
    })

    return categories;
}

export function getTracksOfCategories(key: string, items: ProjectProps[] = []) {
    let data: any = [];

    if (key === 'All') return items;

    for (let i = 0; i < items.length; i++) {
        const categories = items[i].categories;

        for (let j = 0; j < categories.length; j++) {
            if (key === categories[j]?.name) {
                data.push(items[i]);
            }
        }
    }

    return data;
}

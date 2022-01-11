export interface ReducerFactoryState {
    [slug: string]: {
        result: {} | null,
        requesting: boolean,
        error: string | null
    }
}

export interface ReducerFactoryParams {
    slug: string,
    initialValue: {} | null
}

export interface OffsetProps {
    isEnd: boolean,
    offset: number | null,
    limit: number | null,
    items: ProjectProps[],
    requesting: boolean,
    error: string | null,
}

export interface CategoryProps {
    name: string,
    slug: string
}

export interface ProjectProps {
    categories: CategoryProps[]
}

export interface factoryProps {
    requesting: boolean,
    error: string | null,
    result: any
}
export interface menuLinksProps {
    title: string
    caption?: string
    icon?: string
    level?: number
    active?: boolean
    name?: string
    target?: string
    children?: Array<menuLinksProps>
}
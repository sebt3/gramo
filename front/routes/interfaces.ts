export interface menuLinksProps {
    title: string
    caption?: string
    link?: string
    icon?: string
    level?: number
    active?: boolean
    children?: Array<menuLinksProps>
}
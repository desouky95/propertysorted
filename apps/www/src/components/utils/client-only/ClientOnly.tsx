import { useIsClient } from "@uidotdev/usehooks"


type ClientOnlyProps = {
    children: React.ReactNode
}
export const ClientOnly = ({ children }: ClientOnlyProps) => {

    const isClient = useIsClient()

    return isClient ? <>{children}</> : null

}
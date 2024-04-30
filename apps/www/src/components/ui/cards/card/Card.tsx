import React, { Children, HTMLAttributes, HTMLProps, PropsWithChildren, ReactElement, isValidElement } from "react"


type ChildrenTypes = typeof Content | typeof Footer
type CardProps = {
    // children: React.ReactElement<ChildrenTypes>| Array<React.ReactElement<ChildrenTypes>>
    innerRef ?: React.Ref<HTMLDivElement>
} & React.PropsWithoutRef<HTMLProps<HTMLDivElement>>

interface CardComposition {
    Content: typeof Content
    Footer: React.FunctionComponent<any>

}
export const Card: CardComposition & React.FC<PropsWithChildren<CardProps>> = ({ children, innerRef , ...props }) => {


    const __ = Children.toArray(children);

    const ContentElement = __.filter(_ => isValidElement(_) && _.type == Content)[0]
    const FooterElement = __.filter(_ => isValidElement(_) && _.type == Footer)[0]

    return <div className="flex flex-col" ref={innerRef} {...props}>
        {ContentElement}
        {FooterElement}
    </div>
}


type ContentProps = {
    innerRef ?: React.Ref<HTMLDivElement>

}
const Content = ({ children, innerRef }: PropsWithChildren<ContentProps>) => {
    return <div ref={innerRef} className="mb-3">{children}</div>
}

const Footer = ({ children }: PropsWithChildren) => {
    return <div className="grid gap-x-1 gap-y-2">{children}</div>
}


Card.Content = Content
Card.Footer = Footer 
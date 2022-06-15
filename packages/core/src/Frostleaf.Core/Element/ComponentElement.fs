namespace Frostleaf.Element

open Fable.Core

type ComponentElement<'Props> =
    private
    | ComponentElement of renderElement: ('Props -> array<IElement> -> JS.Promise<IElement>) * props: 'Props * children: array<IElement>

    static member Create renderElement props children = ComponentElement (renderElement, props, children)

    static member Unwrap (ComponentElement (renderElement, props, children)) = (renderElement, props, children)

    interface IElement with
        member this.Render() =
            let (renderElement, props, children) = ComponentElement.Unwrap<'Props> this
            promise {
                let! content = renderElement props children
                return! content.Render()
            }

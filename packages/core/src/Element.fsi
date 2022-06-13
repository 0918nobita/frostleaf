module Frostleaf.Element

[<Interface>]
type IElement =
    abstract member Render: unit -> Async<string>

[<Sealed>]
type TextElement =
    interface IElement

[<Sealed>]
type HtmlElement =
    interface IElement

[<Sealed>]
type ComponentElement<'Props> =
    interface IElement

val text : string -> TextElement

val html : string -> Map<string, string> -> list<IElement> -> HtmlElement

val componentElement : ('Props * list<IElement> -> Async<IElement>) -> 'Props -> list<IElement> -> ComponentElement<'Props>

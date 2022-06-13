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

val text : string -> TextElement

val html : string -> Map<string, string> -> list<IElement> -> HtmlElement

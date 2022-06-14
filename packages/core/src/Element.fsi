module Frostleaf.Element

open Fable.Core

[<Interface>]
type IElement =
    abstract member Render: unit -> JS.Promise<string>

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

val html : string -> Map<string, string> -> array<IElement> -> HtmlElement

val componentElement : ('Props -> array<IElement> -> JS.Promise<IElement>) -> 'Props -> array<IElement> -> ComponentElement<'Props>

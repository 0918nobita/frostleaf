module Frostleaf.Element.HtmlElement

[<Sealed>]
type T =
    interface IElement

    static member Create : string -> Map<string, string> -> array<IElement> -> T

    static member Unwrap : T -> string * Map<string, string> * array<IElement>

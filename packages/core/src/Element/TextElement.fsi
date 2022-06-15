namespace Frostleaf.Element

[<Sealed>]
type TextElement =
    interface IElement

    static member Create : string -> TextElement

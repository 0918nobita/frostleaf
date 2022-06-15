namespace Frostleaf.Element

type TextElement =
    private
    | TextElement of string

    static member Create content = TextElement content

    interface IElement with
        member this.Render() =
            match this with
            | TextElement content -> promise { return content }

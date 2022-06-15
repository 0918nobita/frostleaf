module Frostleaf.Element.HtmlElement

let voidElements = ["area"; "base"; "br"; "col"; "command"; "embed"; "hr"; "img"; "input"; "keygen"; "link"; "meta"; "param"; "source"; "track"; "wbr"]

type T =
    private
    | HtmlElement of tag: string * attrs: Map<string, string> * children: array<IElement>

    static member Create tag attrs children = HtmlElement (tag, attrs, children)

    static member Unwrap (HtmlElement (tag, attrs, children)) = (tag, attrs, children)

    interface IElement with
        member this.Render() =
            let (tag, attrs, children) = T.Unwrap this

            let attrs =
                attrs
                |> Map.fold (fun state key value -> $"%s{key}=\"%s{value}\"" :: state) []
                |> List.rev

            let renderedAttrs =
                if List.isEmpty attrs
                then ""
                else attrs |> String.concat " " |> sprintf " %s"

            if List.contains tag voidElements
            then
                promise { return $"<%s{tag}{renderedAttrs}>" }
            else
                promise {
                    let! renderedChildren = children |> Array.map (fun child -> child.Render()) |> Promise.all
                    let renderedChildren = renderedChildren |> String.concat ""
                    return $"<%s{tag}%s{renderedAttrs}>%s{renderedChildren}</%s{tag}>"
                }

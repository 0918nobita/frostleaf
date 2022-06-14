module Frostleaf.Element

type IElement =
    abstract member Render: unit -> Async<string>

type TextElement =
    | TextElement of string

    interface IElement with
        member this.Render() =
            match this with
            | TextElement content -> async { return content }

type HtmlElement =
    | HtmlElement of tag: string * attrs: Map<string, string> * children: list<IElement>

    interface IElement with
        member this.Render() =
            let voidElements = ["area"; "base"; "br"; "col"; "command"; "embed"; "hr"; "img"; "input"; "keygen"; "link"; "meta"; "param"; "source"; "track"; "wbr"]

            match this with
            | HtmlElement (tag, attrs, children) ->
                let attrs =
                    attrs
                    |> Map.fold (fun state key value -> $"%s{key}=\"%s{value}\"" :: state) []
                    |> List.rev
                let renderedAttrs =  if List.isEmpty attrs then "" else attrs |> String.concat " " |> sprintf " %s"
                if List.contains tag voidElements
                then
                    async { return $"<%s{tag}{renderedAttrs}>" }
                else
                    async {
                        let! renderedChildren = children |> List.map (fun child -> child.Render()) |> Async.Parallel
                        let renderedChildren = renderedChildren |> String.concat ""
                        return $"<%s{tag}%s{renderedAttrs}>%s{renderedChildren}</%s{tag}>"
                    }

type ComponentElement<'Props> =
    | ComponentElement of renderElement: ('Props -> list<IElement> -> Async<IElement>) * props: 'Props * children: list<IElement>

    interface IElement with
        member this.Render() =
            match this with
            | ComponentElement (renderElement, props, children) ->
                async {
                    let! content = renderElement props children
                    return! content.Render()
                }

let text = TextElement

let html tag attrs children = HtmlElement (tag, attrs, children)

let componentElement renderElement props children = ComponentElement (renderElement, props, children)

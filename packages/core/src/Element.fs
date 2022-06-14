module Frostleaf.Element

open Fable.Core

type IElement =
    abstract member Render: unit -> JS.Promise<string>

type TextElement =
    | TextElement of string

    interface IElement with
        member this.Render() =
            match this with
            | TextElement content -> promise { return content }

type HtmlElement =
    | HtmlElement of tag: string * attrs: Map<string, string> * children: array<IElement>

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
                    promise { return $"<%s{tag}{renderedAttrs}>" }
                else
                    promise {
                        let! renderedChildren = children |> Array.map (fun child -> child.Render()) |> Promise.all
                        let renderedChildren = renderedChildren |> String.concat ""
                        return $"<%s{tag}%s{renderedAttrs}>%s{renderedChildren}</%s{tag}>"
                    }

type ComponentElement<'Props> =
    | ComponentElement of renderElement: ('Props -> array<IElement> -> JS.Promise<IElement>) * props: 'Props * children: array<IElement>

    interface IElement with
        member this.Render() =
            match this with
            | ComponentElement (renderElement, props, children) ->
                promise {
                    let! content = renderElement props children
                    return! content.Render()
                }

let text = TextElement

let html tag attrs children = HtmlElement (tag, attrs, children)

let componentElement renderElement props children = ComponentElement (renderElement, props, children)

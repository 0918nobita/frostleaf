module Tests

open Fable.Core
open Fable.Jester
open Frostleaf.Element
open Frostleaf.Library

Jest.describe("Element", (fun () ->
    Jest.test("Render TextElement", promise {
        let! actual = (text "Hello, world!" :> IElement).Render()
        let expected = "Hello, world!"
        Jest.expect(actual).toEqual(expected)
    })

    Jest.test("Render HtmlElement", promise {
        let! actual =
            (html "p" Map.empty [| text "Hello, world!" |] :> IElement).Render()

        let expected = "<p>Hello, world!</p>"
        Jest.expect(actual).toEqual(expected)
    })

    Jest.test("Render HtmlElement with attributes", promise {
        let attrs = Map.ofList [("id", "foo"); ("class", "bar")]

        let children: array<IElement> = [| text "Hello, world!" |]

        let! actual =
            (html "p" attrs children :> IElement).Render()

        let expected = """<p class="bar" id="foo">Hello, world!</p>"""
        Jest.expect(actual).toEqual(expected)
    })

    Jest.test("Render void HtmlElement", promise {
        let! actual =
            (html "hr" Map.empty Array.empty :> IElement).Render()

        let expected = "<hr>"
        Jest.expect(actual).toEqual(expected)
    })

    Jest.test("Render ComponentElement", promise {
        let componentFn prop _children : JS.Promise<IElement> =
            promise { return text $"Hello, %s{prop}!" :> IElement }

        let! actual =
            (componentElement componentFn "world" Array.empty :> IElement).Render()

        let expected = "Hello, world!"
        Jest.expect(actual).toEqual(expected)
    })
))

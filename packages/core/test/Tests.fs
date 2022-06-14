module Tests

open Frostleaf
open Xunit

[<Fact>]
let ``Render TextElement`` () = async {
    let! actual = (Element.text "Hello, world!" :> Element.IElement).Render()
    let expected = "Hello, world!"
    Assert.Equal(expected, actual)
}

[<Fact>]
let ``Render HtmlElement`` () = async {
    let! actual =
        (Element.html "p" Map.empty [Element.text "Hello, world!"] :> Element.IElement).Render()
    let expected = "<p>Hello, world!</p>"
    Assert.Equal(expected, actual)
}

[<Fact>]
let ``Render HtmlElement with attributes`` () = async {
    let attrs = Map.ofList [("id", "foo"); ("class", "bar")]
    let children: list<Element.IElement> = [Element.text "Hello, world!"]
    let! actual =
        (Element.html "p" attrs children :> Element.IElement).Render()
    let expected = """<p class="bar" id="foo">Hello, world!</p>"""
    Assert.Equal(expected, actual)
}

[<Fact>]
let ``Render void HtmlElement`` () = async {
    let! actual = (Element.html "hr" Map.empty [] :> Element.IElement).Render()
    let expected = "<hr>"
    Assert.Equal(expected, actual)
}

[<Fact>]
let ``Render ComponentElement`` () = async {
    let componentFn prop _children : Async<Element.IElement> =
        async { return Element.text $"Hello, %s{prop}!" }
    let! actual =
        (Element.componentElement componentFn "world" [] :> Element.IElement).Render()
    let expected = "Hello, world!"
    Assert.Equal(expected, actual)
}

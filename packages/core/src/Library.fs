module Frostleaf.Library

let text = Element.TextElement.Create

let html = Element.HtmlElement.T.Create

let componentElement<'Props> = Element.ComponentElement.Create<'Props>

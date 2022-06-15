namespace Frostleaf.Element

open Fable.Core

[<Sealed>]
type ComponentElement<'Props> =
    interface IElement

    static member Create : ('P -> array<IElement> -> JS.Promise<IElement>) -> 'P -> array<IElement> -> ComponentElement<'P>

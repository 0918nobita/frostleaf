namespace Frostleaf.Element

open Fable.Core

type IElement =
    abstract member Render: unit -> JS.Promise<string>

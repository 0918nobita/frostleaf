module Frostleaf.App

type ScriptPath = ScriptPath of string

type IComponent =
    abstract member Resolve: unit -> Element.IElement * list<ScriptPath>

let () =
    async {
        let! result = (Element.text "Hello, world!" :> Element.IElement).Render()
        printfn "%s" result
    }
    |> Async.StartImmediate
    (*
    promise {
        return! Promise.create (fun resolve _reject -> resolve "Hello, world!")
    }
    |> Promise.map (printfn "%s")
    |> ignore
    *)

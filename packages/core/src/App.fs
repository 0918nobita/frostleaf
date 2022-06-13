module App

let () =
    promise {
        return! Promise.create (fun resolve _reject -> resolve "Hello, world!")
    }
    |> Promise.map (printfn "%s")
    |> ignore

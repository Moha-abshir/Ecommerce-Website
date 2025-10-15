import { Header } from "../Shared-Components/header"

export function NotFoundPage(){
    return(
        <>
        <title>404</title>
            <Header/>
            <p style={{ marginTop: "4em" }}>404</p>
            <p>Page not Found</p>
        </>
    )
}
import { useRouteError } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="font-bold text-3xl">Oops!</h1>
            <p className="text-xl my-5">Sorry, an unexpected error has occured</p>
            <p className="text-lg">{error.statusText || error.message}</p>
        </div>
    )
}

export default ErrorPage
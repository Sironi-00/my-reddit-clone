import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import SubredditsBar from "../Components/SubredditsBar/SubredditsBar";

const Root = () => {
    return (
        <>
        <Header />
        <main>
        <SubredditsBar />
            <Outlet />
        </main>
        </>
    )
}

export default Root;
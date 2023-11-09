import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import SubredditsBar from "../components/subredditsBar/SubredditsBar";

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
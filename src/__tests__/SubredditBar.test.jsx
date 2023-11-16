import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ContextProvider from "../Controller/ContextProvider/ContextProvider";
import SubredditsBar from "../View/Components/SubredditsBar/SubredditsBar";
describe(SubredditsBar, () => {
    beforeEach(() => {
        render(
        <BrowserRouter>
            <ContextProvider>
                <SubredditsBar />
            </ContextProvider>
        </BrowserRouter>
        )
    });

    it("expects links [testid=\"subreddit-link\"] to exist", async () =>{
        const element = await screen.findAllByTestId("subreddit-link")
        expect(element).exist
    })
})
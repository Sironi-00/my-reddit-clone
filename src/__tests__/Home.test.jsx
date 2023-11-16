import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ContextProvider from "../Controller/ContextProvider/ContextProvider";
import Home from "../View/Pages/Home/Home";
describe(Home, () => {
    beforeEach(() => {
        render(
        <BrowserRouter>
            <ContextProvider>
                <Home />
            </ContextProvider>
        </BrowserRouter>
        )
    });

    it("expects role=\"article\" to exist", async () =>{
        const element = await screen.findAllByRole("article");
        expect(element).exist
    })
    
    it("expects elements with \"Posted by\"", async () =>{
        const element = await screen.findAllByText("Posted by");
        expect(element).exist
    })
})
import { render, screen } from "@testing-library/react";

import App from "../App";
describe(App, () => {
    beforeEach(() => {
        render(<App />);
    });

    it("renders App", () => {
        expect(screen).exist;
    });

    it("expects heading to be \"Reddit\"", () => {
        const heading = screen.getByRole("heading");
        expect(heading.textContent).toBe("Reddit")
    });
    
    it("expects search to exist", () => {
        const search = screen.getByRole("search");
        expect(search).exist
    });

    it("expects nav to exist", () => {
        const nav = screen.getByRole("navigation");
        expect(nav).exist
    });

    it("expects Login to not exist", () => {
        const element = screen.queryByText("Login");
        expect(element).not.exist
    });
});

import Home from "../View/Pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
describe(Home, () => {
    beforeEach(() => {
        render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
        )
    });

    it("Home", () => {
        screen.debug()      
    })
})
import { render, screen } from "@testing-library/react";

import ContextProvider from "../Controller/ContextProvider/ContextProvider";
import App from "../App";
describe(App, () => {
    beforeEach(() => {
        render(
            <ContextProvider>
                <App />
            </ContextProvider>
        );
    });

    it("renders App", () => {
        expect(screen).exist;
    });

    it("expects heading to be \"Reddit\"", () => {
        const heading = screen.getByRole("heading", {level: 1});
        expect(heading.textContent).toBe("Reddit");
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
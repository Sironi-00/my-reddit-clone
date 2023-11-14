import { render, screen } from "@testing-library/react";

import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

import Comments from "../View/Pages/Comments/Comments";
describe(Comments, () => {
    beforeEach(() => {
        const postId = "17uyipg";
        render(
            <MemoryRouter initialEntries={[`/comments/${postId}`]}>
                <Routes>
                    <Route path="/comments/:postId" element={<Comments />} />
                </Routes>
            </MemoryRouter>
        )
    });

    it("expects Post as role=\"article\" to exist", async () =>{
        const element = await screen.findByRole("article");
        expect(element).exist
    })
    
    it("expects elements with \"Posted by\"", async () =>{
        const element = await screen.findByText("Posted by");
        expect(element).exist
    })
})
import { render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import ContextProvider from "../Controller/ContextProvider/ContextProvider";
import Comments from "../View/Pages/Comments/Comments";
import { getComments } from "../api/redditApi";

describe("API getComments", () => {
    it("Tests the reddit API", async () => {
        const postId = "17wib94";
        const data = await getComments(postId);
        expect(data).exist;
    });
});

describe("Comments", () => {
    beforeEach(() => {
        const postId = "17wib94";
        render(
            <MemoryRouter initialEntries={[`/comments/${postId}`]}>
                <Routes>
                    <Route
                        path="/comments/:postId"
                        element={
                            <ContextProvider>
                                <Comments />
                            </ContextProvider>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );
    });

    it('expects Post with role="article" to exist', async () => {
        // const element = await screen.findByRole("article");
        // expect(element).exist
    });

    it('expects elements with testid="comment-message"', async () => {
        // const element = await screen.findAllByTestId("comment-message");
        // console.log(element)
    });
});

import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

let container;
beforeEach(() => {
  const createBlog = jest.fn();
  const blogObject = {
    author: "Mikko",
    title: "Double",
    url: "goog.fi",
    likes: 0,
    user: {
      name: "markus",
      username: "minna",
    },
  };
  container = render(
    <Blog
      blog={blogObject}
      removeBlog={createBlog}
      currentUserUsername="make"
    />
  ).container;
});

test("at start the children are not displayed", () => {
  const element = screen.getByText("Double", { exact: false });
  expect(element).toBeDefined();
});

test("testing all data is shown after clicking the button", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".togglableContent");
  expect(div).not.toHaveStyle("display: none");
});

// test('creating a new blog calls the createBlog prop with the correct data', async () => {
//   const createBlog = jest.fn()
//   const setNewAuthor = jest.fn()
//   const setNewTitle = jest.fn()
//   const setNewUrl = jest.fn()

//   render(<BlogForm createBlog={createBlog} setNewAuthor={setNewAuthor} setNewTitle={setNewTitle} setNewUrl={setNewUrl} />)

//   const form = screen.getByTestId('form')
//   const titleInput = screen.getByTestId('title-input')
//   const authorInput = screen.getByTestId('author-input')
//   const urlInput = screen.getByTestId('url-input')
//   const submitButton = screen.getByText('create')

//   userEvent.type(titleInput, 'Test Title')
//   userEvent.type(authorInput, 'Test Author')
//   userEvent.type(urlInput, 'test.com')
//   await act(async () => {
//   userEvent.click(submitButton)
//   })

//   expect(createBlog).toHaveBeenCalledWith({ author: 'Test Author', title: 'Test Title', url: 'test.com' })
//   })

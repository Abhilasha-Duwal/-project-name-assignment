import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskForm from "../TaskForm/TaskForm";
import { renderWithProviders } from "../../test-utils";

it("should submit form with correct data", async () => {
  const handleSubmit = jest.fn();
  const { getByTestId } = renderWithProviders(
    <TaskForm
      newTaskData={{ newTask: "", newTaskDescription: "" }}
      onChangeHandler={() => {}}
      handleSubmit={handleSubmit}
    />
  );

  const input = screen.getByTestId("input");
  const textarea = screen.getByTestId("textarea");
  const form = screen.getByTestId("form");

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.change(textarea, { target: { value: "Test Description" } });

  fireEvent.submit(form);

  // Wait for the form submission to be called
  await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
});

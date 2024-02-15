import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskList from "../TaskTable/TaskList";
import { renderWithProviders } from "../../test-utils";

describe("TaskList component", () => {
  it("should update task completion status", async () => {
    const { getAllByRole } = renderWithProviders(<TaskList />);

    // Simulate clicking on the checkbox for task with label text "Status"
    fireEvent.click(screen.getAllByRole("checkbox"));

    // Wait for the success message
    await waitFor(() =>
      expect(document.body).toHaveTextContent(
        "Successfully updated the completed status."
      )
    );
  });

  it("should delete task", async () => {
    const { getAllByRole } = renderWithProviders(<TaskList />);

    // Simulate clicking on the delete button for task with ID 1
    fireEvent.click(screen.getAllByRole("button"));

    // Wait for the success message
    await waitFor(() =>
      expect(document.body).toHaveTextContent("Successfully deleted task.")
    );
  });
});

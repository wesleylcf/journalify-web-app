export type CellTypes = "code" | "markdown";

export type DirectionTypes = "up" | "down";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export const defaultCell: Cell = {
  id: "defaultCell",
  content: `## Journalify: Javascript/markdown online environment \n\nFeatures: \n\n- There are two types of cells, markdown and code cells. \n\n- To edit a markdown cell, click on it to switch to edit mode. Similarly to exit edit mode, click outside of the cell. \n\n- Markdown cells follow the standard markdown language: https://www.markdownguide.org/basic-syntax/ \n\n- Code cells support importing modules, and you can write almost anything you would normally do in an IDE. \n\n- You can render any React component, or any Javascript data type by calling the "show()" function. \n\n- Code bundling is continuous for code cells, but code execution is contained within each cell. \n\n- Both cells are resizeable, and you can delete, move up, or move down cells using the buttons on the top right corner.`,
  type: "markdown",
};

export interface User {
  password: string;
  cells: Cell[];
}
const str = `## Journalify: Javascript/markdown online environment \n\nFeatures: \n\n- There are two types of cells, markdown and code cells. \n\n- To edit a markdown cell, click on it to switch to edit mode. Similarly to exit edit mode, click outside of the cell. \n\n- Markdown cells follow the standard markdown language: https://www.markdownguide.org/basic-syntax/ \n\n- Code cells support importing modules, and you can write almost anything you would normally do in an IDE. \n\n You can render any React component, or any Javascript data type by calling the "show()" function. \n\n- Code bundling is continuous for code cells, but code execution is contained within each cell. \n\n- Both cells are resizeable, and you can delete, move up, or move down cells using the buttons on the top right corner.`;

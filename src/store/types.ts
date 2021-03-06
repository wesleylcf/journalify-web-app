export type CellTypes = "code" | "markdown";

export type DirectionTypes = "up" | "down";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export const defaultCell: Cell = {
  id: "defaultCell",
  content: `## Journalify: Javascript/markdown online environment \n\nFeatures: \n\n- There are two types of cells, markdown and code cells. \n\n- To edit a markdown cell, click on it to switch to edit mode. Similarly to exit edit mode, click outside of the cell. \n\n- Markdown cells follow the standard markdown language: https://www.markdownguide.org/basic-syntax/ \n\n- Code cells support importing modules, and you can write almost anything you would normally do in an IDE. \n\n- You can render any React component, or any Javascript data type by calling the "show()" function.(Note that each show() function call overwrites the previous call) \n\n- The preview window of code cells serves only to render content, click events will not work. \n\n- Code bundling is continuous for code cells, but code execution is contained within each cell. \n\n- Both cells are resizeable, and you can delete, move up, or move down cells using the buttons on the top right corner. \n\n- Application showcase/usage : https://wesleylim.notion.site/Journalify-web-app-showcase-usage-3a3a20e8f6f04a6c82d3bf36d62f584c`,
  type: "markdown",
};

export interface File {
  name: string;
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [id: string]: Cell;
  };
  saving: boolean;
  opened: boolean;
}

export const defaultFile: File = {
  name: "intro",
  data: { defaultCell },
  order: [defaultCell.id],
  loading: false,
  error: null,
  saving: false,
  opened: false,
};

export interface User {
  cells: Cell[];
}

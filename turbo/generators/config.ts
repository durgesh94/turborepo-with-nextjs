import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Example generator (kept for reference)
  plop.setGenerator("example", {
    description:
      "An example Turborepo generator - creates a new file at the root of the project",
    prompts: [
      {
        type: "input",
        name: "file",
        message: "What is the name of the new file to create?",
        validate: (input: string) => {
          if (input.includes(".")) {
            return "file name cannot include an extension";
          }
          if (input.includes(" ")) {
            return "file name cannot include spaces";
          }
          if (!input) {
            return "file name is required";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "type",
        message: "What type of file should be created?",
        choices: [".md", ".txt", ".js", ".ts", ".tsx", ".jsx"],
      },
      {
        type: "input",
        name: "title",
        message: "What should be the title of the new file?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ turbo.paths.root }}/{{ dashCase file }}{{ type }}",
        templateFile: "templates/turborepo-generators.hbs",
      },
    ],
  });

  // React component generator for TypeScript
  plop.setGenerator("react-component", {
    description: "Generate a new TypeScript React component in src/",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
        validate: (input: string) => {
          if (!input) return "Component name is required";
          if (!/^[A-Z][A-Za-z0-9]*$/.test(input))
            return "Use PascalCase (e.g., MyComponent)";
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/ui/src/{{ pascalCase name }}.tsx",
        templateFile: "templates/turborepo-generators.hbs",
      },
    ],
  });
}

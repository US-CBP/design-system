import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";

const options = {
  outdir: 'dist/types' ,
  exclude: [],
  allowUnknownProps: true
};

export default {
  /** Globs to analyze */
  globs: [
    "src/components/**/*.tsx"
  ],
  /** Globs to exclude */
  exclude: [
    "src/components/**/*.stories.tsx",
  ],
  /** Directory to output CEM to */
  outdir: "dist",
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: false,
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: false,
  /** Enable special handling for litelement */
  litelement: true,
  /** Enable special handling for catalyst */
  catalyst: false,
  /** Enable special handling for fast */
  fast: false,
  /** Enable special handling for stencil */
  stencil: true,
  /** Provide custom plugins */
  plugins: [
    jsxTypesPlugin(options)
  ],

  /** Overrides default module creation: */
  /*
  overrideModuleCreation: ({ ts, globs }) => {
    const program = ts.createProgram(globs, defaultCompilerOptions);
    const typeChecker = program.getTypeChecker();

    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
  */
  /**
   * Resolution options when using `dependencies: true`
   * For detailed information about each option, please refer to the [oxc-resolver documentation](https://github.com/oxc-project/oxc-resolver?tab=readme-ov-file#options).
   */
  /*
  resolutionOptions: {
    extensions: [".js", ".ts"],
    mainFields: ["module", "main"],
    conditionNames: ["import", "require"],
    // ... other oxc-resolver options
  },
  */
};


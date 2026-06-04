import { Command } from "commander";
import { providers } from "./providers/model";
export const modelsCommand = new Command("models")
  .description("Returns all the supported models")
  .option("-m, --model <modelName>", "name of the model", "all")
  .action((options) => {
    console.log("Listing models...");
    Object.values(providers).forEach((x) => {
      if (x.name === options.model) {
        console.log(x.models);
      }
    });
  });

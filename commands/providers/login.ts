
import { Command } from 'commander';
import { join } from 'path';
import { exit } from 'process';
export type filedata = {
    provider : Record<string , string>,
    SelectedModel : string
}
// u can not store everything in memory because varibale in cli are temperary
export const loginCommand = new Command("login")
    .description('Lets user login into the provider (use it as default)')
    .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
    .option('-a, --api_key <apiKey>', 'Your api key', '')
    .action(async (options) => {
        const configpath = join(import.meta.dir , "../../config");
        if(options.provider.trim().length === 0){
            console.log("please enter provider");
            exit(1);
        }
        if(options.api_key.trim().length === 0){
            console.log("please enter api key");
            exit(1)
        }
        let provider_content: filedata;
        const file = Bun.file(configpath);
        if(await file.exists()){
                const data = await file.text();
                provider_content = JSON.parse(data);
        } else {
            provider_content = {
                provider: {},
                SelectedModel:""
            }
        }
        provider_content.provider[options.provider] = options.api_key
        await Bun.write(configpath , JSON.stringify(provider_content , null , 2))
    })

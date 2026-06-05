
import { Command } from 'commander';
import { join } from 'path';
import type { filedata } from './login';

export const setProviderCommand = new Command("set")
    .description('Lets user set the default provider')
    .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
    .action(async(options) => {
        // this print the modle provider;
        console.log(options.provider);
        const configpath = join(import.meta.dir , "../../config");
        const file = Bun.file(configpath);
        if(await file.exists()){
            const data = await file.text();
            const parse_data:filedata =JSON.parse(data);
            parse_data.SelectedModel = options.provider
            await Bun.write(configpath , JSON.stringify(parse_data , null , 2))
            console.log("filed update successfaully")
        }
    })

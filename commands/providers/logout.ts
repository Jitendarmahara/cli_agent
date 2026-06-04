
import { Command } from 'commander';
import { join } from 'path';
import { exit } from 'process';
import type { filedata } from './login';

export const logoutCommand = new Command("logout")
    .description('Lets user logout from the provider')
    .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
    .action(async (options) => {
        // set the key "" it means the user have been loged out;
        const provider = options.provider;
        if(provider.trim().length === 0){
            console.log("please ener a vaildprovider")
            exit(1);
        }
        const configpath = join(import.meta.dir , "../../config");
        const file =  Bun.file(configpath);
        if(await file.exists()){
            console.log("hiw")
            const data = await file.text();
            const parse_data:filedata = JSON.parse(data);
            parse_data.provider[options.provider] = "";
            console.log("After:", parse_data.provider[provider]);
            await Bun.write(configpath , JSON.stringify(parse_data , null , 2))
        }
        console.log("logging out for provider " + options.provider)
    })


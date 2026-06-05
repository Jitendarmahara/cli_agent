import { join } from "node:path";
import type { filedata } from "./login";
import { GoogleGenAI  , Type} from "@google/genai";
import { exit } from "node:process";
export async function RunagentLoop(promot: string ){
    // this readis the selectedmodle and the provider ;

    const configpath = join(import.meta.dir , "../../config");
    const file = Bun.file(configpath);
    let api_key:any
    let model_name
    if(await file.exists()){
        const data = await file.text();
        const parse_data:filedata = JSON.parse(data);
         model_name = parse_data.SelectedModel;
        const provider = 'Gemini'
        api_key = parse_data.provider[provider]
    } else {
        exit(1)
    }

    const ai = new GoogleGenAI({ apiKey: api_key })
    // define functisn that work like tools;
    // its reads the file and fix the simple bugs;
    function read_file(filename:string){

    }
    function write_file(filename:string){

    }
    const tools:any[] = [{
        functionDelaration :[
            {
                name: "read_file",
                description: "read the content of the file with the filename",
                parameters:{
                    type: Type.OBJECT,
                    properties:{
                        filename: {type:Type.STRING}
                    },
                    required: ["filename"]
                }
            },
            {
                name: "write_file",
                description:"write to the given file with fixing the issue",
                parameters: {
                    type:Type.OBJECT,
                    properties:{
                        filename: {type:Type.STRING}
                    },
                    required : ["filename"]
                }
            }
        ]
    }]
    let contents : any = [{
            role:"user",
            parts:[
                {
                    text:promot
                }
            ]
        }]
    while(true){
        const result  = await ai.models.generateContent({
            model:model_name,
            contents,
            config :{ tools },
        })
        if(result.functionCalls && result.functionCalls.length > 0){

        }else{
            console.log(result.text);
            break;
        }
    }
}
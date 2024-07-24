import { Runtime } from "miniscript-ts";
import { Terminal } from "@xterm/xterm";
import { Readline } from "xterm-readline";
import { versionConfig } from "./version-config";

export class BasicIO {
  
  constructor(
    private xterm: Terminal,
    private readline: Readline) {

  }

  addIntrinsics(runtime: Runtime) {
    const outerThis = this;

	runtime.addIntrinsic('input(prompt=null)',
    function(prompt: string | null): Promise<string> {
      return outerThis.input(prompt);
    });
    
    runtime.addIntrinsic('version',
    function(): any {
		var result = runtime.newMap();
		result.set("miniscript", versionConfig.miniscript);
		result.set("buildDate", versionConfig.buildDate);
		result.set("hostName", versionConfig.hostName);
		result.set("hostInfo", versionConfig.hostInfo);
		return result;
    });
  }

  private async input(prompt: string | null): Promise<string> {
    if (prompt === null) {
      prompt = "";
    }
    return this.readline.read(prompt).then((txt) => {
      return txt;
    });
  }

}
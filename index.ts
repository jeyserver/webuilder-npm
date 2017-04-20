export {Options} from "./src/ts/Options";
export {Router} from "./src/ts/Router";
export {Translator} from "./src/ts/Translator";
export namespace webuilder{
	export type error = "data_duplicate" | "data_validation" | "unknown" | string;
	export type errorType = "fatal" | "warning" | "notice";
	export interface AjaxResponse{
		[key: string]: any;
		status:boolean;
		error?:	AjaxError[];
	}
	export interface AjaxError{
		input:string;
		error:error;
		type:errorType;
	}
}
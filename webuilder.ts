/// <reference types="jquery"/>

export namespace webuilder{
	export type error = "data_duplicate" | "data_validation" | "unknown" | string;
	export type errorType = "fatal" | "warning" | "notice";
	export interface AjaxResponse{
		[key: string]: any;
		status:boolean;
		error?:	AjaxError[];
	}
	export interface AjaxError{
		input?:string;
		error:error;
		type:errorType;
	}
	export interface AjaxSettings{
		accepts?: any;
		async?: boolean;
		beforeSend? (jqXHR: JQueryXHR, settings: JQueryAjaxSettings): any;
		cache?: boolean;
		complete? (jqXHR: JQueryXHR, textStatus: string): any;
		contents?: { [key: string]: any; };
		contentType?: any;
		context?: any;
		converters?: { [key: string]: any; };
		crossDomain?: boolean;
		data?: any;
		dataFilter? (data: any, ty: any): any;
		dataType?: string;
		error? (error:webuilder.AjaxError, jqXHR: JQueryXHR):void;
		global?: boolean;
		headers?: { [key: string]: any; };
		isLocal?: boolean;
		jsonp?: any;
		jsonpCallback?: any;
		method?: string;
		mimeType?: string;
		password?: string;
		processData?: boolean;
		scriptCharset?: string;
		statusCode?: { [key: string]: any; };
		success? (data: webuilder.AjaxResponse, textStatus: string, jqXHR: JQueryXHR): any;
		timeout?: number;
		traditional?: boolean;
		type?: string;
		url?: string;
		username?: string;
		xhr?: any;
		xhrFields?: { [key: string]: any; };
	}
}
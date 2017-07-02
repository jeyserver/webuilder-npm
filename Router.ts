import * as url from "url";
import Options from "./Options";
import Translator from "./Translator";
export default class Router{
	public static url(page?: string, parameters?: {lang?: string, hostname?: string}, absolute?: boolean): string{
		if (parameters === undefined){
			parameters = {};
		}
		if (absolute === undefined){
			absolute = false;
		}
		const lastSlash: string = Options.get("packages.base.routing.lastslash");
		if (lastSlash){
			if (page.substr(-1) !== "/"){
				page += "/";
			}
		}else{
			while (page.substr(-1) === "/"){
				page = page.substr(0, length - 1);
			}
		}
		let url = "";
		if (absolute === true){
			let hostname = window.location.hostname;
			if (parameters.hasOwnProperty("hostname")){
				hostname = parameters.hostname;
				delete parameters.hostname;
			}
			url += window.location.protocol + "//" + hostname;
		}

		const changelang = Options.get("packages.base.translator.changelang");
		const type = Options.get("packages.base.translator.changelang.type");
		if (changelang === "uri"){
			let lang = "";
			if (parameters.hasOwnProperty("lang")){
				lang = parameters.lang;
				delete parameters.lang;
			}else{
				if (type === "short"){
					lang = Translator.getShortCodeLang();
				}else if (type === "complete"){
					lang = Translator.getCodeLang();
				}
			}
			if (!page){
				if (lang.length === 2){
					if (lang !== Translator.getDefaultShortLang()){
						url += "/" + lang;
					}
				}else if (lang && lang !== Translator.getDefaultLang()){
					url += "/" + lang;
				}
			}else if (lang){
				url += "/" + lang;
			}
		}else if (changelang === "parameter"){
			if (!parameters.hasOwnProperty("lang")){
				if (type === "short"){
					parameters.lang = Translator.getShortCodeLang();
				}else if (type === "complete"){
					parameters.lang = Translator.getCodeLang();
				}
			}
		}
		if (page){
			url += "/" + page;
		}
		if (!url){
			url += "/";
		}
		const query = this.http_build_query(parameters);
		if (query.length > 0){
			url += "?" + query;
		}
		return url;
	}
	public static getAjaxFormURL(link: string): string {
		let resolvedLink = link;
		if (resolvedLink.substr(0, 4) !== "http"){
			resolvedLink = url.resolve(location.href, resolvedLink);
		}
		const URL: any = url.parse(resolvedLink, true);
		URL.search = "";
		URL.query.ajax = 1;
		return url.format(URL);
	}
	private static http_build_query(formdata: any, numericPrefix?: string, argSeparator?: string): string{
		const httpBuildQueryHelper = (key: string, val: any, argumentSeparator: string): string => {
			const tmp = [];
			if (val === true) {
				val = "1";
			} else if (val === false) {
				val = "0";
			}
			if (val !== null) {
				if (typeof val === "object") {
					for (const k in val) {
						if (val[k] !== null) {
							tmp.push(httpBuildQueryHelper(key + "[" + k + "]", val[k], argumentSeparator));
						}
					}
					return tmp.join(argumentSeparator);
				} else if (typeof val !== "function") {
					return encodeURIComponent(key) + "=" + encodeURIComponent(val);
				} else {
					throw new Error("There was an error processing for http_build_query().");
				}
			}
			return "";
		};

		if (!argSeparator) {
			argSeparator = "&";
		}
		const tmp: string[] = [];
		for (let key in formdata) {
			if (formdata.hasOwnProperty(key)){
				const value = formdata[key];
				if (numericPrefix) {
					key = String(numericPrefix) + key;
				}
				const query = httpBuildQueryHelper(key, value, argSeparator);
				if (query !== "") {
					tmp.push(query);
				}
			}
		}
		return tmp.join(argSeparator);
	}
}

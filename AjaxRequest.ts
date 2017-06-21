/// <reference path="typings.d.ts"/>

import * as $ from "jquery";
import Router from "./Router";

export function AjaxRequest(settings: AjaxSettings ){
	const newSettings: JQueryAjaxSettings = {};
	for (const key in settings){
		if (key !== "success" && key !== "error"){
			newSettings[key] = settings[key];
		}
	}
	if (
		typeof newSettings.url === "string" &&
		newSettings.url.substr(0, 5) !== "http:" &&
		newSettings.url.substr(0, 6) !== "https:" &&
		newSettings.url.substr(0, 1) !== "/"
	){
		newSettings.url = Router.url(newSettings.url);
	}
	if (typeof newSettings.data === "object" && typeof newSettings.data.ajax === "undefined"){
		newSettings.data.ajax = 1;
	}
	newSettings.success = (data: AjaxResponse, textStatus, JqXHR) => {
		if (data.status){
			if (settings.hasOwnProperty("success")){
				settings.success(data, textStatus, JqXHR);
			}
		}else{
			if (data.hasOwnProperty("error")){
				data.error.forEach((error) => {
					if (settings.hasOwnProperty("error")){
						settings.error(error, JqXHR);
					}
				});
			}else{
				if (settings.hasOwnProperty("error")){
					const error: AjaxError = {
						error: "unknown",
						type: "fatal",
					};
					settings.error(error, JqXHR);
				}
			}
		}
	};
	newSettings.error = (JqXHR, textStatus) => {
		if (settings.hasOwnProperty("error")){
			const error: AjaxError = {
				error: textStatus,
				type: "fatal",
			};
			settings.error(error, JqXHR);
		}
	};
	return $.ajax(newSettings);
}

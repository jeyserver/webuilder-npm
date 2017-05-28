
import * as $ from "jquery";
import Router from "./Router";
import {webuilder} from "./webuilder";

export function AjaxRequest(settings: webuilder.AjaxSettings ){
	let newSettings:JQueryAjaxSettings = {};
	for(let key in settings){
		if(key != 'success' && key != 'error'){
			newSettings[key] = settings[key];
		}
	}
	newSettings.success = (data:webuilder.AjaxResponse, textStatus, JqXHR) => {
		if(data.status){
			if(settings.hasOwnProperty('success')){
				settings.success(data, textStatus,JqXHR);
			}
		}else{
			if(data.hasOwnProperty('error')){
				data.error.forEach((error) => {
					if(settings.hasOwnProperty('error')){
						settings.error(error, JqXHR);
					}
				});
			}else{
				if(settings.hasOwnProperty('error')){
					let error:webuilder.AjaxError = {
						type:"fatal",
						error:"unknown"
					}
					settings.error(error, JqXHR);
				}
			}
		}
	}
	newSettings.error = (JqXHR, textStatus) => {
		if(settings.hasOwnProperty('error')){
			let error:webuilder.AjaxError = {
				type:"fatal",
				error:textStatus
			}
			settings.error(error, JqXHR);
		}
	}
	return $.ajax(newSettings);
}
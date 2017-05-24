import * as $ from "jquery";
import {webuilder} from "./webuilder";
import Router from "./Router";
import {AjaxRequest} from "./AjaxRequest";
export interface JQuery{
	formAjax(settings: webuilder.AjaxSettings):void;
}
$.fn.formAjax = function(settings: webuilder.AjaxSettings){
	var $this = $(this);
	let $btn = $('[type=submit]', $this);
	$btn.data('orghtml', $btn.html());
	$btn.html('<i class="fa fa-spinner fa-spin"></i>');
	$btn.prop('disabled', true);

	let newSettings:webuilder.AjaxSettings = {};
	for(let key in settings){
		if(key != 'success' && key != 'error'){
			newSettings[key] = settings[key];
		}
	}
	if(!settings.hasOwnProperty('url')){
		newSettings.url = Router.getAjaxFormURL($this.attr('action'));
	}
	if(!settings.hasOwnProperty('type')){
		newSettings.type = $this.attr('method');
	}
	if(!settings.hasOwnProperty('data')){
		newSettings.data = $this.serialize();
	}
	if(!settings.hasOwnProperty('dataType')){
		newSettings.dataType = 'json';
	}
	newSettings.success = (data: webuilder.AjaxResponse, textStatus: string, jqXHR: JQueryXHR) => {
		$btn.html($btn.data('orghtml'));
		$btn.prop('disabled', false);
		if(settings.hasOwnProperty('success')){
			settings.success(data, textStatus,jqXHR);
		}
	}
	newSettings.error = (error:webuilder.AjaxError, jqXHR: JQueryXHR) => {
		$btn.html($btn.data('orghtml'));
		$btn.prop('disabled', false);
		if(settings.hasOwnProperty('error')){
			settings.error(error, jqXHR);
		}
	}
	return AjaxRequest(newSettings);
}
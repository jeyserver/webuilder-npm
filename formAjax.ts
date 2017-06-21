/// <reference path="formAjaxJQuery.d.ts"/>

import * as $ from "jquery";
import {AjaxRequest} from "./AjaxRequest";
import Router from "./Router";

export function formAjax($this: JQuery, settings: AjaxSettings){
	const $btn = $("[type=submit]", $this);
	$btn.data("orghtml", $btn.html());
	$btn.html('<i class="fa fa-spinner fa-spin"></i>');
	$btn.prop("disabled", true);

	const newSettings: AjaxSettings = {};
	for (const key in settings){
		if (key !== "success" && key !== "error"){
			newSettings[key] = settings[key];
		}
	}
	if (!settings.hasOwnProperty("url")){
		newSettings.url = Router.getAjaxFormURL($this.attr("action"));
	}
	if (!settings.hasOwnProperty("type")){
		newSettings.type = $this.attr("method");
	}
	if (!settings.hasOwnProperty("data")){
		newSettings.data = $this.serialize();
	}
	if (!settings.hasOwnProperty("dataType")){
		newSettings.dataType = "json";
	}
	newSettings.success = (data: AjaxResponse, textStatus: string, jqXHR: JQueryXHR) => {
		$btn.html($btn.data("orghtml"));
		$btn.prop("disabled", false);
		if (settings.hasOwnProperty("success")){
			settings.success(data, textStatus, jqXHR);
		}
	};
	newSettings.error = (error: AjaxError, jqXHR: JQueryXHR) => {
		$btn.html($btn.data("orghtml"));
		$btn.prop("disabled", false);
		if (settings.hasOwnProperty("error")){
			settings.error(error, jqXHR);
		}
	};
	return AjaxRequest(newSettings);
}
$.fn.formAjax = function(settings: AjaxSettings){
	formAjax($(this), settings);
};

declare const options: any;
export default class Options{
	public static set(key: string, value: any){
		options[key] = value;
	}
	public static get(key: string): any{
		return options[key];
	}
}

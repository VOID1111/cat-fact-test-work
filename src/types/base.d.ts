import { TranslateResult } from "vue-i18n";

export type BaseArrayItem = {
	text: TranslateResult | string;
	value: number;
};

export type PerPageChoices = Array<BaseArrayItem>;

export type TabelHeaders = Array<BaseArrayItem>

export as namespace BASE;

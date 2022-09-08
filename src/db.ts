import Dexie from "dexie";

export class CacheDatabase extends Dexie {
	wiki!: Dexie.Table<IWikiEntry, string>;
	diary!: Dexie.Table<IDiaryEntry, number>;
	safetyNet!: Dexie.Table<ISafetyNetItem, number>;
	motivators!: Dexie.Table<IMotivator, number>;
	updated!: Dexie.Table<IUpdate, string>;

	constructor() {
		super("CacheDatabase");
		this.version(1).stores({
			wiki: "id, updated_at, title",
			diary: "id, mood_day, _pending",
			safetyNet: "id, name, _pending",
			motivators: "id, modified_at, name",
			updated: "name",
		});
	}
}

export interface IUpdate {
	name: string;
	time: Date;
}

export interface IWikiEntry {
	id: string;
	created_at: Date;
	updated_at: Date;
	title: string;
	content: string;
}

export interface IDiaryEntry {
	id: number;
	_delete: boolean;
	_pending: number;
	_previous: IDiaryEntry|null;
	mood_day: string;
	mood_type: string;
	mood_descr: string;
}

export interface ISafetyNetItem {
	id: number;
	_delete: boolean;
	_pending: number;
	_previous: ISafetyNetItem|null;
	name: string;
	type: string;
	strategies: string[];
	feedback: ISafetyNetFeedback;
}

export interface ISafetyNetFeedback {
	itHelped: boolean;
	comment: string;
	timestamp: string;
}

export interface IMotivator {
	id: number;
	name: string;
	headline: string;
	description: string;
	created_at: Date;
	modified_at: Date;
	content: object[];
	inputs: object[];
}

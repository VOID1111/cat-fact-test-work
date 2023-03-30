export type FactUser = {
	_id: string;
	name: { first: string; last: string; }
};

export type Fact = {
	_id: string;
	user: string | FactUser;
	text: string;
	type: string;
	createdAt: string;
	updatedAt: string;
};

export type Facts = Array<Fact>;

export as namespace FACTS;

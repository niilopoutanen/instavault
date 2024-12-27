
export class Snapshot {
    account: Account;
    followers: User[] = new Array<User>();
    following: User[] = new Array<User>();
    iDontFollowBack: User[] = new Array<User>();
    dontFollowMeBack: User[] = new Array<User>();
    summary: Summary[] = new Array<Summary>();

}

export class Account {
    username: string;
    id: string;
    biography: string;
    fullname: string;
    private: boolean;
    verified: boolean;
}

export class User {
    username: string;
    id: string;
}

export class Summary {
    date: Date;
    followers: number;
    following: number;
    unfollowers: User[] = new Array<User>();
    newfollowers: User[] = new Array<User>();
    unfollows: User[] = new Array<User>();
    newfollows: User[] = new Array<User>();
    hasPFP: boolean;
}

export class Period {
    title: string;
    from: Date;
    to: Date;
    dateSpan: number;
    id: number;
}

export class Periods {
    static full: Period = {
        title: "Full history",
        from: new Date(0),
        to: new Date(),
        dateSpan: 0,
        id: 0
    };
    static days7: Period = {
        title: "7 Days",
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
        dateSpan: 7,
        id: 1
    };
    static days30: Period = {
        title: "30 Days",
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(),
        dateSpan: 30,
        id: 2
    };

    static all: Period[] = new Array<Period>(Periods.days7, Periods.days30, Periods.full);
}
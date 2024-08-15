import fs from 'fs';
import path from 'path';
import type { Account, Summary } from './models';

export function getLatestSnapshotPath(username: string): string {
    const accountPath = `./data/accounts/${username}`;
    if(!fs.existsSync(accountPath)){
        return null;
    }
    let dates: any[] = fs.readdirSync(accountPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    if (!dates || dates.length == 0) return;
    dates = dates.sort();

    const timestamps = fs.readdirSync(path.join(accountPath, dates[dates.length - 1]), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const latestPath = path.join(accountPath, dates[dates.length - 1], timestamps[timestamps.length - 1]);
    return latestPath;
}
export function loadAccountData(username): Account {
    const accountFile = `./data/accounts/${username}/account.json`;
    const accountData = JSON.parse(fs.readFileSync(accountFile, 'utf8'));
    return accountData;
}

export function loadSnapshot(snapshotPath) {
    const followersFile = `${snapshotPath}/followers.json`;
    const followersData = JSON.parse(fs.readFileSync(followersFile, 'utf8'));

    const followingFile = `${snapshotPath}/following.json`;
    const followingData = JSON.parse(fs.readFileSync(followingFile, 'utf8'));

    const iDontFollowBackFile = `${snapshotPath}/iDontFollowBack.json`;
    const iDontFollowBackData = JSON.parse(fs.readFileSync(iDontFollowBackFile, 'utf8'));

    const dontFollowMeBackFile = `${snapshotPath}/dontFollowMeBack.json`;
    const dontFollowMeBackData = JSON.parse(fs.readFileSync(dontFollowMeBackFile, 'utf8'));

    const data = {
        followers: followersData,
        following: followingData,
        iDontFollowBack: iDontFollowBackData,
        dontFollowMeBack: dontFollowMeBackData
    }

    return data;
}
export function getArrayLength(file) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data.length;
}
export function getAllSnapshots(username) {
    const accountPath = `./data/accounts/${username}`;

    const dates = fs.readdirSync(accountPath, { withFileTypes: true });
    let snapshots = [];
    for (const dateSnapshot of dates) {
        if (dateSnapshot.isDirectory()) {
            const dateFolderPath = path.join(accountPath, dateSnapshot.name);
            const timestamps = fs.readdirSync(dateFolderPath, { withFileTypes: true });
            for (const timeSnapshot of timestamps) {
                if (timeSnapshot.isDirectory()) {
                    snapshots.push(path.join(accountPath, dateSnapshot.name, timeSnapshot.name));
                }
            }
        }
    }

    return snapshots;
}

export function dataByRange(summary: Summary[], from: Date, to: Date): Summary[] {
    if (!summary || !from || !to) {
        console.log("Invalid input");
        return summary;
    }

    let trimmedSummary = [];
    for (const s of summary) {
        const date = new Date(s.date);

        if (date >= from) {
            trimmedSummary.push(s);
        }
    }

    return trimmedSummary;
}

export function getDay() {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export function getTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}-${minutes}`;
}
export function getDateFromPath(pathStr: string): Date {
    const segments = pathStr.split(path.sep);

    const dateSegment = segments[2];
    const timeSegment = segments[3];

    const [year, month, day] = dateSegment.split('-').map(Number);
    const [hours, minutes] = timeSegment.split('-').map(Number);

    const date = new Date(year, month - 1, day, hours, minutes);

    return date;
}


export function beautifyDate(date: Date): string {
    if (date === undefined) return;
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return;
    }

    const year = parsedDate.getFullYear();
    const month = parsedDate.toLocaleString('default', { month: 'short' });
    const day = parsedDate.getDate();

    const shortDate = `${month} ${day}`;

    const currentYear = new Date().getFullYear();
    if (year !== currentYear) {
        return `${shortDate}, ${year}`;
    }
    return `${shortDate}`;
}


export function verify(username) {
    const accountPath = `./data/accounts/${username}`

    if (!fs.existsSync(accountPath)) {
        fs.mkdirSync(accountPath, { recursive: true });
    }
}
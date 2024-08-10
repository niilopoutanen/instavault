import { Snapshot, Summary, User } from '$lib/backend/models.js';
import { getLatestSnapshotPath, loadAccountData, getArrayLength, getAllSnapshots, getDateFromPath } from '$lib/backend/utils';
import { json } from '@sveltejs/kit';
import fs from 'fs';

export async function GET({ params }) {
    const username = params.username;
    const latest = getLatestSnapshotPath(username);
    if(!latest) return json(null);
    
    const followersFile = `${latest}/followers.json`;
    const followingFile = `${latest}/following.json`;

    const followersData = JSON.parse(fs.readFileSync(followersFile, 'utf8'));
    const followingData = JSON.parse(fs.readFileSync(followingFile, 'utf8'));

    let snapshot = new Snapshot();
    snapshot.account = loadAccountData(username);
    snapshot.followers = followersData;
    snapshot.following = followingData;
    snapshot.dontFollowMeBack = followingData.filter(followingUser =>
        !followersData.some(follower => follower.id === followingUser.id));

    snapshot.iDontFollowBack = followersData.filter(follower =>
        !followingData.some(followingUser => followingUser.id === follower.id));


    const snapshots = getAllSnapshots(username);
    for (let i = 0; i < snapshots.length; i++) {
        const snapshotPath = snapshots[i];
        const previousSnapshotPath = i > 0 ? snapshots[i - 1] : null;
        const summary = loadSummary(snapshotPath, previousSnapshotPath);
        snapshot.summary.push(summary);
    }

    return json(snapshot);
}



function loadSummary(snapshotPath, previousSnapshotPath): Summary {
    let summary = new Summary();
    const previousFollowersFile = `${previousSnapshotPath}/followers.json`;
    const previousFollowingFile = `${previousSnapshotPath}/following.json`;

    const followersFile = `${snapshotPath}/followers.json`;
    const followingFile = `${snapshotPath}/following.json`;


    summary.date = getDateFromPath(snapshotPath);
    summary.followers = getArrayLength(followersFile);
    summary.following = getArrayLength(followingFile);

    if (previousSnapshotPath) {
        const previousFollowers = JSON.parse(fs.readFileSync(previousFollowersFile, 'utf8'));
        const previousFollowing = JSON.parse(fs.readFileSync(previousFollowingFile, 'utf8'));

        const followers = JSON.parse(fs.readFileSync(followersFile, 'utf8'));
        const following = JSON.parse(fs.readFileSync(followingFile, 'utf8'));

        processChanges(followers, previousFollowers, following, previousFollowing, summary);
    }

    return summary;
}


function processChanges(followers, previousFollowers, following, previousFollowing, summary) {
    const previousFollowerIds = new Set(previousFollowers.map(f => f.id));
    const previousFollowingIds = new Set(previousFollowing.map(f => f.id));
    const followerIds = new Set(followers.map(f => f.id));
    const followingIds = new Set(following.map(f => f.id));

    // Find new followers
    followers.forEach(follower => {
        if (!previousFollowerIds.has(follower.id) && !summary.newfollowers.some(f => f.id === follower.id)) {
            summary.newfollowers.push(follower);
        }
    });

    // Find new follows
    following.forEach(followee => {
        if (!previousFollowingIds.has(followee.id) && !summary.newfollows.some(f => f.id === followee.id)) {
            summary.newfollows.push(followee);
        }
    });

    // Find unfollowers
    previousFollowers.forEach(previousFollower => {
        if (!followerIds.has(previousFollower.id) && !summary.unfollowers.some(f => f.id === previousFollower.id)) {
            summary.unfollowers.push(previousFollower);
        }
    });

    // Find unfollows
    previousFollowing.forEach(previousFollowee => {
        if (!followingIds.has(previousFollowee.id) && !summary.unfollows.some(f => f.id === previousFollowee.id)) {
            summary.unfollows.push(previousFollowee);
        }
    });

    return summary;
}

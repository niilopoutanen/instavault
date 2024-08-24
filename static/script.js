async function contactAPI(hash, userID, after) {
    const res = await fetch(
        `https://www.instagram.com/graphql/query/?query_hash=${hash}&variables=` +
        encodeURIComponent(
            JSON.stringify({
                id: userID,
                include_reel: true,
                fetch_mutual: true,
                first: 50,
                after: after,
            })
        )
    );
    const json = await res.json();
    return json;
}

async function fetchFollowers(userId, savePfps) {
    let followers = [];
    let after = null;
    let has_next = true;

    let fetchCount = 0;

    while (has_next) {
        const json = await contactAPI("c76146de99bb02f6415203be841dd25a", userId, after);
        has_next = json.data.user.edge_followed_by.page_info.has_next_page;
        after = json.data.user.edge_followed_by.page_info.end_cursor;
        followers = followers.concat(
            json.data.user.edge_followed_by.edges.map(({ node }) => (
                {
                    username: node.username,
                    id: node.id,
                    pfp: savePfps ? node.profile_pic_url : undefined,
                }
            ))
        );

        fetchCount += json.data.user.edge_followed_by.edges.length;
        console.log(fetchCount + " Followers loaded so far...");
    }

    return followers;
}

async function fetchFollowings(userId, savePfps) {
    let followings = [];
    let after = null;
    let has_next = true;

    let fetchCount = 0;

    while (has_next) {
        const json = await contactAPI("d04b0a864b4b54837c0d870b0e77e076", userId, after);
        has_next = json.data.user.edge_follow.page_info.has_next_page;
        after = json.data.user.edge_follow.page_info.end_cursor;

        followings = followings.concat(
            json.data.user.edge_follow.edges.map(({ node }) => ({
                username: node.username,
                id: node.id,
                pfp: savePfps ? node.profile_pic_url : undefined,
            }))
        );

        fetchCount += json.data.user.edge_follow.edges.length;
        console.log(fetchCount + " Followings loaded so far...");
    }

    return followings;
}

async function main() {
    const savePfps = false;
    clear();
    try {
        console.log(`Process started`);
        const username = "usernamehere";

        const userQueryRes = await fetch(`https://www.instagram.com/web/search/topsearch/?query=${username}`);
        const userQueryJson = await userQueryRes.json();
        const userId = userQueryJson.users.map(u => u.user).find(u => u.username === username).pk;
        const profileData = await getProfileData(username);
        let data = {
            account: profileData,
            followers: [],
            following: [],
        }
        data.followers = await fetchFollowers(userId, savePfps);
        data.following = await fetchFollowings(userId, savePfps);

        console.log(data);
    } catch (err) {
        console.error({ err });
    }
}

async function getProfileData(username) {
    const res = await fetch("https://i.instagram.com/api/v1/users/web_profile_info/?username=" + username, {
        method: 'GET',
        headers: {
            'x-ig-app-id': '936619743392459'
        },
    });

    const json = await res.json();
    return {
        username: json.data.user.username,
        pfp: json.data.user.profile_pic_url_hd,
        verified: json.data.user.is_verified,
        private: json.data.user.is_private,
        id: json.data.user.id,
        fullname: json.data.user.full_name,
        biography: json.data.user.biography,
    }
}
main();
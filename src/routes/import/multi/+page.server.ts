export async function load(props) {
    let accounts = [];

    await fetch(props.url.origin + "/api/accounts")
        .then((res) => res.json())
        .then((data) => {
            accounts = data;
        })
        .catch((err) => {
            console.error("Error fetching accounts: ", err);
        });

    return {
        accounts: accounts,
    };
}
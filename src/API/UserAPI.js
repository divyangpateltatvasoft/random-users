// Function to get random users
export function getRandomUsersAPI(userCount = 10) {
    const promise = fetch("https://randomuser.me/api/?results=" + userCount)
        .then(res => res.json())
        .then(({ results }) => {
            return results;
        })
        .catch(error => {
            console.log(error);
        });

    return promise;
}

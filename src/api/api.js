

const fetchPosts = async () => {
    const response = await fetch(`http://localhost:3000/posts?_sort=-id`);
    const postData = await response.json();
    return postData;
}

const fetchTags = async () => {
    const response = await fetch(`http://localhost:3000/tags`);
    const tagsData = await response.json();
    return tagsData;
}

const addPosts = async (post) => {
    const response = await fetch(`http://localhost:3000/po sts`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(post),
    });

    return response.json();
}

export { fetchPosts, addPosts, fetchTags };
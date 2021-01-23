
const $feed = $('#feed');
const $newPost = $('#newPost');
const $post2 = $('#post2');
const $reply = $('#reply');



async function create() {
    const newTweets = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: document.getElementById('newPost').value
        },
    });
    location.reload();
};

async function showNewTweetBox() {
    $post2.html(`<textarea id="newPost" rows="4" autofocus="autofocus"></textarea>
    <button id="button" onclick="create()">Post Tweet</button>`);
}


async function like(liked, id) {
    if (liked) {
        const result = await axios({
            method: 'put',
            url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'.concat(id, '/unlike'),
            withCredentials: true,
        });
    } else {
        const result = await axios({
            method: 'put',
            url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'.concat(id, '/like'),
            withCredentials: true,
        });
    }
    location.reload();



}

async function reply(parentId) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": parentId,
          "body":  document.getElementById('replyBox').value
        },
      });
      location.reload();
}

async function showReplyBox(parentId) {
    $post2.html(`<textarea id="replyBox" rows="4" autofocus="autofocus"></textarea>
    <button id="button" onclick="reply(${parentId})">Post Reply</button>`);
}

async function retweet(parentId, parentBody) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          type: "retweet",
          parent: parentId,
          body: document.getElementById('retweetBox').value.concat('<br />Retweeted:<br />', parentBody)

        },
      });
      location.reload();
}

async function showRetweetBox(parentId, parentBody) {
    $post2.html(`<textarea id="retweetBox" rows="4" autofocus="autofocus"></textarea>
    <button id="button" onclick="retweet(${parentId}, \'${parentBody}\')">Post Retweet</button>`);
}

async function edit(parentId, parentBody) {
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'.concat(parentId),
        withCredentials: true,
        data: {
          body: document.getElementById('editBox').value
        },
      });
      location.reload();
}

async function showEditBox(parentId, parentBody) {
    $post2.html(`<textarea id="editBox" rows="4" autofocus="autofocus">${parentBody}</textarea>
    <button id="button" onclick="edit(${parentId}, \'${parentBody}\')">Update Tweet</button>`);
}

async function deleteTweet(parentId) {
    const result = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'.concat(parentId),
        withCredentials: true,
      });
      location.reload();
}




$(async function () {


    const tweets = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
      });

    var i;
    for (i = 0; i < tweets.data.length; i++){

        if (tweets.data[i].isMine) {
            $feed.append(`<p style="text-align:center;">Posted by: ${tweets.data[i].author} Likes: ${tweets.data[i].likeCount} Retweets: ${tweets.data[i].retweetCount} Like?: ${tweets.data[i].isLiked}
            <button id="likeButton" onclick="like(${tweets.data[i].isLiked}, ${tweets.data[i].id})">Like/Unlike</button>
            <button id="Reply" onclick="showReplyBox(${tweets.data[i].id})">Reply</button>
            <button id="Retweet" onclick="showRetweetBox(${tweets.data[i].id}, \'${tweets.data[i].body}\')">Retweet</button>
            <button id="Edit" onclick="showEditBox(${tweets.data[i].id}, \'${tweets.data[i].body}\')">Edit</button>
            <button id="Delete" onclick="deleteTweet(${tweets.data[i].id})">Delete</button></p>
            <p style="font-size:200%;border-style:dotted;border-color:lightblue;">${tweets.data[i].body}</p>`);
        } else {
            $feed.append(`<p style="text-align:center;">Posted by: ${tweets.data[i].author} Likes: ${tweets.data[i].likeCount} Retweets: ${tweets.data[i].retweetCount} Like?: ${tweets.data[i].isLiked}
            <button id="likeButton" onclick="like(${tweets.data[i].isLiked}, ${tweets.data[i].id})">Like/Unlike</button>
            <button id="Reply" onclick="showReplyBox(${tweets.data[i].id})">Reply</button>
            <button id="Retweet" onclick="showRetweetBox(${tweets.data[i].id}, \'${tweets.data[i].body}\')">Retweet</button></p>
            <p style="font-size:200%;border-style:dotted;border-color:lightblue;">${tweets.data[i].body}</p><p> <br> </br></p>`);
        }

    }






});


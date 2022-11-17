const Twit = require('twit');

var config = {
    consumer_key: 'KrLbIHIZlNgYn4nnWE2K99lqu',
    consumer_secret: '333q9hUYXvXUmXTDYWSbksHXmlC1Al8P0jx99IAvyC0rfXInqH',
    access_token: '1549189157251325952-UoY38K3MjbHUFgTQppGANm4ey9dwVB',
    access_token_secret: '6n6HFXlEgVmXp3hh9aBSBw1TCe97VXzRZka041cRsmiIG',
    tweet_mode: "extended"
};



module.exports.findTopTweets = (request, response) => {
    (async () => {

        var results = [];
        var frameResult = async function () {
            try {

                var T = new Twit(config);
                const data = await T.get('/search/tweets', { tweet_mode: "extended", include_entities: "true", q: "#futuretechnology", count: 100 });
                let pos = 1 ; 

                for (let stat of data.data.statuses) {
                    const dateArray = stat.created_at.split(" ");

                    const dateString = dateArray[2] + " " + dateArray[1] + " " + dateArray[dateArray.length - 1];

                    const creationDate = new Date(dateString);
                    const miliSecCreation = Date.parse(creationDate);

                    const todayDate = new Date();
                    const miliSecToday = Date.parse(todayDate);
                    let diff = miliSecToday - miliSecCreation;

                    diff /= (1000 * 60 * 60 * 24);
                    diff = Math.floor(diff);


                    let text = stat.full_text;
                    let index = text.indexOf("https://");
                    if (index > 0) {
                        text = text.substr(0, index - 1);
                    }

                    text = text.replaceAll("\n" , ""); 
                    text = text.replaceAll("&amp;" , "") ; 

                    const likes = stat.favorite_count;
                    const retweet = stat.retweet_count;
                    const sensitive = stat.possibly_sensitive === undefined ? false : stat.possibly_sensitive;

                    let media = [];
                    if (stat.entities.media) {
                        for (let m of stat.entities.media) {
                            media.push(m.media_url);
                        }
                    }

                    let gradePoint = (retweet * 10) + (likes * 9);
                    percentageDec = ((diff * 0.1) * gradePoint) / 100;

                    gradePoint -= percentageDec;

                    if (sensitive) {
                        gradePoint -= 1000;
                    }



                    const tweetData = {
                        text: text,
                        creationDate: dateString,
                        createdBy: stat.user.screen_name,
                        userImageURL: stat.user.profile_image_url,
                        likes: likes,
                        retweet: retweet,
                        daysPassed: diff,
                        sensitive: sensitive,
                        media: media,
                        gradePoint: media.length > 0 ? Math.floor(gradePoint) + 10000 : Math.floor(gradePoint), 
                    }

                    results.push(tweetData);
                }

                const compartorFn = (a, b) => b.gradePoint - a.gradePoint;
                results.sort(compartorFn);

                for(let result of results){
                    result.pos = pos ++ ; 
                }

            } catch (error) {
                console.log(error);
            }
        }
        await frameResult();
        console.log(results) ; 
        return response.render("top-tweets", {
            tweets: results,
            layout: "top-tweets.ejs",
            title: "Top Tweets Tech| FAssist"
        });

    })();
}
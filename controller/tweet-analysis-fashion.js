const { get } = require('request');
const Twit = require('twit');

var config = {
    consumer_key: 'KrLbIHIZlNgYn4nnWE2K99lqu',
    consumer_secret: '333q9hUYXvXUmXTDYWSbksHXmlC1Al8P0jx99IAvyC0rfXInqH',
    access_token: '1549189157251325952-UoY38K3MjbHUFgTQppGANm4ey9dwVB',
    access_token_secret: '6n6HFXlEgVmXp3hh9aBSBw1TCe97VXzRZka041cRsmiIG',
    tweet_mode: "extended"
};

module.exports.getfashiontweets = (request, response) => {


    (async () => {

        var T = new Twit(config);

        const queries = ["online saree -khojinINDIA -cyber", "online scarf -lowkey -hate -meetings -god", "check online earrings -Ophiria", "check online +bracelet -cashed -@WSOP -getthelook -Ophiria", "online cardigan -plüsch", "check online Sneakers -zoom -balance -nike -day -Dating -job -breast", "Tunic dress", "Bodycon Dress", "Babydoll dress", "Camisole dress -TODAYFUL -新作発売中", "Formal Sweater -o -orangutan", "Maxi Dress"];
        let searches = ["saree sarees Saree Sarees", "Scarf scarf scarfs Scarfs", "earrings earring Earring Earrings", "Bracelet Bracelets bracelets bracelet", "cardigan cardigans Cardigan Cardigans", "Sneakers sneakers Sneaker sneaker", "Tunic tunic tunics Tunics", "Bodycon Bodycons bodycons bodycon", "Babydoll Babydolls babydolls babydoll", "Camisole camisole Camisoles camisoles", "sweater sweaters Sweater Sweaters", "Maxi maxis maxi Maxis"]


        var results = [];
        await getResult();

        async function getResult() {


            for (let j = 0; j < queries.length; j += 1) {
                var trendingkeywords = [];
                var mainKeyword;
                var media = [];


                const data = await T.get('/search/tweets', { tweet_mode: "extended", include_entities: "true", q: queries[j], count: 1000 });
                for (let stat of data.data.statuses) {

                    const words = stat.full_text.split(" ");
                    const keywordFinder = searches[j].split(" ");
                    mainKeyword = keywordFinder[0].toUpperCase();

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

                    text = text.replaceAll("\n", "");
                    text = text.replaceAll("&amp;", "");

                    const likes = stat.favorite_count;
                    const retweet = stat.retweet_count;
                    const sensitive = stat.possibly_sensitive === undefined ? false : stat.possibly_sensitive;

                    let med = [];
                    if (stat.entities.media) {
                        for (let m of stat.entities.media) {
                            let mediaObj = {
                                tweetURL :`https://twitter.com/${stat.user.screen_name}/status/${stat.id_str}` , 
                                mediaURL : m.media_url
                            }

                            med.push(mediaObj);
                        }
                    }

                    let gradePoint = (retweet * 10) + (likes * 9);
                    percentageDec = ((diff * 0.1) * gradePoint) / 100;

                    gradePoint -= percentageDec;

                    if (sensitive) {
                        gradePoint -= 10000;
                    }



                    for (let i = 0; i < words.length; i += 1) {
                        words[i] = words[i].toLowerCase();
                        words[i] = words[i].replace(",", "");
                        words[i] = words[i].replace(".", "");
                        words[i] = words[i].replace("!", "");
                        words[i] = words[i].replace("?", "");
                        words[i] = words[i].replace("Dress/", "");
                        words[i] = words[i].replace('"', "");
                        words[i] = words[i].replace("”", "");
                        words[i] = words[i].replace("\n", "");

                        if ((words[i].toLowerCase() == keywordFinder[0] || words[i].toLowerCase() == keywordFinder[1] || words[i].toLowerCase() == keywordFinder[2] || words[i].toLowerCase() == keywordFinder[3]) && i != 0) {

                            if (!(words[i - 1] == "for" || words[i - 1] == "that" || words[i - 1] == "own"
                                || words[i - 1] == "me" || words[i - 1] == "i" || words[i - 1] == "a"
                                || words[i - 1] == "your" || words[i - 1] == "our" || words[i - 1] == "'the" || words[i - 1] == "each"
                                || words[i - 1] == "dr" || words[i - 1] == "made" || words[i - 1] == "in"
                                || words[i - 1] == "to" || words[i - 1] == "it" || words[i - 1] == "its"
                                || words[i-1] == "ஆவணி..exclusive" || words[i-1] == "ஆவணிexclusive"
                                || words[i - 1] == "or" || words[i - 1] == "us" || words[i - 1] == "wear"
                                || words[i - 1] == "no" || words[i - 1] == "more" || words[i-1] == "was"
                                || words[i - 1] == "is" || words[i - 1] == "are" || words[i - 1] == "but"
                                || words[i - 1] == "and" || words[i-1] == "the" || words[i-1] == "on"
                                || words[i-1] == "you" || words[i-1] == "total" || words[i-1] == " not"
                                || words[i - 1] == "this" || words[i - 1] == "with" || words[i - 1] == "your"
                                || words[i - 1] == "our" || words[i - 1] == "his" || words[i - 1] == "her" ||
                                words[i - 1] == "my" || words[i - 1] == "their" || words[i - 1] == "mine" ||
                                words[i - 1] == "/" || words[i - 1] == "-" || words[i - 1] == "a" ||
                                words[i - 1] == "an" || words[i - 1] == "to" || words[i-1] == "ur" || words[i-1] == "of" ||
                                words[i - 1] == "in" || (words[i - 1].includes("@") || words[i - 1].includes("*")
                                    || words[i - 1].includes("/")) || (words[i - 1].includes("‘")))) {



                                words[i - 1] = words[i - 1].replaceAll("\n", " ");
                                words[i - 1] = words[i - 1].replaceAll("&amp;", "");

                                
                                let result;
                                if (words[i - 1] == "\n" || words[i - 1] == "&amp;") {
                                    result = words[i - 1] + " " + words[i];
                                } else {
                                    result = words[i - 1] + " " + words[i];
                                }
                                let isFound = false;
                                for (let keyword of trendingkeywords) {
                                    if (keyword.keyword == result) {
                                        isFound = true;
                                        break;
                                    }
                                }
                                if (!isFound) {
                                    keyword = {
                                        keyword: result,
                                        gradePoint: med.length > 0 ? gradePoint + 10000 : gradePoint , 
                                    }
                                    trendingkeywords.push(keyword);
                                    if (stat.entities.media) {
                                        for (let m of stat.entities.media) {
                                            let mediaObj = {
                                                tweetURL :`https://twitter.com/${stat.user.screen_name}/status/${stat.id_str}` , 
                                                mediaURL : m.media_url
                                            }
                                            media.push(mediaObj);
                                        }
                                    }
                                }

                            }
                        }
                    }
                }

                const compartorFn2 = (a, b) => {
                    return b.gradePoint - a.gradePoint;
                }
                trendingkeywords.sort(compartorFn2);
                for(let k = 0 ; k < trendingkeywords.length ; k += 1){
                    trendingkeywords[k].pos = k + 1 ; 
                }

                let result = {
                    mainKeyword: mainKeyword,
                    trendingkeywords: trendingkeywords,
                    queryIndex: j,
                    mediaLinks: media
                }

                results.push(result);
            }

            return Promise.resolve("Hii Got The Trending keywords.");
        }

        console.log(results);
        response.render("social-trends-page", {
            title: "Fashion Trends | FAssist",
            layout: "social-trends-page.ejs",
            mainCategory: "fashion",
            keywords: results
        });
    })();
}
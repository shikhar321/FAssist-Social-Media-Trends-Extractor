const { get } = require('request');
const Twit = require('twit');

var config = {
    consumer_key: 'KrLbIHIZlNgYn4nnWE2K99lqu',
    consumer_secret: '333q9hUYXvXUmXTDYWSbksHXmlC1Al8P0jx99IAvyC0rfXInqH',
    access_token: '1549189157251325952-UoY38K3MjbHUFgTQppGANm4ey9dwVB',
    access_token_secret: '6n6HFXlEgVmXp3hh9aBSBw1TCe97VXzRZka041cRsmiIG',
    tweet_mode: "extended"
};

module.exports.getSmartDevicetweets = (request, response) => {


    (async () => {

        var T = new Twit(config);

        const queries = ["buy online phone"];
        let searches = ["phone phones"];

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

                    if (stat.entities.media) {
                        for (let m of stat.entities.media) {
                            media.push(m.media_url);
                        }
                    }

                    for (let i = 0; i < words.length; i += 1) {

                        words[i] = words[i].replace(",", "");
                        words[i] = words[i].replace(".", "");
                        words[i] = words[i].replace("!", "");
                        words[i] = words[i].replace("?", "");
                        words[i] = words[i].replace("Dress/", "");
                        words[i] = words[i].replace("\n", "");

                        if ((words[i].toLowerCase() == keywordFinder[0] || words[i].toLowerCase() == keywordFinder[1] || words[i].toLowerCase() == keywordFinder[2] || words[i].toLowerCase() == keywordFinder[3]) && i != 0) {
                            words[i - 1] = words[i - 1].toLowerCase()

                            

                            if (!(words[i - 1] == "for" || words[i - 1] == "that" || words[i - 1] == "own"
                                || words[i - 1] == "me" || words[i - 1] == "i" || words[i-1] == "first" 
                                || words[i-1] == "second" || words[i-1] == "third" || words[i-1] == "fourth"
                                || words[i-1] == "will" || words[i-1] == "of" || words[i-1] == "buy" || words[i-1] == "which"
                                || words[i-1] == "bought" || words[i-1] == "while" || words[i-1] == "into"
                                || words[i - 1] == "on" || words[i-1] == "its" || words[i-1] == "+" || words[i-1] == "2nd"
                                || words[i-1] == "one" || words[i-1] == "two" || words[i-1] == "three" || words[i-1] == "four"
                                || words[i-1] == "five" || words[i-1] == "six" || words[i-1] == "seven" || words[i-1] == "eight"
                                || words[i-1] == "nine" || words[i-1] == "ten" || words[i-1] == "use" || words[i-1] == "so" 
                                || words[i-1] == "by" || words[i-1] == "via" || words[i-1] == "you"
                                || words[i-1] == "another" || words[i-1] == "through" || words[i-1] == "can"
                                || words[i - 1] == "no" || words[i - 1] == "more" || words[i - 1] == "the"
                                || words[i - 1] == "is" || words[i - 1] == "are" || words[i - 1] == "but"
                                || words[i - 1] == "and" || words[i - 1] == "or" || words[i - 1] == "in"
                                || words[i - 1] == "this" || words[i - 1] == "with" || words[i - 1] == "your"
                                || words[i - 1] == "our" || words[i - 1] == "his" || words[i - 1] == "her" ||
                                words[i - 1] == "my" || words[i - 1] == "their" || words[i - 1] == "mine" ||
                                words[i - 1] == "/" || words[i - 1] == "-" || words[i - 1] == "a" ||
                                words[i - 1] == "the" || words[i - 1] == "an" || words[i - 1] == "to" ||
                                words[i - 1] == "in" || (words[i - 1].includes("@") || words[i - 1].includes("*")
                                    || words[i - 1].includes("/")))) {



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
                                    if (keyword == result) {
                                        isFound = true;
                                        break;
                                    }
                                }
                                if (!isFound) {
                                    trendingkeywords.push(result);
                                }

                            }
                        }
                    }
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
            mainCategory: "electronic-devices" ,  
            keywords: results
        });
    })();
}
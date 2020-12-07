import Axios from "axios";
import iconv from "iconv-lite";
import cheerio from "cheerio";

export const bestCrawling = async (req, res) => {
    const { id } = req.body;
    const url = `http://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?range=1&kind=${id}&orderClick=DAA&mallGb=KOR&linkClass=A`;
    try {
        let list = [];
        const kyobo = await Axios.get(url, {
            responseType: "arraybuffer",
        }).then((res) => res.data);
        const decoded = iconv.decode(kyobo, "EUC-KR");
        const $ = cheerio.load(decoded);
        const $bodyList = $("ul.list_type01").children("li");

        $bodyList.each(function (i) {
            list[i] = {
                title: $(this).find("div.title strong").text(),
                url: $(this).find("div.cover a").attr("href"),
                imageUrl: $(this).find("img").attr("src"),
                imageAlt: $(this).find("img").attr("alt"),
                summary: $(this).find("div.subtitle").text(),
                auth: $(this)
                    .find("div.author")
                    .text()
                    .split("|")[0]
                    .replace("저자 더보기", ""),
                id: i++,
            };
        });
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "가져오기 실패" });
    }
};

export const interviewCrawling = async (req, res) => {
    const url =
        "http://news.kyobobook.co.kr/people/interview.ink?orderclick=QBJ";
    try {
        let interview = [];
        const getInterview = await Axios.get(url, {
            responseType: "arraybuffer",
        }).then((res) => res.data);
        const decoded = iconv.decode(getInterview, "EUC-KR");
        const $ = cheerio.load(decoded);
        const $body = $("ul.list_type_webzine").children("li");
        $body.each(function (i) {
            while (i < 6) {
                interview[i] = {
                    title: $(this).find("div.title a").text(),
                    url: $(this)
                        .find("div.title a")
                        .attr("href")
                        .split("(")[1]
                        .split(",")[0],
                    detail: $(this).find("div.preview a").text(),
                    imageUrl: $(this).find("div.thumb img").attr("src"),
                    id: i++,
                };
            }
        });
        res.status(200).json(interview);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const steadyCrawling = async (req, res) => {
    const url = `http://www.kyobobook.co.kr/bestSellerNew/steadyseller.laf?orderClick=D0b`;
    try {
        let list = [];
        const kyobo = await Axios.get(url, {
            responseType: "arraybuffer",
        }).then((res) => res.data);
        const decodeding = iconv.decode(kyobo, "EUC-KR");
        const $ = cheerio.load(decodeding);
        const $bodyList = $("ul.list_type01").children("li");

        $bodyList.each(function (i) {
            list[i] = {
                title: $(this).find("div.title strong").text(),
                url: $(this).find("div.cover a").attr("href"),
                imageUrl: $(this).find("img").attr("src"),
                imageAlt: $(this).find("img").attr("alt"),
                summary: $(this).find("div.subtitle").text(),
                auth: $(this)
                    .find("div.author")
                    .text()
                    .split("|")[0]
                    .replace("저자 더보기", ""),
                id: i++,
            };
        });
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

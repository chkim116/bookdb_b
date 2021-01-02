import Axios from "axios";
import dotenv from "dotenv";
import cheerio from "cheerio";
import iconv from "iconv-lite";

dotenv.config();

export const searchNaver = async (req, res) => {
    const { searchText, display } = req.body;
    console.log(req.body);
    const text = encodeURI(searchText);
    const url = `https://openapi.naver.com/v1/search/book?query=${text}&d_titl=${text}&display=${display}`;
    try {
        const results = await Axios.get(url, {
            headers: {
                "X-Naver-Client-Id": process.env.NAVER_ID,
                "X-Naver-Client-Secret": process.env.NAVER_SECRET,
            },
        }).then((res) => res.data);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const interviewSearch = async (req, res) => {
    const url =
        "http://news.kyobobook.co.kr/people/interview.ink?orderclick=QBJ";
    let interview = [];
    try {
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
        res.status(400);
    }
};

export const steadySearch = async (req, res) => {
    const steadyUrl = `http://www.kyobobook.co.kr/bestSellerNew/steadyseller.laf?orderClick=D0b`;
    let list = [];
    try {
        const kyobo = await Axios.get(steadyUrl, {
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
        res.status(400);
    }
};

export const bestSearch = async (req, res) => {
    const { id } = req.params;
    const url = `http://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?range=1&kind=${id}&orderClick=DAA&mallGb=KOR&linkClass=A`;
    let list = [];
    try {
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
        res.status(400);
    }
};

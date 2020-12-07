import Axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const searchNaver = async (req, res) => {
    const { searchText } = req.body;
    const text = encodeURI(searchText);
    const url = `https://openapi.naver.com/v1/search/book?query=${text}&d_titl=${text}`;
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

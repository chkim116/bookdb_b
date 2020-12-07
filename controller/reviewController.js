export const getReview = (req, res) => {};

export const postReview = (req, res) => {};

export const updateReview = (req, res) => {};

export const delReview = (req, res) => {};

export const postImg = (req, res) => {
    const {
        file: { location },
    } = req;
    try {
        res.status(200).json(location);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

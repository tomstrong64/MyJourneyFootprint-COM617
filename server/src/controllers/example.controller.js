export const getExamples = async (req, res, next) => {
    // get examples from db
    const examples = ['example1', 'example2', 'example3'];
    return res.status(200).json(examples);
};

export const createExample = async (req, res, next) => {
    // create example in db
    return res.status(200).json({ message: 'Example created' });
};

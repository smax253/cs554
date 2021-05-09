const extractIdFromURI = (resourceURI) => {
    const terms = resourceURI.split('/');
    return terms[terms.length - 1];
};

export default extractIdFromURI;

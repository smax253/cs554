const InnerLink = ({ resourceURI, id, name }) => ({
    getResourceURI: () => resourceURI,
    getId: () => id,
    getName: () => name,
});

export default InnerLink;

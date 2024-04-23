type ICopyParserProps = {
    content: string;
};

const stringParser: React.FC<ICopyParserProps> = (props) => {
    const { content } = props;

    return <div className="prose">{content}</div>;
};

export default stringParser;
